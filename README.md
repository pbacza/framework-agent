# Framework Agent

An AI agent built with [Mastra](https://mastra.ai) - an iteration of my [handmade-agent](https://github.com/pbacza/handmade-agent) exploring agent development with a production-ready framework.

## Overview

This project demonstrates building an AI agent using the Mastra framework, implementing the same core functionality as my handmade-agent (LLM + tools + loop) but with enterprise features like memory, observability, and context management built in.

## What I Learned

Building agents from scratch taught me the fundamentals aren't complex - just an LLM, tools, and a control loop. But production agents need more:

- **Memory systems** for context across conversations
- **Semantic recall** to retrieve relevant past interactions
- **Working memory** to maintain user preferences
- **Observability** for debugging and monitoring
- **Structured evaluation** to measure agent performance

With Mastra, these features require only a few lines of configuration versus building them from scratch.

## Features

The agent can interact with the filesystem through these tools:

- **Read files** - Access file contents
- **Write files** - Create or modify files
- **Read directories** - List directory contents
- **Delete files** - Remove files from the filesystem

### Memory & Context

Unlike the handmade version, this agent includes:

- **Conversational memory** - Remembers the last 10 messages
- **Semantic recall** - Retrieves contextually relevant past interactions (topK: 1)
- **Working memory** - Maintains user preferences (favorite cuisine, ingredients, etc.)
- **Vector embeddings** - Uses FastEmbed for semantic search
- **Persistent storage** - LibSQL for both relational and vector data

All configured in ~30 lines of code in [framework-agent.ts](src/mastra/agents/framework-agent.ts:20-43).

### Evaluation & Observability

Built-in scoring system to evaluate agent performance:

- **Tool call appropriateness** - Validates correct tool usage
- **Completeness** - Measures task completion quality
- **Default tracing** - Automatic observability for debugging

## Getting Started

### Prerequisites

- Node.js >= 24.11.1

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file with your OpenAI API key:

```bash
OPENAI_API_KEY=your_api_key_here
```

### Running the Agent

Start the development server:

```bash
npm run dev
```

Then interact with the agent through the Mastra CLI interface.

### Build & Deploy

```bash
npm run build
npm start
```

## Project Structure

```
src/mastra/
├── agents/
│   └── framework-agent.ts    # Agent configuration with memory
├── tools/
│   ├── read-file.ts          # Read file tool
│   ├── write-file.ts         # Write file tool
│   ├── read-directory.ts     # Directory listing tool
│   └── delete-file.ts        # File deletion tool
├── scorers/
│   └── file-scorer.ts        # Evaluation scorers
└── index.ts                  # Mastra instance configuration
```

## Comparison: Handmade vs Framework

| Feature | Handmade Agent | Framework Agent |
|---------|---------------|-----------------|
| Core Loop | Manual implementation | Built-in |
| Tool System | Custom | Mastra createTool |
| Memory | None | Multi-layered |
| Observability | None | Auto-instrumented |
| Evaluation | None | Built-in scorers |
| Lines of Code | ~200 | ~100 (excluding tools) |

## Key Takeaways

1. **From scratch teaches fundamentals** - Understanding LLM + tools + loop is crucial
2. **Frameworks add production value** - Memory, observability, and evals matter at scale
3. **Configuration over code** - Mastra provides powerful features through simple config
4. **Memory is transformative** - Semantic recall and working memory enable personalized experiences

## Related Projects

- [handmade-agent](https://github.com/pbacza/handmade-agent) - The from-scratch implementation
- [Mastra](https://mastra.ai) - The framework powering this agent

## License

ISC
