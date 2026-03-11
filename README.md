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

| Terminal Interface | AI Chat | Code Actions | Settings |
|:---:|:---:|:---:|:---:|
| ![Terminal](./packages/opencode/assets/Screenshot%202026-03-12%20002147.png) | ![Chat](./packages/opencode/assets/Screenshot%202026-03-12%20002204.png) | ![Actions](./packages/opencode/assets/Screenshot%202026-03-12%20002224.png) | ![Settings](./packages/opencode/assets/Screenshot%202026-03-12%20002255.png) |

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

WaspCode comes with **15 curated models** under our unified ** Custom Models** provider, optimized for different coding tasks:

### Default Model
**custom/qwen3-coder-plus** — Our recommended default for general coding tasks. Excellent balance of speed, accuracy, and code understanding.

### Available Models

| Model | Best For | Description |
|-------|----------|-------------|
| custom/qwen3-coder-plus | **General Coding** ⚡ Default — Fast, accurate, great for everyday tasks |
| custom/qwen3-coder-next | **Advanced Coding** — Enhanced reasoning for complex algorithms |
| custom/qwen3-max | **Deep Analysis** — Best for architecture decisions and complex refactors |
| custom/qwen3-235b | **Heavy Tasks** — Maximum capability for challenging problems |
| custom/qwen3-32b | **Balanced** — Good performance with reasonable resource usage |
| custom/qwen3-8b | **Fast Responses** — Quick answers for simple queries |
| custom/qwen3-vl-plus | **Vision Tasks** — Code analysis with visual understanding |
| custom/qwen3-vl-235b | **Advanced Vision** — Complex visual code analysis |
| custom/qwen3-omni-30b | **Multimodal** — Text, code, and image understanding |
| custom/qwen3-omni-flash | **Quick Multimodal** — Fast multimodal responses |
| custom/qwen3-asr-flash | **Audio Tasks** — Speech-to-code capabilities |
| custom/qwen3-coder-30b | **Large Code Tasks** — Big codebase analysis |
| custom/qwen3-coder-flash | **Quick Code** — Fast code completions |
| custom/qwen3-next-80b | **Next-Gen** — Latest architecture improvements |
| custom/qwen3.5-plus | **Latest Gen** — Newest model generation |

**API Endpoint:** https://qwen-worker-proxy.ronitshrimankar1.workers.dev/v1

> 💡 **Pro Tip:** Switch models anytime in settings or use the @model command in chat to try different models for different tasks.

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
