// ============================================================
// Stepwise AI — Gemini AI Service (server-safe)
// ============================================================
// API key is read from import.meta.env.VITE_GEMINI_API_KEY
// IMPORTANT: In production, move Gemini calls to a backend/serverless
// function so the key is never exposed in client bundles.
// For this MVP, the key is kept in a Vite env var.
// ============================================================

import type { GuideFormData, Tutorial, TutorialStep } from '../types';

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

function getApiKey(): string | null {
  return import.meta.env.VITE_GEMINI_API_KEY || null;
}

export function isGeminiConfigured(): boolean {
  const key = getApiKey();
  return !!key && key.length > 10;
}

function buildPrompt(form: GuideFormData): string {
  const toolList = form.selectedTools.join(', ') || 'any suitable tools';
  const levelMap = { beginner: 'Complete Beginner', some: 'Some Experience', experienced: 'Experienced' };
  const modeMap = { quick: 'Quick Mode (minimal explanation)', guided: 'Guided Mode (step-by-step with reasons)', deep: 'Deep Learning Mode (detailed concepts and examples)' };
  const osMap = { windows: 'Windows', macos: 'macOS', linux: 'Linux', unsure: 'Unknown OS' };

  return `You are Stepwise AI — a personalized learning guide for beginners and developers.

Create a complete, structured tutorial for this user:
- GOAL: ${form.goal}
- TOOLS AVAILABLE: ${toolList}
- EXPERIENCE LEVEL: ${levelMap[form.experienceLevel]}
- LEARNING MODE: ${modeMap[form.learningMode]}
- OPERATING SYSTEM: ${osMap[form.os]}
- PROJECT STATUS: ${form.projectStatus}
- TIME AVAILABLE: ${form.timeAvailable || 'Not specified'}
- BUDGET: ${form.budget === 'free' ? 'Free tools only' : 'Flexible'}
${form.additionalRequirements ? `- ADDITIONAL: ${form.additionalRequirements}` : ''}

Return ONLY valid JSON matching this exact structure (no markdown, no explanation outside JSON):

{
  "id": "generated-tutorial-1",
  "title": "string — descriptive tutorial title",
  "goal": "string — the specific end goal",
  "requiredTools": ["tool1", "tool2"],
  "optionalTools": ["tool3"],
  "toolRelationships": "string — how the tools connect",
  "completionCriteria": ["criterion 1", "criterion 2"],
  "commonErrors": [
    { "error": "error description", "solution": "solution" }
  ],
  "finalChecklist": ["item 1", "item 2"],
  "generatedByAI": true,
  "steps": [
    {
      "id": 1,
      "title": "string",
      "tool": "string — tool name",
      "where": "string — exact location/place to go",
      "action": "string — exact action to take",
      "why": "string — why this step matters",
      "commands": ["command1"],
      "commandExplanations": ["explanation of command1"],
      "expectedResult": "string — what should happen",
      "verifySuccess": "string — how to confirm it worked",
      "commonMistakes": ["mistake 1", "mistake 2"],
      "recovery": "string — what to do if it goes wrong"
    }
  ]
}

Rules:
- Provide 6-15 steps appropriate for the goal complexity
- Adapt explanation depth to the learning mode
- Use real, accurate commands only
- Never invent button names or UI elements that don't exist
- For beginners, explain every technical term on first use`;
}

function validateTutorial(data: unknown): data is Tutorial {
  if (!data || typeof data !== 'object') return false;
  const t = data as Record<string, unknown>;
  return (
    typeof t.title === 'string' &&
    typeof t.goal === 'string' &&
    Array.isArray(t.steps) &&
    t.steps.length > 0 &&
    Array.isArray(t.requiredTools) &&
    Array.isArray(t.completionCriteria)
  );
}

export async function generateTutorial(form: GuideFormData): Promise<Tutorial> {
  const key = getApiKey();
  if (!key) {
    throw new Error('GEMINI_NOT_CONFIGURED');
  }

  const response = await fetch(`${API_BASE}?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(form) }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 8192,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    if (response.status === 429) throw new Error('RATE_LIMITED');
    if (response.status === 400) throw new Error('INVALID_REQUEST');
    throw new Error(`API_ERROR:${response.status}:${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error('EMPTY_RESPONSE');
  }

  // Extract JSON from the response (remove any surrounding markdown fences)
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('INVALID_JSON_RESPONSE');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch {
    throw new Error('JSON_PARSE_FAILED');
  }

  if (!validateTutorial(parsed)) {
    throw new Error('INVALID_TUTORIAL_STRUCTURE');
  }

  // Ensure numeric step IDs
  const tutorial = parsed as Tutorial;
  tutorial.steps = tutorial.steps.map((s: TutorialStep, i: number) => ({ ...s, id: i + 1 }));
  tutorial.generatedByAI = true;

  return tutorial;
}

export function getGeminiErrorMessage(error: string): string {
  if (error.includes('GEMINI_NOT_CONFIGURED')) {
    return 'Gemini AI is not configured. Add your VITE_GEMINI_API_KEY to the .env file. For now, you can explore the built-in demo tutorial.';
  }
  if (error.includes('RATE_LIMITED')) {
    return 'Too many requests to Gemini. Please wait a moment and try again.';
  }
  if (error.includes('INVALID_REQUEST')) {
    return 'The request to Gemini was invalid. Try simplifying your goal description.';
  }
  if (error.includes('EMPTY_RESPONSE') || error.includes('INVALID_JSON') || error.includes('JSON_PARSE')) {
    return 'Gemini returned an unexpected response. Please try again.';
  }
  if (error.includes('INVALID_TUTORIAL_STRUCTURE')) {
    return 'The AI response was incomplete. Please try again with a more specific goal.';
  }
  return 'Could not connect to Gemini AI. Check your internet connection and API key, then try again.';
}
