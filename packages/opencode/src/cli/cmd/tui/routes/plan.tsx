import { useRoute } from "@tui/context/route"
import { useTheme } from "@tui/context/theme"
import { useExit } from "@tui/context/exit"
import { useKeyboard } from "@opentui/solid"
import { TextAttributes } from "@opentui/core"
import { createSignal } from "solid-js"
import { Logo } from "@tui/component/logo"
import { useKV } from "@tui/context/kv"

const plans = [
  {
    id: 1,
    name: "Free",
    price: "$0/month",
    features: ["50 AI requests per day"],
    recommended: false,
  },
  {
    id: 2,
    name: "Basic",
    price: "$10/month",
    features: ["150 AI requests per day", "Faster models"],
    recommended: true,
  },
  {
    id: 3,
    name: "Pro",
    price: "$20/month",
    features: ["300 AI requests per day", "Autonomous coding agents"],
    recommended: false,
  },
]

export function Plan() {
  const route = useRoute()
  const exit = useExit()
  const { theme } = useTheme()
  const kv = useKV()
  const [selected, setSelected] = createSignal<number>(1)

  useKeyboard((evt) => {
    if (evt.name === "up" || (evt.ctrl && evt.name === "p")) {
      setSelected((s) => (s > 1 ? s - 1 : plans.length))
    }
    if (evt.name === "down" || (evt.ctrl && evt.name === "n")) {
      setSelected((s) => (s < plans.length ? s + 1 : 1))
    }
    if (evt.name === "return" || evt.name === "enter") {
      // Save selected plan to KV store
      const plan = plans.find(p => p.id === selected())
      if (plan) {
        kv.set("plan", plan.name)
      }
      // Navigate to home
      route.navigate({ type: "home" })
    }
    if (evt.ctrl && evt.name === "c") {
      exit()
    }
    // Number keys 1-3
    if (evt.name === "1" || evt.name === "2" || evt.name === "3") {
      setSelected(parseInt(evt.name))
    }
  })

  return (
    <>
      {/* Centered content */}
      <box flexGrow={1} alignItems="center" justifyContent="center" flexDirection="column" paddingLeft={2} paddingRight={2}>
        {/* Logo */}
        <box marginBottom={2}>
          <Logo />
        </box>

        {/* Title */}
        <box marginBottom={2}>
          <text fg={theme.text} attributes={TextAttributes.BOLD}>
            Choose your WASPCODE plan
          </text>
        </box>

        {/* Plans */}
        <box flexDirection="column" gap={1} marginBottom={2}>
          {plans.map((plan) => (
            <box flexDirection="column" marginBottom={1}>
              {/* Plan header with number and name */}
              <box flexDirection="row">
                <text fg={selected() === plan.id ? theme.text : theme.textMuted}>
                  {selected() === plan.id ? "► " : "  "}
                </text>
                <text fg={selected() === plan.id ? theme.text : theme.textMuted} attributes={TextAttributes.BOLD}>
                  {plan.id}) {plan.name}
                </text>
                {plan.recommended && (
                  <text fg={theme.info} attributes={TextAttributes.BOLD}>  (Recommended)</text>
                )}
              </box>
              {/* Price */}
              <box flexDirection="row" paddingLeft={4}>
                <text fg={theme.textMuted}>{plan.price}</text>
              </box>
              {/* Features */}
              {plan.features.map((feature) => (
                <box flexDirection="row" paddingLeft={4}>
                  <text fg={theme.textMuted}>  {feature}</text>
                </box>
              ))}
            </box>
          ))}
        </box>

        {/* Quota reset info */}
        <box marginBottom={2}>
          <text fg={theme.textMuted}>Requests reset every 24 hours</text>
        </box>

        {/* Instructions */}
        <box flexDirection="column" alignItems="center" gap={1}>
          <box>
            <text fg={theme.textMuted}>
              Use ↑/↓ or 1-3 to select, ENTER to confirm
            </text>
          </box>
          <box>
            <text fg={theme.textMuted}>
              Press CTRL+C to exit
            </text>
          </box>
        </box>
      </box>
    </>
  )
}
