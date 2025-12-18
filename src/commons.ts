import _ from "lodash"

export type TTraverser<N extends INode<N>> = (node: N) => N[]
export interface IComparable {
  comparedTo?(another: IComparable): number
}

export declare type TComparable = number | string | Date | IComparable
export interface INode<T extends INode<T>> {
  value: TComparable
  children: T[] | null
}

export function Compare(a: TComparable, b: TComparable): number {
  if (_.isNumber(a) && _.isNumber(b)) return a - b
  if (_.isString(a) && _.isString(b)) return (a as string).localeCompare(b)
  if (_.isDate(a) && _.isDate(b))
    return (a as Date).getTime() - (b as Date).getTime()
  if (!_.isNil(a) && !_.isNil(b))
    return (a as IComparable).comparedTo(b as IComparable)
  return NaN
}

export function deepTraverse<N extends INode<N>>(nodes: N[], traverser?: TTraverser<N>): N[] {
  const nodeStack: N[] = [...nodes.reverse()]
  const result: N[] = []

  while (nodeStack.length > 0) {
    let node: N = nodeStack.pop()
    result.push(node)
    let subNodes: N[] = ((traverser ? traverser(node) : node.children) ||
      node.children ||
      []) as N[]
    nodeStack.push(...subNodes.reverse())
  }

  return result
}
export type TreeVisitor_a<N extends INode<N>> = (node: N, ancestors: N[]) => Promise<N[]>

export async function iterateTree_a<ITNode extends INode<ITNode>>(roots: ITNode[], visitor: TreeVisitor_a<ITNode>): Promise<ITNode[]> {
  let nodeStack: ITNode[] = [...roots]
  let ancestors: ITNode[] = []

  while (nodeStack.length > 0) {
    let currentNode: ITNode = nodeStack.pop()

    for (
      let parent: ITNode = _.last(ancestors);
      // parent && _.findIndex(parent.children, currentNode) < 0
      parent &&
      parent.children &&
      parent.children.findIndex(
        (c) => Compare(c.value, currentNode.value) == 0
      ) < 0;
      parent = _.last(ancestors)
    ) {
      ancestors.pop()
    }

    currentNode.children =
      (visitor && (await visitor(currentNode, ancestors))) ||
      currentNode.children

    if (!_.isEmpty(currentNode.children)) {
      for (
        let parent: ITNode = _.last(ancestors);
        // parent && _.findIndex(parent.children, currentNode) < 0
        parent &&
        parent.children &&
        parent.children.findIndex(
          (c) => Compare(c.value, currentNode.value) == 0
        ) < 0;
        parent = _.last(ancestors)
      ) {
        ancestors.pop()
      }
      ancestors.push(currentNode)
      nodeStack.push(...currentNode.children)
    }
  }

  return Promise.resolve(roots)
}

export type TreeVisitor<ITNode extends INode<ITNode>> = (node: ITNode, ancestors: ITNode[]) => ITNode[]
export function iterateTree<ITNode extends INode<ITNode>>(roots: ITNode[], visitor: TreeVisitor<ITNode>): ITNode[] {
  let nodeStack: ITNode[] = [...roots]
  let ancestors: ITNode[] = []

  while (nodeStack.length > 0) {
    let currentNode: ITNode = nodeStack.pop()

    for (
      let parent: ITNode = _.last(ancestors);
      // parent && _.findIndex(parent.children, currentNode) < 0
      parent &&
      parent.children &&
      parent.children.findIndex((c) => Compare(c.value, currentNode.value) == 0) < 0;
      parent = _.last(ancestors)
    ) {
      ancestors.pop()
    }

    currentNode.children =
      (visitor && visitor(currentNode, ancestors)) || currentNode.children

    if (!_.isEmpty(currentNode.children)) {
      for (
        let parent: ITNode = _.last(ancestors);
        // parent && _.findIndex(parent.children, currentNode) < 0
        parent &&
        parent.children &&
        parent.children.findIndex((c) => Compare(c.value, currentNode.value) == 0) < 0;
        parent = _.last(ancestors)
      ) {
        ancestors.pop()
      }
      ancestors.push(currentNode)
      nodeStack.push(...currentNode.children)
    }
  }

  return roots
}
