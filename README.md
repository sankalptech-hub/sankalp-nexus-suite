
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ed47c8be-c09e-479b-b0be-d66ee83149e8

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ed47c8be-c09e-479b-b0be-d66ee83149e8) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## AI Configuration

This project includes powerful AI tools that can connect to OpenAI and Groq APIs for enhanced functionality.

### Setting up AI Services

1. **Copy the environment file:**
   ```sh
   cp .env.example .env
   ```

2. **Get your API keys:**
   - **OpenAI**: Visit [OpenAI API Keys](https://platform.openai.com/api-keys) to create an API key
   - **Groq**: Visit [Groq Console](https://console.groq.com/keys) to create an API key

3. **Add your keys to `.env`:**
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

### AI Features

- **Chat Assistant**: General conversation and technical help
- **Code Assistant**: Debugging, code review, and development help
- **Documentation**: Generate technical documentation
- **Email Writer**: Draft professional emails
- **Image Generation**: Create images using DALL-E (requires OpenAI API key)
- **Quick Actions**: One-click AI actions for common tasks
- **Conversation History**: Save and reload past conversations
- **AI Settings**: Configure model, temperature, and provider preferences

### AI System Architecture

The AI system is built with a modular, scalable architecture:

```
src/
├── lib/ai/
│   ├── aiClient.ts       # Core AI API client (OpenAI & Groq)
│   └── aiActions.ts      # Predefined AI action configurations
├── components/ai/
│   ├── AIToolbar.tsx         # Quick action buttons
│   ├── AIChatHistory.tsx     # Message history with export features
│   ├── AIInputBox.tsx        # Input handling for chat & images
│   ├── AISettingsModal.tsx   # AI configuration settings
│   └── ConversationHistory.tsx # Save/load conversation sessions
└── pages/dashboard/
    └── AITools.tsx       # Main AI tools page container
```

#### Key Components

- **AIClient** (`/src/lib/ai/aiClient.ts`): Handles all API communications with OpenAI and Groq, including automatic fallback
- **AIActions** (`/src/lib/ai/aiActions.ts`): Defines reusable AI actions with prompts and categories
- **AIToolbar**: Displays category-specific quick actions
- **AIChatHistory**: Manages conversation display with copy/export features
- **AIInputBox**: Handles user input for both text and image generation
- **ConversationHistory**: Persistent conversation storage and management
- **AISettingsModal**: User preferences for models, temperature, and providers

#### Adding New AI Actions

To add a new AI action, edit `/src/lib/ai/aiActions.ts`:

```typescript
{
  id: 'your-action-id',
  name: 'Your Action Name',
  description: 'What this action does',
  icon: '🔧',
  category: 'general', // or 'code', 'documentation', 'email'
  systemPrompt: 'You are a helpful assistant that...',
  userPrompt: (context) => `Your prompt template with ${context}`,
}
```

#### Extending Categories

To add new categories, update the `aiToolCategories` array in `/src/pages/dashboard/AITools.tsx` and add corresponding system prompts.

### Usage Notes

- The AI client will automatically try OpenAI first, then fall back to Groq if available
- Image generation requires an OpenAI API key
- You can use either API key independently or both together for redundancy
- All AI conversations can be saved locally and exported
- Conversation history is stored in browser localStorage
- AI settings persist across sessions

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (for backend functionality)
- OpenAI & Groq APIs (for AI features)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ed47c8be-c09e-479b-b0be-d66ee83149e8) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
