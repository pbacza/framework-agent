import { createTool } from "@mastra/core";
import { unlink } from "fs/promises";
import { z } from "zod";

export const deleteFileTool = createTool({
  id: "delete-file",
  description: "Delete a file from the filesystem specified by its path.",
  inputSchema: z.object({
    filePath: z.string().describe("The path to the file to delete"),
  }),
  outputSchema: z.promise(z.void()),
  execute: async ({ context }) => {
    await unlink(context.filePath);
  },
});
