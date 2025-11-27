import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { fastembed } from "@mastra/fastembed";

import { readFileTool } from "../tools/read-file";
import { readDirectoryTool } from "../tools/read-directory";
import { writeFileTool } from "../tools/write-file";
import { deleteFileTool } from "../tools/delete-file";

export const frameworkAgent = new Agent({
  name: "Framework Agent",
  instructions: `
      You are a helpful assistant that can operate on file.
      You have access to ../../recipes folder.
      If you will find relevant information story it in memory
  `,
  model: "openai/gpt-4.1-mini",
  tools: { readFileTool, readDirectoryTool, writeFileTool, deleteFileTool },
  memory: new Memory({
    options: {
      lastMessages: 10,
      semanticRecall: {
        topK: 1,
        messageRange: 1,
        scope: "resource",
      },
      workingMemory: {
        enabled: true,
        template: `
        favorite cuisine: 
        favorite ingredients: 
        `,
      },
    },
    embedder: fastembed,
    vector: new LibSQLVector({
      connectionUrl: "file:../vect.db",
    }),
    storage: new LibSQLStore({
      url: "file:../mastra.db", // path is relative to the .mastra/output directory
    }),
  }),
});
