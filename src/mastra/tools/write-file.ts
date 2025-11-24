import { createTool } from "@mastra/core";
import { writeFile } from "fs/promises";
import { z } from "zod";

export const writeFileTool = createTool({
  id: "write-file",
  description:
    "Write content to a file on the filesystem. Creates the file if it does not exist, or overwrites it if it does.",
  inputSchema: z.object({
    filePath: z.string().describe("The path to the file to write"),
    content: z.string().describe("The content to write to the file"),
  }),
  outputSchema: z.promise(z.void()),
  execute: ({ context: { filePath, content } }) => {
    return writeFileContent(filePath, content);
  },
});

const writeFileContent = async (
  filePath: string,
  content: string,
): Promise<void> => {
  await writeFile(filePath, content, "utf-8");
};
