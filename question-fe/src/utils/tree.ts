/*
 * @Author       : 魏威
 * @Date         : 2024-02-19 17:34
 * @LastEditTime : 2024-02-21 14:26
 * @LastEditors  : Waker
 * @Description  : 树结构工具方法
 */

interface TreeNode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  children?: TreeNode[];
}

function findNode(
  nodeList: TreeNode[],
  fn: (node: TreeNode) => boolean
): TreeNode | null {
  for (const node of nodeList) {
    if (fn(node)) {
      return node;
    }
    if (node.children && node.children.length > 0) {
      const foundNode = findNode(node.children, fn);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return null;
}

/** 给树上每一个节点增加属性 */
function processTree(
  nodeList: TreeNode[],
  processNode: (node: TreeNode) => TreeNode
): TreeNode[] {
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i].children && nodeList[i].children!.length > 0) {
      nodeList[i].children = processTree(nodeList[i].children!, processNode);
    }
    nodeList[i] = processNode(nodeList[i]);
  }
  return nodeList;
}
export const TreeTools = { findNode, processTree };
