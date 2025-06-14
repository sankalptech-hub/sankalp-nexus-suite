
import { useToast } from '@/hooks/use-toast';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  model: string;
  provider: 'openai' | 'groq';
}

export interface ImageGenerationResponse {
  imageUrl: string;
  revisedPrompt?: string;
}

class AIClient {
  private openaiApiKey: string | null;
  private groqApiKey: string | null;

  constructor() {
    this.openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
    this.groqApiKey = import.meta.env.VITE_GROQ_API_KEY || null;
  }

  /**
   * Main function to ask AI - tries Groq first, falls back to OpenAI
   */
  async askAI(
    messages: AIMessage[],
    options: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
      provider?: 'openai' | 'groq' | 'auto';
    } = {}
  ): Promise<AIResponse> {
    const { model, temperature = 0.7, maxTokens = 1000, provider = 'auto' } = options;

    // Try Groq first if available and not specifically requesting OpenAI
    if (provider !== 'openai' && this.groqApiKey) {
      try {
        return await this.callGroq(messages, {
          model: model || 'llama3-8b-8192',
          temperature,
          maxTokens,
        });
      } catch (error) {
        console.warn('Groq failed, trying OpenAI:', error);
        if (provider === 'groq') throw error;
      }
    }

    // Fallback to OpenAI or if specifically requested
    if (this.openaiApiKey) {
      return await this.callOpenAI(messages, {
        model: model || 'gpt-4o-mini',
        temperature,
        maxTokens,
      });
    }

    throw new Error('No AI API keys configured. Please set VITE_GROQ_API_KEY or VITE_OPENAI_API_KEY in your environment.');
  }

  /**
   * Generate images using OpenAI DALL-E
   */
  async generateImage(
    prompt: string,
    options: {
      size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
      quality?: 'standard' | 'hd';
      style?: 'vivid' | 'natural';
    } = {}
  ): Promise<ImageGenerationResponse> {
    if (!this.openaiApiKey) {
      throw new Error('OpenAI API key required for image generation. Please set VITE_OPENAI_API_KEY.');
    }

    const { size = '1024x1024', quality = 'standard', style = 'vivid' } = options;

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt,
          n: 1,
          size,
          quality,
          style,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Image generation failed');
      }

      const data = await response.json();
      return {
        imageUrl: data.data[0].url,
        revisedPrompt: data.data[0].revised_prompt,
      };
    } catch (error) {
      console.error('Image generation error:', error);
      throw error;
    }
  }

  private async callOpenAI(
    messages: AIMessage[],
    options: { model: string; temperature: number; maxTokens: number }
  ): Promise<AIResponse> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options.model,
        messages,
        temperature: options.temperature,
        max_tokens: options.maxTokens,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API call failed');
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      model: data.model,
      provider: 'openai',
    };
  }

  private async callGroq(
    messages: AIMessage[],
    options: { model: string; temperature: number; maxTokens: number }
  ): Promise<AIResponse> {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options.model,
        messages,
        temperature: options.temperature,
        max_tokens: options.maxTokens,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Groq API call failed');
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      model: data.model,
      provider: 'groq',
    };
  }

  /**
   * Check if any AI service is available
   */
  isAvailable(): boolean {
    return !!(this.groqApiKey || this.openaiApiKey);
  }

  /**
   * Get available providers
   */
  getAvailableProviders(): string[] {
    const providers = [];
    if (this.groqApiKey) providers.push('Groq');
    if (this.openaiApiKey) providers.push('OpenAI');
    return providers;
  }
}

// Export singleton instance
export const aiClient = new AIClient();

// Quick helper functions for common use cases
export const askAI = (prompt: string, systemPrompt?: string) => {
  const messages: AIMessage[] = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content: prompt });
  return aiClient.askAI(messages);
};

export const generateImage = (prompt: string, options?: Parameters<typeof aiClient.generateImage>[1]) => {
  return aiClient.generateImage(prompt, options);
};
