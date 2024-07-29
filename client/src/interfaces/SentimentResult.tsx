export interface Assessment {
  text: string;
  sentiment: string;
}

export interface OpinionTarget {
  text: string;
  sentiment: string;
  confidenceScores: Record<string, number>;
}

export interface Opinion {
  target: OpinionTarget;
  assessments: Assessment[];
}

export interface Sentence {
  sentiment: string;
  confidenceScores: Record<string, number>;
  text: string;
  opinions: Opinion[];
}

export interface Result {
  id: string;
  sentiment: string;
  confidenceScores: Record<string, number>;
  sentences: Sentence[];
  error?: string;
}
