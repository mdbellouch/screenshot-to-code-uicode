export interface UIAnalysis {
  layoutStyle: string;
  colors: string[];
  typography: string;
  keyComponents: string[];
}

export interface GeneratedResult {
  html: string;
  analysis: UIAnalysis;
}

export interface ExampleTemplate {
  id: string;
  title: string;
  category: string;
  difficulty: "Simple" | "Medium" | "Complex";
  thumbnail: string; // inline SVG rendering of the design mockup or simple abstract shapes so it looks awesome
  description: string;
  result: GeneratedResult;
  userPrompt: string;
}
