# Lesearch - Research Paper Accessibility Platform

Lesearch is a web application designed to enhance the readability and accessibility of research papers. It provides a comprehensive platform for researchers, students, and academics to read, annotate, and collaborate on research papers with AI-assisted features.

## Features

- **Authentication System**: Complete authentication flow with NextAuth.js and Supabase
- **Google Sign-in**: Seamless integration with Google OAuth
- **User Profiles**: Customizable user profiles with avatar uploads
- **Responsive Dashboard**: Modern UI with a responsive sidebar
- **Multi-panel Interface**: Resizable panels for paper viewing, note-taking, and AI interaction (upcoming)
- **AI Integration**: Chat with AI assistants using Google Gemini and Azure OpenAI (upcoming)
- **Paper Management**: Upload, organize, and explore research papers (upcoming)

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn
- A Supabase account and project
- Google OAuth credentials
- Email service for password reset functionality

### Environment Variables

Before running the application, you need to set up your environment variables. Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-email-password
```

Team members can access the actual environment variables through our private Notion document.

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lesearch-frontend.git
cd lesearch-frontend

# Install dependencies
npm install
# or
yarn install
```

### Running the Development Server

```bash
# Start the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Building for Production

```bash
# Build the application
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

## Project Structure

```
frontend-v1/
├── .windsurf/            # AI development guidelines
├── ai_docs/              # Documentation for developers and AI assistants
├── public/               # Static assets
├── specs/                # Feature specifications and roadmap
├── src/                  # Source code
│   ├── app/              # Next.js App Router
│   │   ├── (auth)/       # Authentication pages
│   │   ├── (landing)/    # Landing pages
│   │   ├── (main)/       # Main application pages
│   │   └── api/          # API routes
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and libraries
│   └── store/            # State management with Zustand
└── ...
```

## Documentation

The project includes comprehensive documentation in the following directories:

### `ai_docs/`

Contains detailed documentation about the codebase for developers and AI assistants:

- `architecture-overview.md` - Overall project structure and architecture
- `authentication-system.md` - Details about the authentication flow
- `ui-components.md` - Documentation of UI components and design patterns
- `state-management.md` - Information about state management with Zustand
- `environment-variables.md` - Guide to environment variables

### `specs/`

Contains specifications for current and future features:

- `overview.md` - Project vision and core features
- `multi-panel-interface.md` - Specification for the resizable panel interface
- `paper-management.md` - Specification for paper upload and management
- `ai-integration.md` - Specification for AI assistant integration

### `.windsurf/`

Contains guidelines for AI development:

- `dependencies.md` - Guidelines for managing dependencies
- `coding-standards.md` - Coding standards and best practices
- `ai-development-prompts.md` - Standardized prompts for AI assistants

## Authentication Flow

The application uses a hybrid authentication system:

1. NextAuth.js handles the initial OAuth flow
2. Custom callback routes integrate with Supabase
3. Supabase manages user data and session persistence

New users are directed to a profile completion page before accessing the main dashboard.

## Technologies

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: Zustand with persist middleware
- **Authentication**: NextAuth.js + Supabase
- **Database & Storage**: Supabase
- **Form Handling**: React Hook Form with Zod validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.#   f r o n t e n d - v 1  
 