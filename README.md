<div align="center">

<img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="WaspCode Logo" width="180" />

<h1>WaspCode</h1>

<p><strong>Autonomous AI Coding Agent for the Terminal</strong></p>

[![npm version](https://img.shields.io/npm/v/waspcode-ai?style=for-the-badge&color=3178C6&logo=npm&logoColor=white)](https://www.npmjs.com/package/waspcode-ai)
[![build status](https://img.shields.io/github/actions/workflow/status/eres45/WaspCode/publish.yml?style=for-the-badge&color=22C55E&logo=github&logoColor=white)](https://github.com/eres45/WaspCode/actions)
[![license](https://img.shields.io/github/license/eres45/WaspCode?style=for-the-badge&color=A855F7&logo=open-source-initiative&logoColor=white)](./LICENSE)
[![downloads](https://img.shields.io/npm/dm/waspcode-ai?style=for-the-badge&color=F59E0B&logo=npm&logoColor=white)](https://www.npmjs.com/package/waspcode-ai)

<p>
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#-ai-models">AI Models</a> •
  <a href="#-documentation">Docs</a> •
  <a href="#-contributing">Contribute</a>
</p>

</div>

---

## 🎯 Overview

**WaspCode** is a powerful, open-source AI coding agent that lives in your terminal. It combines the intelligence of large language models with deep codebase understanding to help you write, debug, refactor, and ship code faster than ever before.

Think of it as having a senior developer pair programming with you 24/7 — one that never gets tired, knows every file in your project, and can execute changes instantly.

<div align="center">

### 🖼️ Screenshots

**Welcome Screen** — Beautiful ASCII art logo with clear navigation

![Welcome](./packages/opencode/waspcode-assets/Screenshot%202026-03-12%20002147.png)

**AI Chat Interface** — Natural language coding assistance

![Chat](./packages/opencode/waspcode-assets/Screenshot%202026-03-12%20002204.png)

**Code Actions** — Intelligent suggestions and automated refactoring

![Actions](./packages/opencode/waspcode-assets/Screenshot%202026-03-12%20002224.png)

**Settings Panel** — Full customization of models and preferences

![Settings](./packages/opencode/waspcode-assets/Screenshot%202026-03-12%20002255.png)

</div>

---

## 🚀 Vision

### The Future of AI-Assisted Development

WaspCode represents a fundamental shift in how developers interact with AI:

<table>
<tr>
<td width="25%" align="center"><strong>🖥️ Terminal-First</strong></td>
<td>Seamlessly integrated into your existing workflow. No context switching, no browser tabs — just pure productivity in your natural habitat.</td>
</tr>
<tr>
<td width="25%" align="center"><strong>🔓 Provider Agnostic</strong></td>
<td>Zero vendor lock-in. Choose from Claude, OpenAI, Google, or our curated 14-model collection. You stay in control as the AI landscape evolves.</td>
</tr>
<tr>
<td width="25%" align="center"><strong>🧠 Deep Understanding</strong></td>
<td>Built-in LSP support and semantic code analysis. WaspCode doesn't just chat — it <em>understands</em> your codebase like a senior engineer.</td>
</tr>
<tr>
<td width="25%" align="center"><strong>🔧 Open Architecture</strong></td>
<td>100% open source with client/server design. The TUI is just one interface — imagine controlling your agent from a mobile app while it runs on your workstation.</td>
</tr>
</table>

---

## ⚡ Quick Start

### Installation

```bash
# npm (recommended)
npm install -g waspcode-ai

# yarn
yarn global add waspcode-ai

# pnpm
pnpm add -g waspcode-ai

# bun
bun install -g waspcode-ai
```

### Launch

```bash
waspcode
```

That's it. WaspCode automatically guides you through initial setup.

---

## ✨ Features

### Dual-Agent System

<table>
<tr>
<th width="50%">🔧 Build Agent</th>
<th width="50%">📋 Plan Agent (Read-Only)</th>
</tr>
<tr>
<td>

Full-access development companion:
- Write and edit code across multiple files
- Execute tests and build commands
- Debug issues with complete context
- Refactor entire codebases
- Run terminal commands

</td>
<td>

Safe exploration and analysis:
- Ask permission before any changes
- Explore unfamiliar codebases
- Plan architectural decisions
- Review code without modifying
- Perfect for learning new projects

</td>
</tr>
</table>

### 🎯 General Subagent

Complex multi-step tasks handled automatically:
- Deep codebase searches with semantic understanding
- Cross-file analysis and dependencies
- Multi-step refactoring operations

Invoke with `@general` in any conversation.

---

## 🤖 AI Models

WaspCode provides **14 production-grade models** through our unified **Custom Models** provider. No external API keys required — everything works immediately.

### Default: `custom/qwen3-coder-plus`

Our recommended choice for general coding tasks. Features 128K context window, fast responses, and excellent accuracy.

### Model Catalog

#### ⚡ Code-Focused

| Model | Context | Best For |
|-------|---------|----------|
| `custom/qwen3-coder-plus` | 128K | **Default** — General coding, tool calls |
| `custom/qwen3-coder-flash` | 128K | **Speed** — Ultra-fast completions |

#### 🧠 Advanced Reasoning

| Model | Context | Best For |
|-------|---------|----------|
| `custom/claude-opus-4.5` | 200K | **Complex analysis** — Reasoning, vision, tools |
| `custom/claude-sonnet-4.5` | 200K | **Balanced power** — Reasoning with attachments |
| `custom/claude-haiku-4.5` | 200K | **Speed & efficiency** — Fast, capable responses |
| `custom/gpt-5.2` | 128K | **Latest GPT** — Reasoning and vision |
| `custom/kimi-k2-thinking` | 128K | **Deep reasoning** — Chain-of-thought analysis |

#### 📚 Long Context

| Model | Context | Best For |
|-------|---------|----------|
| `custom/kimi-k2-0905` | 256K | **Massive contexts** — MoE architecture |
| `custom/kimi-k2.5` | 128K | **Long documents** — Large codebases |
| `custom/gemini-3-pro` | 2M | **Huge contexts** — Up to 2 million tokens |
| `custom/gemini-3-flash` | 1M | **Fast long context** — 1M with vision |

#### 🔍 Specialized

| Model | Context | Best For |
|-------|---------|----------|
| `custom/sonar-pro` | 128K | **Research** — Reasoning and search |
| `custom/sonar` | 128K | **Quick research** — Fast capabilities |
| `custom/grok-4.1-fast` | 128K | **Real-time** — X integration, fast |

> 💡 **Pro Tip:** Use `@model <name>` in chat to switch models instantly. Try `claude-opus-4.5` for complex refactors, `gemini-3-pro` for huge codebases, or `kimi-k2-thinking` for deep reasoning.

---

## 💻 Desktop Application

Prefer a GUI? WaspCode Desktop is available:

| Platform | Download |
|----------|----------|
| macOS (Apple Silicon) | `waspcode-desktop-darwin-aarch64.dmg` |
| macOS (Intel) | `waspcode-desktop-darwin-x64.dmg` |
| Windows | `waspcode-desktop-windows-x64.exe` |
| Linux | `.deb`, `.rpm`, or AppImage |

**Package Managers:**
```bash
# macOS
brew install --cask waspcode-desktop

# Windows
scoop bucket add extras
scoop install extras/waspcode-desktop
```

[→ Download from GitHub Releases](https://github.com/eres45/WaspCode/releases)

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description |
|----------|-------------|
| `WASPCODE_INSTALL_DIR` | Custom installation directory |
| `WASPCODE_API_KEY` | Your AI provider API key |
| `XDG_BIN_DIR` | XDG-compliant binary path |

### Installation Priority

1. `$WASPCODE_INSTALL_DIR`
2. `$XDG_BIN_DIR`
3. `$HOME/bin`
4. `$HOME/.waspcode/bin` (default)

---

## 📚 Documentation

- **[Getting Started](./docs/getting-started.md)** — First steps and setup
- **[Configuration](./docs/configuration.md)** — Advanced customization
- **[Agents](./docs/agents.md)** — Master Build, Plan, and General agents
- **[Models](./docs/models.md)** — Complete model reference
- **[API Reference](./docs/api.md)** — Integration guide

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md).

**Priority Areas:**
- 🌍 Internationalization
- 🐛 Bug reports and fixes
- ✨ Feature development
- 📚 Documentation

---

## 💬 Support

- [GitHub Discussions](https://github.com/eres45/WaspCode/discussions) — Questions and ideas
- [GitHub Issues](https://github.com/eres45/WaspCode/issues) — Bug reports

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

<div align="center">

**Crafted with 💜 by eres45**

*An open source AI coding agent for the terminal*

[⭐ Star this project](https://github.com/eres45/WaspCode) if you find it useful!

</div>
