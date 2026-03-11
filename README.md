# WaspCode 🐝

<p align="center">
  <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="WaspCode Logo" width="200">
</p>

<p align="center">
  <strong>An Autonomous AI Coding Agent for the Terminal</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/waspcode-ai">
    <img alt="npm version" src="https://img.shields.io/npm/v/waspcode-ai?style=flat-square&color=blue">
  </a>
  <a href="https://github.com/eres45/WaspCode/actions/workflows/publish.yml">
    <img alt="build status" src="https://img.shields.io/github/actions/workflow/status/eres45/WaspCode/publish.yml?style=flat-square&color=green">
  </a>
  <a href="https://github.com/eres45/WaspCode/blob/main/LICENSE">
    <img alt="license" src="https://img.shields.io/github/license/eres45/WaspCode?style=flat-square&color=purple">
  </a>
</p>

---

## 🎯 What is WaspCode?

**WaspCode** is a powerful, open-source AI coding agent that lives in your terminal. It combines the intelligence of large language models with deep codebase understanding to help you write, debug, refactor, and ship code faster than ever before.

Think of it as having a senior developer pair programming with you 24/7 — one that never gets tired, knows every file in your project, and can execute changes instantly.

### Screenshots

#### 1. Terminal Interface — Welcome Screen
The first thing you see when launching WaspCode. Features our signature ASCII art logo and clear navigation options to start coding or exit.

![WaspCode Welcome Screen](./packages/opencode/waspcode-assets/Screenshot%202026-03-12%20002147.png)

---

#### 2. AI Chat Interface
The main interaction hub where you chat with the AI agent. Shows the conversation history, current model in use, and real-time code suggestions.

![WaspCode AI Chat](./packages/opencode/waspcode-assets/Screenshot%202026-03-12%20002204.png)

---

#### 3. Code Actions Panel
Where the magic happens — WaspCode analyzes your code and presents actionable suggestions. Shows file diffs, refactoring options, and direct code edits.

![WaspCode Code Actions](./packages/opencode/waspcode-assets/Screenshot%202026-03-12%20002224.png)

---

#### 4. Settings & Configuration
Customize your experience. Switch between AI models (15 available), configure keyboard shortcuts, set your preferred API endpoints, and personalize the theme.

![WaspCode Settings](./packages/opencode/waspcode-assets/Screenshot%202026-03-12%20002255.png)

---

## 🚀 Our Vision

### Building the Future of AI-Assisted Development

WaspCode is more than just a coding assistant — it is a complete reimagining of how developers interact with AI:

**🔹 Terminal-First Design**
We believe the terminal is the natural habitat for developers. WaspCode brings AI capabilities directly into your existing workflow without context switching or browser tabs.

**🔹 Provider Agnostic**
No vendor lock-in. Use Claude, OpenAI, Google, local models, or our curated custom model collection. As AI models evolve and pricing changes, you stay in control.

**🔹 Deep Codebase Understanding**
WaspCode does not just chat — it *understands*. With built-in LSP support and semantic code analysis, it navigates your codebase like a senior engineer.

**🔹 Open & Extensible**
100% open source. Fork it, extend it, make it yours. The client/server architecture means the TUI is just one possible interface — imagine driving your coding agent from a mobile app while it runs on your workstation.

**🔹 Community Driven**
Built by developers, for developers. Your feedback shapes the roadmap.

---

## 🤖 AI Models

WaspCode provides **14 production-grade models** through our unified **Custom Models** provider. No external API keys needed — everything works out of the box.

### Default Model
**`custom/qwen3-coder-plus`** — Our recommended default for general coding tasks. Fast, accurate, with 128K context window.

### Available Models

#### Code-Focused Models
| Model | Best For | Context | Features |
|-------|----------|---------|----------|
| `custom/qwen3-coder-plus` | **General Coding** ⚡ Default | 128K | Tool calls, fast responses |
| `custom/qwen3-coder-flash` | **Quick Tasks** | 128K | Ultra-fast completions |

#### Advanced Reasoning Models
| Model | Best For | Context | Features |
|-------|----------|---------|----------|
| `custom/claude-opus-4.5` | **Complex Analysis** | 200K | Reasoning, image input, tool calls |
| `custom/claude-sonnet-4.5` | **Balanced Power** | 200K | Reasoning, image input, tool calls |
| `custom/claude-haiku-4.5` | **Speed & Efficiency** | 200K | Fast responses, tool calls |
| `custom/gpt-5.2` | **Latest GPT** | 128K | Reasoning, image input, tool calls |
| `custom/kimi-k2-thinking` | **Deep Reasoning** | 128K | Chain-of-thought reasoning |

#### Long Context Models
| Model | Best For | Context | Features |
|-------|----------|---------|----------|
| `custom/kimi-k2-0905` | **Massive Contexts** | 256K | MoE architecture, 256K window |
| `custom/kimi-k2.5` | **Long Documents** | 128K | Great for large codebases |
| `custom/gemini-3-pro` | **Huge Contexts** | 2M | Up to 2 million tokens |
| `custom/gemini-3-flash` | **Fast Long Context** | 1M | 1M context, image input |

#### Specialized Models
| Model | Best For | Context | Features |
|-------|----------|---------|----------|
| `custom/sonar-pro` | **Research** | 128K | Reasoning, tool calls |
| `custom/sonar` | **Quick Research** | 128K | Fast search capabilities |
| `custom/grok-4.1-fast` | **Real-time** | 128K | X integration, fast responses |

> 💡 **Pro Tip:** Switch models anytime in settings or use the `@model` command. Different models excel at different tasks — try `claude-opus-4.5` for complex refactors, `gemini-3-pro` for huge codebases, or `kimi-k2-thinking` for deep reasoning.

---

## ⚡ Quick Start

### Installation

`ash
# Install globally via npm (recommended)
npm install -g waspcode-ai

# Or use your preferred package manager
yarn global add waspcode-ai
pnpm add -g waspcode-ai
bun install -g waspcode-ai
`

### First Run

`ash
waspcode
`

That's it! WaspCode will guide you through initial setup.

---

## 💻 Desktop Application (BETA)

Prefer a GUI? WaspCode is also available as a desktop app:

| Platform | Download |
|----------|----------|
| macOS (Apple Silicon) | waspcode-desktop-darwin-aarch64.dmg |
| macOS (Intel) | waspcode-desktop-darwin-x64.dmg |
| Windows | waspcode-desktop-windows-x64.exe |
| Linux | .deb, .rpm, or AppImage |

**Package Managers:**
`ash
# macOS (Homebrew)
brew install --cask waspcode-desktop

# Windows (Scoop)
scoop bucket add extras
scoop install extras/waspcode-desktop
`

Download from [GitHub Releases](https://github.com/eres45/WaspCode/releases)

---

## 🎮 Key Features

### 🔧 Build Agent
Full-access agent for development work. Can:
- Write and edit code across multiple files
- Run tests and build commands
- Debug issues with full context
- Refactor entire codebases

### 📋 Plan Agent (Read-Only)
Perfect for analysis and exploration. Will:
- Ask permission before any changes
- Explore unfamiliar codebases
- Plan architectural changes
- Review code without modifying

### 🔍 General Subagent
Complex multi-step tasks handled automatically:
- Deep codebase searches
- Cross-file analysis
- Multi-step refactoring operations

Invoke with @general in any message.

---

## ⚙️ Configuration

### Environment Variables

WaspCode respects these environment variables for customization:

| Variable | Description | Default |
|----------|-------------|---------|
| WASPCODE_INSTALL_DIR | Custom installation directory | — |
| WASPCODE_API_KEY | Your AI provider API key | — |
| XDG_BIN_DIR | XDG-compliant binary path | — |

### Installation Path Priority

1. $WASPCODE_INSTALL_DIR — Your custom directory
2. $XDG_BIN_DIR — XDG Base Directory path
3. $HOME/bin — Standard user bin (if exists)
4. $HOME/.waspcode/bin — Default fallback

---

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| waspcode | Start WaspCode in current directory |
| waspcode --version | Show version |
| waspcode --help | Show help |

**In-App Shortcuts:**
- Tab — Switch between Build/Plan agents
- Ctrl+C — Exit
- @general — Invoke general subagent
- @model <name> — Switch AI model

---

## 📖 Documentation

- **[Getting Started](./docs/getting-started.md)** — First steps with WaspCode
- **[Configuration](./docs/configuration.md)** — Advanced setup options
- **[Agents](./docs/agents.md)** — Understanding Build, Plan, and General agents
- **[Models](./docs/models.md)** — Complete model reference
- **[API Reference](./docs/api.md)** — For integrations

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) before submitting PRs.

**Areas we need help with:**
- 🌍 Translations
- 🐛 Bug reports and fixes
- ✨ New features
- 📚 Documentation improvements

---

## 💬 Support & Community

- **GitHub Discussions:** [github.com/eres45/WaspCode/discussions](https://github.com/eres45/WaspCode/discussions)
- **Issues:** [github.com/eres45/WaspCode/issues](https://github.com/eres45/WaspCode/issues)

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

<p align="center">
  <strong>Built with 💜 by developers, for developers</strong>
</p>

<p align="center">
  <a href="https://github.com/eres45/WaspCode">⭐ Star us on GitHub</a> if you find WaspCode useful!
</p>
