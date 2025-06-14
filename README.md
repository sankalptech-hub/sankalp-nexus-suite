

# Sankalp Tech & Solutions Dashboard

A modern, responsive dashboard application built with React, TypeScript, and Tailwind CSS for Sankalp Tech & Solution Inc.

## Features

### 🔐 Authentication
- Secure user authentication with Supabase
- Role-based access control (Admin/Client)
- Protected routes and user sessions

### 📊 Dashboard
- **Projects Management**: Create, edit, delete, and track project status
- **Client Portal**: Dedicated dashboard for clients to view their projects
- **Admin Portal**: Complete administrative control over projects and users

### 🤖 AI Tools
- **General Chat**: AI-powered assistant for general queries
- **Code Assistant**: Help with coding, debugging, and development
- **Documentation**: Generate and review technical documentation
- **Email Writer**: Compose professional emails and communications
- **Blog Writer**: Generate engaging blog posts and articles with AI
- **Image Generation**: Create images using DALL-E
- **Conversation History**: Save and reload past AI conversations
- **AI Settings**: Configure AI model, temperature, and provider preferences

### ✍️ Blog Writer Features
- **Topic-based Generation**: Enter a blog topic and let AI create full articles
- **Customizable Content**: Set keywords, target audience, tone, and word count
- **Multiple Tones**: Professional, casual, technical, conversational, authoritative, or creative
- **Export Options**: Copy to clipboard or download as Markdown
- **Rich Text Display**: Formatted preview of generated content
- **Word Count Tracking**: Real-time word count and generation timestamps

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Backend**: Supabase (Database, Auth, Storage)
- **AI Integration**: Groq API (Default), OpenAI API (Fallback)
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Query (TanStack Query)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Configuration (Groq is the default provider)
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### Getting AI API Keys

#### Groq API Key (Default Provider - Free & Fast)
1. Go to [Groq Console](https://console.groq.com/keys)
2. Sign in to your account
3. Generate a new API key
4. Copy the key and add it to your `.env.local` file

**Why Groq?** Groq provides fast, free AI inference with models like Llama 3, making it perfect for most use cases without API costs.

#### OpenAI API Key (Fallback Provider)
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in to your account
3. Click "Create new secret key"
4. Copy the key and add it to your `.env.local` file

**Note:** OpenAI is used as a fallback and for image generation (DALL-E). It's a paid service but offers more specialized features.

#### Supabase Configuration
1. Create a new project at [Supabase](https://supabase.com)
2. Go to Settings > API
3. Copy the Project URL and anon public key
4. Add them to your `.env.local` file

## AI Provider Configuration

The application uses a smart AI provider system:

1. **Default**: Groq (fast, free, Llama 3 models)
2. **Fallback**: OpenAI (when Groq is unavailable)
3. **Image Generation**: OpenAI DALL-E (Groq doesn't support images)

### Available AI Models

#### Groq Models (Default)
- `llama3-8b-8192` - Fast 8B parameter model (default)
- `llama3-70b-8192` - More powerful 70B parameter model
- `mixtral-8x7b-32768` - Mixtral model with large context

#### OpenAI Models (Fallback)
- `gpt-4o-mini` - Fast and cost-effective
- `gpt-4o` - Most capable GPT model

### Adding New AI Providers

To add a new AI provider:

1. Update `src/lib/ai/aiClient.ts` with the new provider's API integration
2. Add the provider to the `AISettings` interface
3. Update the settings modal with new provider options
4. Add environment variables for the new provider's API keys

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sankalp-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see above)

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── ai/                 # AI-related components
│   │   ├── AIToolbar.tsx
│   │   ├── AIChatHistory.tsx
│   │   ├── AIInputBox.tsx
│   │   ├── AISettingsModal.tsx
│   │   ├── BlogWriter.tsx
│   │   └── ConversationHistory.tsx
│   ├── layout/             # Layout components
│   ├── projects/           # Project management components
│   ├── sections/           # Page sections
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── ai/                 # AI utilities
│   │   ├── aiClient.ts     # AI API client
│   │   └── aiActions.ts    # Predefined AI actions
│   └── utils.ts
├── pages/                  # Main pages
│   ├── dashboard/          # Dashboard pages
│   └── ...
└── hooks/                  # Custom React hooks
```

## AI Integration

The application supports multiple AI providers with smart fallback:

- **Groq**: Primary provider for fast, free AI responses
- **OpenAI**: Fallback for text and primary for image generation

### Blog Writer Usage

1. Navigate to AI Tools → Blog Writer
2. Enter your blog topic (required)
3. Optionally add keywords, target audience
4. Choose tone (professional, casual, technical, etc.)
5. Select word count (500-1500+ words)
6. Click "Generate Blog Post"
7. Copy or download the generated content

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is proprietary and confidential to Sankalp Tech & Solution Inc.

