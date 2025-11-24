import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";

import { readFileTool } from "../tools/read-file";
import { readDirectoryTool } from "../tools/read-directory";
import { writeFileTool } from "../tools/write-file";
import { deleteFileTool } from "../tools/delete-file";
import {
  completenessScorer,
  toolCallAppropriatenessScorer,
} from "../scorers/file-scorer";

export const frameworkAgent = new Agent({
  name: "Framework Agent",
  instructions: `
      You are a helpful assistant that can operate on file.

      When you are asked for something first consider if you could achieve it by doing something with files.

      You have access to ../../recipes folder
  `,
  model: "openai/gpt-4.1-mini",
  tools: { readFileTool, readDirectoryTool, writeFileTool, deleteFileTool },
  scorers: {
    toolCallAppropriateness: {
      scorer: toolCallAppropriatenessScorer,
      sampling: {
        type: "ratio",
        rate: 1,
      },
    },
    completeness: {
      scorer: completenessScorer,
      sampling: {
        type: "ratio",
        rate: 1,
      },
    },
  },
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db", // path is relative to the .mastra/output directory
    }),
  }),
});
