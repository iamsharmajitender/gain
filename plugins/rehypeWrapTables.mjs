import {visit} from 'unist-util-visit';

/** Wraps markdown tables in .gain-table-wrap for styled layout and horizontal scroll. */
export default function rehypeWrapTables() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (parent && index != null && node.tagName === 'table') {
        parent.children[index] = {
          type: 'element',
          tagName: 'div',
          properties: {className: ['gain-table-wrap']},
          children: [node],
        };
      }
    });
  };
}
