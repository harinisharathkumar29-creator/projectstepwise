// ============================================================
// Stepwise AI — Tool Registry
// ============================================================

import type { Tool } from '../types';

export const TOOLS: Tool[] = [
  {
    id: 'antigravity',
    name: 'Google Antigravity',
    icon: '🚀',
    category: 'ai',
    description: 'An AI-powered coding assistant by Google DeepMind that helps you write, debug, and deploy code through natural language.',
    url: 'https://antigravity.dev'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    category: 'vcs',
    description: 'A cloud platform that stores your code, tracks every change, and lets you collaborate with others. Think of it as Google Drive for code.',
    url: 'https://github.com'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    icon: '▲',
    category: 'hosting',
    description: 'A hosting platform that takes your code from GitHub and publishes it live on the internet automatically.',
    url: 'https://vercel.com'
  },
  {
    id: 'gemini',
    name: 'Gemini AI',
    icon: '✦',
    category: 'ai',
    description: 'Google\'s large AI model that can understand and generate text, code, and images. Use it as a brain inside your app.',
    url: 'https://ai.google.dev'
  },
  {
    id: 'vscode',
    name: 'VS Code',
    icon: '🔷',
    category: 'ide',
    description: 'A free code editor from Microsoft. It\'s where you write, view, and edit your project files.',
    url: 'https://code.visualstudio.com'
  },
  {
    id: 'terminal',
    name: 'Terminal / Command Prompt',
    icon: '⬛',
    category: 'runtime',
    description: 'A text-based interface where you type commands to control your computer — install packages, start servers, push code to GitHub.',
    url: ''
  },
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    category: 'framework',
    description: 'A JavaScript library for building user interfaces from reusable components. Powers websites like Facebook and Instagram.',
    url: 'https://react.dev'
  },
  {
    id: 'vite',
    name: 'Vite',
    icon: '⚡',
    category: 'framework',
    description: 'A fast development tool that runs your React app locally and bundles it for production in seconds.',
    url: 'https://vitejs.dev'
  },
  {
    id: 'html',
    name: 'HTML',
    icon: '🌐',
    category: 'language',
    description: 'The building blocks of every webpage. HTML defines the structure — headings, buttons, images, and text.',
    url: ''
  },
  {
    id: 'css',
    name: 'CSS',
    icon: '🎨',
    category: 'language',
    description: 'Stylesheet language that controls how HTML elements look — colors, sizes, layouts, and animations.',
    url: ''
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '🟨',
    category: 'language',
    description: 'The programming language of the web. It makes pages interactive — responding to clicks, fetching data, and running logic.',
    url: ''
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '🔷',
    category: 'language',
    description: 'JavaScript with type checking. Catches common bugs before you run the code and makes large projects easier to maintain.',
    url: ''
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    category: 'language',
    description: 'A beginner-friendly programming language used for AI/ML, web backends, scripts, and data processing.',
    url: 'https://python.org'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    icon: '🟩',
    category: 'platform',
    description: 'An open-source Firebase alternative with a Postgres database, authentication, and storage — ready to use for free.',
    url: 'https://supabase.com'
  },
  {
    id: 'lovable',
    name: 'Lovable',
    icon: '💜',
    category: 'ai',
    description: 'An AI-powered web app builder that generates full-stack applications from plain English descriptions.',
    url: 'https://lovable.dev'
  },
  {
    id: 'replit',
    name: 'Replit',
    icon: '♻️',
    category: 'platform',
    description: 'A cloud-based IDE where you can code, run, and deploy applications directly in your browser — no local setup needed.',
    url: 'https://replit.com'
  },
];

export const TOOL_EXPLAINERS: Record<string, {
  purpose: string;
  whyNeeded: string;
  whenToUse: string;
  input: string;
  output: string;
  connectsTo: string;
  required: boolean;
  example: string;
}> = {
  antigravity: {
    purpose: 'AI-assisted coding and deployment helper',
    whyNeeded: 'Lets you describe what you want in plain English, and the AI writes the code, fixes errors, and guides you through deployment.',
    whenToUse: 'When you are building or editing code, when you have an error you cannot understand, or when you need guidance on next steps.',
    input: 'Your text descriptions, goals, and error messages',
    output: 'Generated or edited code, step-by-step instructions, and explanations',
    connectsTo: 'GitHub (to push your code) → Vercel (to deploy it)',
    required: true,
    example: 'You type "build me a landing page with a contact form" and Antigravity writes the React component for you.'
  },
  github: {
    purpose: 'Version control and source code storage',
    whyNeeded: 'Keeps a history of every change, lets you recover from mistakes, and is required by Vercel to deploy your app.',
    whenToUse: 'After your code is working locally, push it to GitHub. Also used to collaborate with others.',
    input: 'Your local project files',
    output: 'A hosted repository with your code history',
    connectsTo: 'Vercel (which reads your code from GitHub to deploy)',
    required: true,
    example: 'You run "git push" and your code uploads to github.com/yourname/your-project.'
  },
  vercel: {
    purpose: 'Deployment and hosting platform',
    whyNeeded: 'Turns your code on GitHub into a real live website that anyone can visit from anywhere in the world.',
    whenToUse: 'After your code is on GitHub and passes a local production build test.',
    input: 'Your GitHub repository and environment variables',
    output: 'A live HTTPS website with a vercel.app domain (or your custom domain)',
    connectsTo: 'End users via their web browser',
    required: true,
    example: 'You connect GitHub to Vercel, click Deploy, and receive a link like your-app.vercel.app.'
  },
  gemini: {
    purpose: 'AI text and code generation API',
    whyNeeded: 'Powers the AI features inside your application — answering questions, generating content, or processing user requests.',
    whenToUse: 'When your app needs to understand or generate language. Requires an API key from Google AI Studio.',
    input: 'Text prompts from your application\'s backend',
    output: 'AI-generated text or structured JSON responses',
    connectsTo: 'Your app\'s backend or serverless function',
    required: false,
    example: 'Your app sends a user question to Gemini, and Gemini returns a helpful answer that your app displays.'
  },
  vscode: {
    purpose: 'Code editor',
    whyNeeded: 'A dedicated editor with syntax highlighting, error detection, and extensions that make coding faster and less error-prone.',
    whenToUse: 'When editing individual files, reviewing code structure, or installing VS Code extensions.',
    input: 'Project files on your computer',
    output: 'Edited and saved code files',
    connectsTo: 'Terminal (for running commands) → Git (for committing changes)',
    required: false,
    example: 'You open your project folder in VS Code, edit a React component, and save — the page updates instantly in your browser.'
  },
  terminal: {
    purpose: 'Command-line interface for running programs and scripts',
    whyNeeded: 'The primary way to install packages, start your dev server, run builds, and push code to GitHub.',
    whenToUse: 'Almost constantly during development. Every npm command runs here.',
    input: 'Typed commands',
    output: 'Command output, installed packages, running servers',
    connectsTo: 'Node.js / npm (package management) → Git (version control)',
    required: true,
    example: 'You type "npm run dev" in the terminal and your website opens at http://localhost:5173.'
  },
};

export function getToolById(id: string): Tool | undefined {
  return TOOLS.find(t => t.id === id);
}
