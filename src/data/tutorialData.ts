// ============================================================
// Stepwise AI — Demo Tutorial & Troubleshooting Data
// ============================================================

import type { Tutorial, TroubleshootingQuery, TroubleshootingResult } from '../types';

export const DEMO_TUTORIAL: Tutorial = {
  id: 'demo-deploy',
  title: 'Build and Deploy Your First Website',
  goal: 'Take your project from a local folder all the way to a live URL on the internet using Antigravity, GitHub, and Vercel.',
  requiredTools: ['antigravity', 'github', 'vercel', 'terminal'],
  optionalTools: ['vscode', 'gemini'],
  toolRelationships: 'Google Antigravity helps you build and fix the code → Terminal runs local commands → GitHub stores your source code → Vercel reads GitHub and publishes your live website.',
  completionCriteria: [
    'The website runs without errors on http://localhost:5173 (or similar)',
    'npm run build completes successfully with no errors',
    'The code is pushed to a public or private GitHub repository',
    'Vercel has imported the repository and deployed it',
    'Opening the Vercel URL shows your live website',
  ],
  commonErrors: [
    { error: "'npm' is not recognized as a command", solution: "Node.js is not installed. Visit nodejs.org, download the LTS version, install it, then restart your terminal." },
    { error: "Cannot find package.json", solution: "You are in the wrong folder. Use your terminal to navigate into your project folder first (the one that contains package.json)." },
    { error: "Port 5173 already in use", solution: "Another process is using that port. Stop it by pressing Ctrl+C in the terminal that's running it, or run: npx kill-port 5173" },
    { error: "Module not found", solution: "A file import path is incorrect or a package is missing. Check the exact file path in the import statement, or run npm install to restore packages." },
    { error: "Build failed — TypeScript errors", solution: "TypeScript found type mismatches. Read the exact error line — it tells you which file and line number. Fix that specific issue then rebuild." },
    { error: "git push rejected", solution: "The remote has changes your local copy doesn't have. Run: git pull --rebase origin main, resolve any conflicts, then push again." },
    { error: "Vercel deployment failed", solution: "Check the Vercel build logs. The most common cause is a missing environment variable or a build error that also fails locally. Fix it locally first, then push." },
  ],
  finalChecklist: [
    'Website loads at localhost during development',
    'All navigation and buttons work',
    'npm run build exits with code 0 (no errors)',
    'Repository is visible on GitHub',
    'Vercel shows "Ready" status',
    'Live URL opens the correct website',
    'No API keys or secrets in the source code',
  ],
  isDemo: true,
  steps: [
    {
      id: 1,
      title: 'Understand the project requirements',
      tool: 'Google Antigravity',
      where: 'The Antigravity chat panel in your IDE or browser',
      action: 'Describe your project goal to Antigravity in plain English. Ask it to summarize the tools you will need and what each step will involve.',
      why: 'Before touching any code, you need a clear mental map of what you are building and why each tool exists. This prevents confusion later and saves time by finding problems early.',
      commands: [],
      commandExplanations: [],
      expectedResult: 'Antigravity gives you a summary of the tech stack, the workflow, and an outline of steps from local development to live deployment.',
      verifySuccess: 'You can answer: What is the app doing? Which tools does it use? In what order will I use them?',
      commonMistakes: [
        'Skipping this step and jumping straight to commands — leads to confusion about what each command does.',
        'Being too vague. Instead of "make a website", say "build a React app with a landing page and deploy it to Vercel".',
      ],
      recovery: 'If Antigravity gives a confusing answer, ask a follow-up: "Explain that like I am a complete beginner who has never used a terminal."',
    },
    {
      id: 2,
      title: 'Open the project in your editor',
      tool: 'VS Code or Google Antigravity',
      where: 'Your computer\'s file system',
      action: 'Open the project folder in VS Code (File → Open Folder) or work directly in the Antigravity IDE. Make sure you can see the file tree on the left side.',
      why: 'You need to see and edit the project files. The file tree shows you what already exists — src/, public/, package.json — so you know where everything lives.',
      commands: [],
      commandExplanations: [],
      expectedResult: 'The project folder is open and you can see files like index.html, package.json, and the src/ folder.',
      verifySuccess: 'You can click src/main.tsx (or index.js) and see your application code without getting a "file not found" error.',
      commonMistakes: [
        'Opening the wrong folder (opening a parent folder instead of the project folder itself).',
        'Not seeing package.json at the root — if you don\'t, you are in the wrong folder.',
      ],
      recovery: 'Close VS Code and re-open using File → Open Folder, then navigate to the specific project directory that contains package.json.',
    },
    {
      id: 3,
      title: 'Understand package.json and your dependencies',
      tool: 'VS Code / Any text editor',
      where: 'The package.json file at the root of your project',
      action: 'Open package.json and read the "scripts" section and the "dependencies" section. Note the exact commands defined under "scripts".',
      why: 'package.json is the control center of a Node.js project. It tells npm which packages to install, what commands to run, and what your project is called. Never assume commands — always read this file first.',
      commands: [],
      commandExplanations: [],
      expectedResult: 'You can see entries like "dev": "vite", "build": "tsc -b && vite build". These are the commands you will run next.',
      verifySuccess: 'You know the exact command to start the dev server (e.g., npm run dev) and the exact command to build for production (e.g., npm run build).',
      commonMistakes: [
        'Assuming the command is always "npm start" — it depends on what is in the scripts section.',
        'Editing package.json manually to change a version — this can break things. Use npm install instead.',
      ],
      recovery: 'If package.json is missing, your project was not scaffolded correctly. Ask Antigravity to help you initialize a new project from scratch.',
    },
    {
      id: 4,
      title: 'Install project dependencies',
      tool: 'Terminal',
      where: 'Your terminal, inside the project folder',
      action: 'Run the install command to download all the packages listed in package.json into the node_modules folder.',
      why: 'The node_modules folder is not committed to GitHub to save space. When you first open a project (or after a fresh clone), you must install the packages before the app can run.',
      commands: ['npm install'],
      commandExplanations: [
        'npm install — reads package.json, downloads every listed dependency, and saves them to node_modules/. This can take 30–120 seconds on a slow connection.'
      ],
      expectedResult: 'Terminal shows "added X packages" or similar. A node_modules/ folder now exists in your project.',
      verifySuccess: 'No red error lines in the terminal output. The node_modules/ folder is visible in your file tree.',
      commonMistakes: [
        'Running npm install in the wrong directory (not the one with package.json).',
        'Seeing "npm: command not found" — Node.js needs to be installed first from nodejs.org.',
        'Ignoring npm warn messages — warnings are usually safe to ignore. npm ERR! messages need attention.',
      ],
      recovery: 'If install fails: (1) Make sure you are in the correct folder. (2) Delete node_modules/ and package-lock.json, then run npm install again. (3) Check your internet connection.',
    },
    {
      id: 5,
      title: 'Start the local development server',
      tool: 'Terminal',
      where: 'Your terminal, inside the project folder',
      action: 'Run the dev server command. Keep this terminal window open — closing it stops the server.',
      why: 'The development server runs your app locally so you can see changes instantly without deploying. It watches your files and reloads the browser automatically every time you save.',
      commands: ['npm run dev'],
      commandExplanations: [
        'npm run dev — runs the "dev" script from package.json. For Vite projects this starts a local server, usually at http://localhost:5173.'
      ],
      expectedResult: 'Terminal displays a local URL like http://localhost:5173. Your app is now running.',
      verifySuccess: 'Open that URL in your browser. You should see your website — not a blank page and not an error page.',
      commonMistakes: [
        'Closing the terminal window — this stops the server. Keep it open while developing.',
        'Not opening the URL the terminal shows. Look for the line that says "Local: http://localhost:XXXX".',
        'Seeing a blank white page — open browser DevTools (F12), check the Console tab for errors.',
      ],
      recovery: 'If the server fails to start: (1) Check for "port already in use" — stop other processes. (2) Make sure you ran npm install first. (3) Paste the exact error into Antigravity for help.',
    },
    {
      id: 6,
      title: 'Preview and verify the website locally',
      tool: 'Web Browser',
      where: 'Your browser at http://localhost:5173 (or the URL shown by your terminal)',
      action: 'Open the local URL in your browser. Click through every page and feature. Open Browser DevTools (F12) → Console tab and check for errors.',
      why: 'You must verify the app works correctly before pushing to GitHub. Errors that exist locally will also break the deployed version.',
      commands: [],
      commandExplanations: [],
      expectedResult: 'All pages load, navigation works, no red errors appear in the browser console.',
      verifySuccess: 'You can visit every part of the site without seeing a blank page, crash, or red console errors.',
      commonMistakes: [
        'Assuming it works without checking the browser console.',
        'Not testing on mobile — press F12 → the mobile icon to preview different screen sizes.',
      ],
      recovery: 'If you see errors in the console: copy the exact error message and paste it to Antigravity for a targeted fix.',
    },
    {
      id: 7,
      title: 'Run the production build',
      tool: 'Terminal',
      where: 'Your terminal, inside the project folder (open a new terminal tab — keep the dev server running)',
      action: 'Run the production build command. This compiles and optimizes your code for deployment.',
      why: 'Vercel runs this same command when you deploy. If it fails locally, it will fail on Vercel too. Always test the build before pushing.',
      commands: ['npm run build'],
      commandExplanations: [
        'npm run build — compiles TypeScript, bundles all JavaScript and CSS into optimized files, and outputs them to the dist/ folder. This is what actually gets deployed.'
      ],
      expectedResult: 'Terminal shows "✓ built in X.Xs" or similar. A dist/ folder appears in your project containing HTML, JS, and CSS files.',
      verifySuccess: 'The command exits with no errors. The dist/ folder is not empty.',
      commonMistakes: [
        'Having TypeScript errors that only appear during build, not during dev — read every error line carefully.',
        'Committing the dist/ folder to Git — it should be in .gitignore.',
      ],
      recovery: 'If build fails: read the exact error and file name in the output. Fix that specific file. Run the build again. Do not push to GitHub until it passes.',
    },
    {
      id: 8,
      title: 'Create a GitHub repository',
      tool: 'GitHub',
      where: 'github.com → click the "+" icon → "New repository"',
      action: 'Create a new repository. Give it a meaningful name. Choose public or private. Do NOT check "Initialize with README" (your project already has files). Click "Create repository".',
      why: 'GitHub is where your code lives in the cloud. Vercel will connect to this repository to deploy your site automatically every time you push new code.',
      commands: [],
      commandExplanations: [],
      expectedResult: 'GitHub shows you a page with setup instructions including a remote URL like https://github.com/yourname/repo-name.git',
      verifySuccess: 'The repository page exists at github.com/yourname/repo-name and shows the "Quick setup" instructions.',
      commonMistakes: [
        'Initializing with a README when your project already has files — causes a merge conflict on first push.',
        'Using spaces in the repository name — GitHub converts them to hyphens, but it is cleaner to use hyphens yourself.',
      ],
      recovery: 'If you accidentally initialized with a README, run "git pull origin main --rebase" after adding the remote, then push again.',
    },
    {
      id: 9,
      title: 'Connect your project to GitHub and push',
      tool: 'Terminal',
      where: 'Your terminal, inside the project folder',
      action: 'Initialize Git (if not already done), add the GitHub remote, commit your files, and push.',
      why: 'These commands record a snapshot of your code and upload it to GitHub. Without this step, Vercel has nothing to deploy.',
      commands: [
        'git init',
        'git add .',
        'git commit -m "Initial commit: Stepwise AI"',
        'git branch -M main',
        'git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git',
        'git push -u origin main'
      ],
      commandExplanations: [
        'git init — creates a new Git repository in your current folder (only needed once).',
        'git add . — stages all changed files so they are included in the next commit.',
        'git commit -m "..." — saves a permanent snapshot with a descriptive message.',
        'git branch -M main — renames your branch to "main" (GitHub\'s default branch name).',
        'git remote add origin ... — connects your local repo to your GitHub repository. Replace the URL with the one GitHub gave you.',
        'git push -u origin main — uploads your committed code to GitHub. The -u flag sets this as the default push destination.',
      ],
      expectedResult: 'Terminal shows "Branch main set up to track origin/main" and your files appear on github.com.',
      verifySuccess: 'Visit your GitHub repository URL in a browser. You should see your project files listed there.',
      commonMistakes: [
        'Not replacing YOUR_USERNAME and YOUR_REPO_NAME with your actual values.',
        'Running git init in the wrong folder.',
        'Getting "fatal: remote origin already exists" — run git remote remove origin first, then add it again.',
      ],
      recovery: 'If push is rejected: run "git pull origin main --rebase" to sync, resolve any conflicts, then push again.',
    },
    {
      id: 10,
      title: 'Import your repository into Vercel',
      tool: 'Vercel',
      where: 'vercel.com → "Add New" → "Project"',
      action: 'Sign in to Vercel with your GitHub account. Click "Add New Project". Select "Import Git Repository". Find your repository and click "Import". Review the settings — Vercel usually auto-detects Vite/React correctly.',
      why: 'Vercel connects to your GitHub repository, runs the build command automatically, and hosts the output. Every future push to main will trigger a new deployment automatically.',
      commands: [],
      commandExplanations: [],
      expectedResult: 'Vercel shows your repository with detected framework (Vite) and build command (npm run build), output directory (dist).',
      verifySuccess: 'The project overview page shows the correct framework and settings before you click Deploy.',
      commonMistakes: [
        'Not setting environment variables before the first deploy — if your app needs a GEMINI_API_KEY, add it in the Environment Variables section now.',
        'Wrong output directory — for Vite it must be "dist". For Create React App it is "build".',
      ],
      recovery: 'If Vercel cannot find your repo: make sure you granted Vercel access to the repository in GitHub → Settings → Applications → Authorized OAuth Apps.',
    },
    {
      id: 11,
      title: 'Configure environment variables (if needed)',
      tool: 'Vercel',
      where: 'Vercel project settings → "Environment Variables" tab',
      action: 'If your application uses a GEMINI_API_KEY or any other secret, add it here. Click "Add" → enter the variable name (e.g., GEMINI_API_KEY) and its value → select "Production, Preview, Development" → Save.',
      why: 'Environment variables let you pass secrets to your app without ever putting them in your source code. Vercel injects them at build time and runtime securely.',
      commands: [],
      commandExplanations: [],
      expectedResult: 'The variable appears in the list under Environment Variables. It is NOT visible in your source code or GitHub.',
      verifySuccess: 'The variable is listed in Vercel settings. Your app code reads it via process.env.GEMINI_API_KEY (server-side) or import.meta.env.VITE_VARIABLE (client-side Vite).',
      commonMistakes: [
        'Putting API keys directly in your code or .env file and committing them to GitHub — anyone can then steal them.',
        'Using VITE_ prefix only for variables that need to be visible in the browser. Backend secrets should NOT have this prefix.',
      ],
      recovery: 'If the app fails due to missing variables: check Vercel → your project → Settings → Environment Variables. Add the missing one and redeploy.',
    },
    {
      id: 12,
      title: 'Deploy your application',
      tool: 'Vercel',
      where: 'Vercel project import page → click the "Deploy" button',
      action: 'Click "Deploy". Watch the build logs in real time. Wait for the "Congratulations" screen and the live URL.',
      why: 'This is the moment everything comes together. Vercel runs your build command on their servers and publishes the output to a global CDN (Content Delivery Network) so it loads fast worldwide.',
      commands: [],
      commandExplanations: [],
      expectedResult: 'Vercel shows "Congratulations! Your project has been deployed" and gives you a URL ending in .vercel.app',
      verifySuccess: 'Clicking the URL opens your website in a browser. The URL works from your phone on mobile data (not just your home Wi-Fi).',
      commonMistakes: [
        'Treating the Vercel URL the same as localhost — localhost is only your computer; the Vercel URL is truly live on the internet.',
        'Assuming the first deploy always succeeds — check the build log if it fails.',
      ],
      recovery: 'If deployment fails: click "View Build Logs" in Vercel. Find the first red error line. Fix that issue locally, push to GitHub, and Vercel will automatically redeploy.',
    },
    {
      id: 13,
      title: 'Open and verify your live website',
      tool: 'Web Browser',
      where: 'The .vercel.app URL Vercel gave you',
      action: 'Open the URL. Test every feature. Share the link with someone else and ask them to open it. Check the browser console for errors.',
      why: 'A successful local build does not guarantee a perfect deployment. Real-world conditions (CDN caching, environment variables, HTTPS) can introduce new issues that only appear live.',
      commands: [],
      commandExplanations: [],
      expectedResult: 'The website looks and behaves identically to the local version. It loads in under 5 seconds. No console errors.',
      verifySuccess: 'Another person can open the URL on their phone or laptop and the site works correctly.',
      commonMistakes: [
        'Forgetting that the .vercel.app URL is different from localhost — they are separate environments.',
        'Not checking on mobile — Vercel serves real users on all device types.',
      ],
      recovery: 'If the live site has errors that do not appear locally: check that all environment variables are set in Vercel settings. Redeploy after fixing them.',
    },
  ],
};

// ============================================================
// Troubleshooting knowledge base
// ============================================================

const TROUBLESHOOTING_KB: Record<string, TroubleshootingResult> = {
  'npm not recognized': {
    meaning: "Your computer cannot find the npm program because Node.js is either not installed or was installed incorrectly.",
    likelyCauses: ["Node.js is not installed", "Node.js was installed but the terminal needs to be restarted", "The PATH environment variable was not updated during install"],
    firstCheck: "Type 'node --version' in your terminal. If that also fails, Node.js is not installed.",
    recommendedFix: "Go to https://nodejs.org, download the LTS version, run the installer, then CLOSE and REOPEN your terminal and try again.",
    verifyFix: "Run 'node --version' — you should see something like v20.x.x. Then run 'npm --version' — you should see a version number.",
    ifStillFailing: "On Windows, search for 'Environment Variables', open System Properties → Advanced → Environment Variables, and check that the Node.js path appears in the System PATH variable.",
  },
  'module not found': {
    meaning: "JavaScript/TypeScript cannot find the file or package you are trying to import. Either the path is wrong or the package is not installed.",
    likelyCauses: ["Incorrect file path in an import statement", "Package not installed (missing from node_modules/)", "Typo in the package or file name", "File was moved or renamed"],
    firstCheck: "Read the exact error — it tells you the file and line number of the failing import. Open that file and check the import path.",
    recommendedFix: "If it is a package (not starting with ./ or ../), run 'npm install <package-name>'. If it is a local file, fix the path to match the actual file location.",
    verifyFix: "Run your dev server or build again. The module not found error should be gone.",
    ifStillFailing: "Delete node_modules/ and package-lock.json and run 'npm install' to restore all packages from scratch.",
  },
  'port already in use': {
    meaning: "Another process on your computer is already using the network port your dev server wants to use (usually 5173 or 3000).",
    likelyCauses: ["A previous dev server is still running in another terminal", "Another application is using that port"],
    firstCheck: "Look for other open terminal windows that might have a dev server running (you'd see the localhost URL printed there).",
    recommendedFix: "Press Ctrl+C in that terminal to stop the other server, then start your dev server again. Alternatively, run: npx kill-port 5173",
    verifyFix: "Run 'npm run dev' again — it should now start on the expected port.",
    ifStillFailing: "On Windows: run 'netstat -ano | findstr :5173' to find the process ID, then 'taskkill /PID <id> /F' to force stop it.",
  },
  'git push rejected': {
    meaning: "GitHub refused your push because the remote repository has commits that your local repository does not have yet.",
    likelyCauses: ["Someone else pushed changes to the same branch", "You initialized GitHub with a README but your local repo does not have it"],
    firstCheck: "Run 'git status' and 'git log --oneline -5' to see your local commit history.",
    recommendedFix: "Run 'git pull --rebase origin main' to pull remote changes and replay your commits on top. Then run 'git push' again.",
    verifyFix: "After pushing, visit your GitHub repository — you should see your latest commit at the top.",
    ifStillFailing: "If there are merge conflicts, Git will mark them in the affected files with <<<< HEAD markers. Edit those files to resolve them, then run 'git add .' and 'git rebase --continue'.",
  },
  'vercel deployment failed': {
    meaning: "Vercel tried to build and deploy your project but the process failed — usually for the same reason a local 'npm run build' would fail.",
    likelyCauses: ["Build command fails (TypeScript errors, missing imports)", "Missing environment variable", "Wrong output directory configured", "Package installation failed"],
    firstCheck: "In Vercel, click 'View Build Logs' and scroll to the first red error line. That is the actual cause.",
    recommendedFix: "Reproduce the error locally: run 'npm run build' and fix any errors. Then push to GitHub — Vercel will automatically redeploy.",
    verifyFix: "The Vercel dashboard should show 'Ready' status and a green checkmark after the new deployment.",
    ifStillFailing: "Check Vercel project settings: verify the Framework Preset, Build Command (npm run build), and Output Directory (dist for Vite, build for CRA).",
  },
  'missing package json': {
    meaning: "npm cannot find the package.json file, which means you are running npm commands in the wrong folder.",
    likelyCauses: ["Terminal is in a parent directory, not the project directory", "The project was not properly initialized"],
    firstCheck: "Run 'ls' (Mac/Linux) or 'dir' (Windows) and check if package.json appears in the output.",
    recommendedFix: "Navigate to the correct project folder using 'cd your-project-name' then run your npm command again.",
    verifyFix: "Run 'npm run dev' — it should start without the 'missing package.json' error.",
    ifStillFailing: "If package.json truly does not exist, the project was not initialized. Ask Antigravity to help you scaffold a new project with 'npm create vite@latest'.",
  },
  'typescript error': {
    meaning: "TypeScript found a type mismatch or error in your code that prevents a successful build.",
    likelyCauses: ["A variable is used before it is defined", "Wrong type passed to a function", "Missing required property on an object", "Incorrect import or export"],
    firstCheck: "Read the exact error message — TypeScript always tells you the file name, line number, and what it expected vs. what it found.",
    recommendedFix: "Open the file and line number mentioned in the error. Fix the type mismatch. If unsure what type to use, paste the error into Antigravity for an explanation.",
    verifyFix: "Run 'npm run build' again — TypeScript errors block the build, so no error means the fix worked.",
    ifStillFailing: "As a temporary workaround, you can add '// @ts-ignore' above the problematic line, but address the root cause before deploying to production.",
  },
  'missing environment variable': {
    meaning: "Your application is trying to read a configuration value (like an API key) that was not provided to the running environment.",
    likelyCauses: ["No .env file in the project root", "The variable was added to .env but the dev server was not restarted", "For Vercel, the variable was not added in the project settings"],
    firstCheck: "Check if a .env file exists in your project root. Open it and verify the variable name matches exactly what your code expects.",
    recommendedFix: "Create or edit .env in the project root. Add the line: VITE_GEMINI_API_KEY=your_actual_key_here. Then restart the dev server (Ctrl+C, then npm run dev).",
    verifyFix: "The feature that depended on the missing variable should now work correctly.",
    ifStillFailing: "For Vercel deployments: go to Vercel → Your Project → Settings → Environment Variables and add the variable there. Then redeploy.",
  },
};

export function getTroubleshootingResult(query: TroubleshootingQuery): TroubleshootingResult | null {
  const msg = query.errorMessage.toLowerCase();

  if (msg.includes('npm') && (msg.includes('not recognized') || msg.includes('not found') || msg.includes('command not found'))) {
    return TROUBLESHOOTING_KB['npm not recognized'];
  }
  if (msg.includes('module not found') || msg.includes('cannot find module') || msg.includes("can't resolve")) {
    return TROUBLESHOOTING_KB['module not found'];
  }
  if (msg.includes('port') && (msg.includes('in use') || msg.includes('already used') || msg.includes('eaddrinuse'))) {
    return TROUBLESHOOTING_KB['port already in use'];
  }
  if (msg.includes('git') && (msg.includes('rejected') || msg.includes('refused') || msg.includes('push'))) {
    return TROUBLESHOOTING_KB['git push rejected'];
  }
  if (msg.includes('vercel') && (msg.includes('fail') || msg.includes('error') || msg.includes('deploy'))) {
    return TROUBLESHOOTING_KB['vercel deployment failed'];
  }
  if (msg.includes('package.json') && (msg.includes('missing') || msg.includes('not found') || msg.includes("can't find"))) {
    return TROUBLESHOOTING_KB['missing package json'];
  }
  if (msg.includes('typescript') || msg.includes('ts error') || msg.includes('type error') || (msg.includes('error ts') && msg.match(/ts\d+/))) {
    return TROUBLESHOOTING_KB['typescript error'];
  }
  if (msg.includes('env') && (msg.includes('missing') || msg.includes('undefined') || msg.includes('not set'))) {
    return TROUBLESHOOTING_KB['missing environment variable'];
  }

  return null;
}

export const COMMON_ERROR_EXAMPLES = Object.keys(TROUBLESHOOTING_KB).map(k => {
  const result = TROUBLESHOOTING_KB[k];
  return {
    key: k,
    label: result.meaning.split('.')[0],
    sample: k.replace(/-/g, ' '),
  };
});
