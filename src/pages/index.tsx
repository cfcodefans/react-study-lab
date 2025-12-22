import { IPaneProps } from "../layout"
import { lazy } from "react"
import { iterateTree } from "../commons"

export const NAV_NODES: IPaneProps[] = iterateTree(
  [
    {
      value: "basic-1",
      label: "quick start",
      level: 1,
      children: [
        {
          value: "tic-tac-toe",
          label: "Tutorial: Tic-Tac-Toe",
          level: 2,
          pane: lazy(() => import("./tutorial-tic-tac-toe")),
          children: null,
        },
        {
          value: "thinking-in-react",
          label: "Thinking in React",
          level: 2,
          pane: lazy(() => import("./thinking-in-react")),
          children: null,
        },
      ],
    },
    {
      value: "learn-react",
      label: "LEARN REACT",
      level: 1,
      children: [
        {
          value: "describing-the-ui",
          label: "Describing the UI",
          level: 2,
          pane: lazy(() => import("./describing-the-ui")),
          children: null
        },
        {
          value: "adding-interactivity",
          label: "Adding Interactivity",
          level: 2,
          pane: lazy(() => import("./adding-interactivity")),
          children: null
        }
      ],
    }
  ],
  (node: IPaneProps, ancestors: IPaneProps[]) => {
    node.paths = ancestors.map((an) => an.value)
    node.paths.push(node.value)
    console.dir(node)
    return null
  }
) as IPaneProps[]
