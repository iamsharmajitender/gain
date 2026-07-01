import {visit} from 'unist-util-visit';

/** Wraps markdown tables in .gain-table-wrap for styled layout and horizontal scroll. */
export default function rehypeWrapTables() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (parent && index != null && node.tagName === 'table') {
        const thead = node.children?.find((c) => c.tagName === 'thead');
        const headerRow =
          thead?.children?.find((c) => c.tagName === 'tr') ??
          node.children?.find((c) => c.tagName === 'tr');
        const columnCount =
          headerRow?.children?.filter(
            (c) => c.tagName === 'th' || c.tagName === 'td',
          ).length ?? 0;

        const className = ['gain-table-wrap'];
        if (columnCount >= 3) {
          className.push('gain-table-compare');
        }

        parent.children[index] = {
          type: 'element',
          tagName: 'div',
          properties: {className},
          children: [node],
        };
      }
    });
  };
}
