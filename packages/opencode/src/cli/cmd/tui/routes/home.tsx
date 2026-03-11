import { Prompt, type PromptRef } from "@tui/component/prompt"
import { createEffect, createMemo, Match, on, onMount, Show, Switch, For } from "solid-js"
import { useTheme } from "@tui/context/theme"
import { useKeybind } from "@tui/context/keybind"
import { Tips } from "../component/tips"
import { Locale } from "@/util/locale"
import { useSync } from "../context/sync"
import { Toast } from "../ui/toast"
import { useArgs } from "../context/args"
import { useDirectory } from "../context/directory"
import { useRouteData } from "@tui/context/route"
import { usePromptRef } from "../context/prompt"
import { Installation } from "@/installation"
import { useKV } from "../context/kv"
import { useCommandDialog } from "../component/dialog-command"
import { useLocal } from "../context/local"
import { TextAttributes } from "@opentui/core"

// TODO: what is the best way to do this?
let once = false

// Bunny ASCII art
const BUNNY_ART = [
  "  (\\_/)",
  " ( •_•)",
  " / >🍪",
]

// Compact welcome message
const WELCOME_MESSAGE = [
  "🐰 WASPCODE",
  "",
  "Hi! I'm your AI coding assistant.",
  "",
  "I can help you:",
  "• debug code",
  "• generate features",
  "• refactor projects",
  "• explain codebases",
  "",
  "Type /help to see commands.",
]

// Quick commands
const QUICK_COMMANDS = [
  { cmd: "/agents", desc: "manage coding agents" },
  { cmd: "/models", desc: "switch AI models" },
  { cmd: "/run", desc: "execute terminal commands" },
  { cmd: "/plan", desc: "create coding plan" },
  { cmd: "/help", desc: "show all commands" },
]

export function Home() {
  const sync = useSync()
  const kv = useKV()
  const { theme } = useTheme()
  const route = useRouteData("home")
  const promptRef = usePromptRef()
  const command = useCommandDialog()
  const mcp = createMemo(() => Object.keys(sync.data.mcp).length > 0)
  const mcpError = createMemo(() => {
    return Object.values(sync.data.mcp).some((x) => x.status === "failed")
  })

  const connectedMcpCount = createMemo(() => {
    return Object.values(sync.data.mcp).filter((x) => x.status === "connected").length
  })

  const isFirstTimeUser = createMemo(() => sync.data.session.length === 0)
  const tipsHidden = createMemo(() => kv.get("tips_hidden", false))
  const showTips = createMemo(() => {
    // Don't show tips for first-time users
    if (isFirstTimeUser()) return false
    return !tipsHidden()
  })

  command.register(() => [
    {
      title: tipsHidden() ? "Show tips" : "Hide tips",
      value: "tips.toggle",
      keybind: "tips_toggle",
      category: "System",
      onSelect: (dialog) => {
        kv.set("tips_hidden", !tipsHidden())
        dialog.clear()
      },
    },
  ])

  const Hint = (
    <Show when={connectedMcpCount() > 0}>
      <box flexShrink={0} flexDirection="row" gap={1}>
        <text fg={theme.text}>
          <Switch>
            <Match when={mcpError()}>
              <span style={{ fg: theme.error }}>•</span> mcp errors{" "}
              <span style={{ fg: theme.textMuted }}>ctrl+x s</span>
            </Match>
            <Match when={true}>
              <span style={{ fg: theme.success }}>•</span>{" "}
              {Locale.pluralize(connectedMcpCount(), "{} mcp server", "{} mcp servers")}
            </Match>
          </Switch>
        </text>
      </box>
    </Show>
  )

  let prompt: PromptRef
  const args = useArgs()
  const local = useLocal()
  onMount(() => {
    if (once) return
    if (route.initialPrompt) {
      prompt.set(route.initialPrompt)
      once = true
    } else if (args.prompt) {
      prompt.set({ input: args.prompt, parts: [] })
      once = true
    }
  })

  // Wait for sync and model store to be ready before auto-submitting --prompt
  createEffect(
    on(
      () => sync.ready && local.model.ready,
      (ready) => {
        if (!ready) return
        if (!args.prompt) return
        if (prompt.current?.input !== args.prompt) return
        prompt.submit()
      },
    ),
  )
  const directory = useDirectory()

  const keybind = useKeybind()

  // Get current model info
  const currentModel = createMemo(() => {
    const model = local.model.current()
    if (!model) return "Not selected"
    return model.modelID
  })

  // Get current agent info
  const currentAgent = createMemo(() => {
    const agent = local.agent.current()
    if (!agent) return "Builder"
    return agent.name
  })

  // Get plan from KV store
  const currentPlan = createMemo(() => {
    return kv.get("plan", "Free")
  })

  // Get recent sessions for activity panel
  const recentSessions = createMemo(() => {
    return sync.data.session.slice(0, 3)
  })

  // Format time ago
  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return "just now"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <box flexDirection="column" paddingLeft={2} paddingRight={2} paddingTop={1} paddingBottom={1}>
      {/* Header with separators */}
      <box flexDirection="row" alignItems="center" marginBottom={1}>
        <text fg={theme.textMuted}>──────────── </text>
        <text fg={theme.text} attributes={TextAttributes.BOLD}>WASPCODE</text>
        <text fg={theme.textMuted}> v0.0.1 ────────────</text>
      </box>

      {/* Status bar - two rows */}
      <box flexDirection="row" marginBottom={1}>
        <box flexDirection="row">
          <text fg={theme.textMuted}>Workspace: </text>
          <text fg={theme.text}>{directory()}</text>
        </box>
      </box>
      <box flexDirection="row" gap={4} marginBottom={1}>
        <box flexDirection="row">
          <text fg={theme.textMuted}>Agent: </text>
          <text fg={theme.text}>{currentAgent()}</text>
        </box>
        <box flexDirection="row">
          <text fg={theme.textMuted}>Model: </text>
          <text fg={theme.text}>{currentModel()}</text>
        </box>
        <box flexDirection="row">
          <text fg={theme.textMuted}>Plan: </text>
          <text fg={theme.text}>{currentPlan()}</text>
        </box>
        <box flexDirection="row">
          <text fg={theme.textMuted}>Status: </text>
          <text fg={theme.success}>Ready</text>
        </box>
      </box>

      {/* Two-column layout */}
      <box flexDirection="row" gap={2} marginBottom={1}>
        {/* Welcome Panel */}
        <box flexDirection="column" borderStyle="single" borderColor={theme.textMuted} padding={1}>
          <text fg={theme.text} attributes={TextAttributes.BOLD}>Welcome</text>
          <box height={1} />
          <For each={BUNNY_ART}>
            {(line) => <text fg={theme.textMuted}>{line}</text>}
          </For>
          <box height={1} />
          <text fg={theme.text}>Your AI coding assistant</text>
          <text fg={theme.text}>is ready to help.</text>
        </box>

        {/* Recent Activity Panel */}
        <box flexDirection="column" borderStyle="single" borderColor={theme.textMuted} padding={1}>
          <text fg={theme.text} attributes={TextAttributes.BOLD}>Recent Activity</text>
          <box height={1} />
          <Show when={recentSessions().length > 0} fallback={
            <text fg={theme.textMuted}>No recent activity</text>
          }>
            <For each={recentSessions()}>
              {(session) => (
                <box flexDirection="row">
                  <text fg={theme.textMuted}>{timeAgo(session.time.created)}  </text>
                  <text fg={theme.text}>{session.title || "Untitled session"}</text>
                </box>
              )}
            </For>
          </Show>
          <box height={1} />
          <text fg={theme.textMuted}>Use /resume to see more</text>
        </box>
      </box>

      {/* Quick Commands Panel */}
      <box flexDirection="column" borderStyle="single" borderColor={theme.textMuted} padding={1} marginBottom={1}>
        <text fg={theme.text} attributes={TextAttributes.BOLD}>Quick Commands</text>
        <box height={1} />
        <For each={QUICK_COMMANDS}>
          {(cmd) => (
            <box flexDirection="row">
              <text fg={theme.info}>{cmd.cmd}</text>
              <text fg={theme.textMuted}>        {cmd.desc}</text>
            </box>
          )}
        </For>
      </box>

      {/* Prompt */}
      <box width="100%" zIndex={1000}>
        <Prompt
          ref={(r) => {
            prompt = r
            promptRef.set(r)
          }}
          hint={Hint}
          workspaceID={route.workspaceID}
        />
      </box>

      {/* Toast notifications */}
      <Toast />
    </box>
  )
}
