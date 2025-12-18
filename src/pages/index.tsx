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
          value: "sub_basic-1",
          label: "Tutorial: Tic-Tac-Toe",
          level: 2,
          pane: lazy(() => import("./tutorial-tic-tac-toe")),
          children: null,
        },
        {
          value: "sub_basic-2",
          label: "Thinking in React",
          level: 2,
          pane: lazy(() => import("./thinking-in-react")),
          children: null,
        },
      ],
    },
  ],
  (node: IPaneProps, ancestors: IPaneProps[]) => {
    node.paths = ancestors.map((an) => an.value)
    node.paths.push(node.value)
    console.dir(node)
    return null
  }
) as IPaneProps[]
