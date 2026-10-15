// ============================================================
// Stepwise AI — Core Types
// ============================================================

export type ExperienceLevel = 'beginner' | 'some' | 'experienced';
export type LearningMode = 'quick' | 'guided' | 'deep';
export type OS = 'windows' | 'macos' | 'linux' | 'unsure';
export type ProjectStatus = 'new' | 'partial' | 'existing-errors';

export interface Tool {
  id: string;
  name: string;
  icon: string;
  category: 'ai' | 'hosting' | 'vcs' | 'ide' | 'runtime' | 'framework' | 'language' | 'platform' | 'other';
  description: string;
  url?: string;
}

export interface TutorialStep {
  id: number;
  title: string;
  tool: string;
  where: string;
  action: string;
  why: string;
  commands?: string[];
  commandExplanations?: string[];
  expectedResult: string;
  verifySuccess: string;
  commonMistakes: string[];
  recovery: string;
}

export interface Tutorial {
  id: string;
  title: string;
  goal: string;
  requiredTools: string[];
  optionalTools: string[];
  toolRelationships: string;
  steps: TutorialStep[];
  completionCriteria: string[];
  commonErrors: { error: string; solution: string }[];
  finalChecklist: string[];
  isDemo?: boolean;
  generatedByAI?: boolean;
}

export interface GuideFormData {
  goal: string;
  selectedTools: string[];
  experienceLevel: ExperienceLevel;
  learningMode: LearningMode;
  os: OS;
  projectStatus: ProjectStatus;
  timeAvailable: string;
  budget: 'free' | 'flexible';
  additionalRequirements: string;
}

export interface TroubleshootingQuery {
  errorMessage: string;
  selectedTool: string;
}

export interface TroubleshootingResult {
  meaning: string;
  likelyCauses: string[];
  firstCheck: string;
  recommendedFix: string;
  verifyFix: string;
  ifStillFailing: string;
}

export type AppView = 'landing' | 'form' | 'tutorial' | 'troubleshoot' | 'demo';
