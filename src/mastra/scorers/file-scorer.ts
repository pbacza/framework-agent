import {
  createToolCallAccuracyScorerCode,
  createCompletenessScorer,
} from "@mastra/evals/scorers/code";

export const toolCallAppropriatenessScorer = createToolCallAccuracyScorerCode({
  expectedTool: "readFileTool",
  strictMode: false,
});

export const completenessScorer = createCompletenessScorer();
