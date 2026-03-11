import { useRoute } from "@tui/context/route"
import { useTheme } from "@tui/context/theme"
import { useExit } from "@tui/context/exit"
import { useKeyboard } from "@opentui/solid"
import { TextAttributes } from "@opentui/core"
import { Logo } from "@tui/component/logo"

// Cute pixel agent face
const AGENT_FACE = `(●w●)`

export function Welcome() {
  const route = useRoute()
  const exit = useExit()
  const { theme } = useTheme()
  const version = "0.0.1"

  useKeyboard((evt) => {
    if (evt.name === "return" || evt.name === "enter") {
      // Navigate to plan selection
      route.navigate({ type: "plan" })
    }
    if (evt.ctrl && evt.name === "c") {
      exit()
    }
  })

  return (
    <>
      {/* Welcome text at top left */}
      <box position="absolute" top={1} left={2} flexDirection="row" alignItems="center">
        <text fg={theme.text} attributes={TextAttributes.BOLD}>
          Welcome to WaspCode v{version}
        </text>
        <text fg={theme.textMuted}>  {AGENT_FACE}</text>
      </box>

      {/* Centered content */}
      <box flexGrow={1} alignItems="center" justifyContent="center" flexDirection="column" paddingLeft={2} paddingRight={2}>
        {/* Logo - same as home screen */}
        <box marginBottom={2}>
          <Logo />
        </box>

        {/* Tagline */}
        <box flexDirection="row" marginBottom={2}>
          <text fg={theme.text} attributes={TextAttributes.BOLD}>WASPCODE</text>
          <text fg={theme.textMuted}> – </text>
          <text fg={theme.text}>Autonomous AI Coding Agent</text>
        </box>

        <box marginBottom={1}>
          <text fg={theme.textMuted}>Build, debug and ship code using AI agents.</text>
        </box>

        {/* Separator */}
        <box marginBottom={2}>
          <text fg={theme.textMuted}>────────────────────────────────────────────</text>
        </box>

        {/* Instructions */}
        <box flexDirection="column" alignItems="center" gap={1}>
          <box>
            <text fg={theme.text} attributes={TextAttributes.BOLD}>Press ENTER to start</text>
          </box>
          <box>
            <text fg={theme.text} attributes={TextAttributes.BOLD}>Press CTRL+C to exit</text>
          </box>
        </box>
      </box>
    </>
  )
}
