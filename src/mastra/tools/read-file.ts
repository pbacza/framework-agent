import { createTool } from "@mastra/core";
import { readFile } from "fs/promises";
import { z } from "zod";

export const readFileTool = createTool({
  id: "read-file",
  description:
    "Read a file from the filesystem and return its content as plain text.",
  inputSchema: z.object({
    filePath: z.string().describe("The path to the file to read"),
  }),
  outputSchema: z.string(),
  execute: ({ context }) => {
    return getFileContent(context.filePath);
  },
});

const getFileContent = async (filePath: string): Promise<string> => {
  return readFile(filePath, "utf-8");
};
