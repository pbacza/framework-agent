import { createTool } from "@mastra/core";
import { readdir } from "fs/promises";
import { z } from "zod";

export const readDirectoryTool = createTool({
  id: "read-file",
  description:
    "Read a directory and return a list of file and folder names contained in it.",
  inputSchema: z.object({
    dirPath: z.string().describe("The path to the directory to read"),
  }),
  outputSchema: z.array(z.string()),
  execute: ({ context }) => {
    return getDirectoryContent(context.dirPath);
  },
});

const getDirectoryContent = async (dirPath: string): Promise<string[]> => {
  try {
    return await readdir(dirPath);
  } catch {
    return [];
  }
};
