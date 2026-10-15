export interface SlideItem {
  id: string;
  slideNumber: number;
  title: string;
  subtitle: string;
  weekId: number;
  content: {
    keyPoints: string[];
    explanation: string;
    officeExample?: string;
    markdownSample?: string;
    visualType?: 'vault' | 'markdown' | 'graph' | 'daily' | 'pkm' | 'comparison' | 'steps';
    stepList?: string[];
  };
  trainerNotes: {
    talkingScript: string;
    analogy: string;
    questionToAsk: string;
    commonMistake: string;
    handsOnTime: string;
  };
}

export interface WeekCurriculum {
  weekNumber: number;
  title: string;
  subtitle: string;
  summary: string;
  duration: string;
  targetAudienceSkill: string;
  learningOutcomes: string[];
  keyConceptAnalogy: {
    term: string;
    officeAnalogy: string;
    description: string;
  }[];
  detailedSections: {
    title: string;
    content: string;
    steps?: string[];
    tips?: string[];
    warningNote?: string;
    exampleBox?: {
      title: string;
      code: string;
      previewExplanation: string;
    };
  }[];
  handsOnExercise: {
    title: string;
    objective: string;
    instructions: string[];
    expectedResult: string;
  };
  trainerTipForWeek: string;
}

export interface OfficeTemplate {
  id: string;
  title: string;
  category: 'daily' | 'meeting' | 'sop' | 'project' | 'contact';
  description: string;
  tags: string[];
  markdownContent: string;
  howToUseInObsidian: string;
}

export interface GraphNode {
  id: string;
  label: string;
  group: 'meeting' | 'person' | 'project' | 'doc' | 'sop';
  x: number;
  y: number;
  connections: string[];
  description: string;
}
