import {visit} from 'unist-util-visit';

function textContent(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value;
  if (node.children) {
    return node.children.map(textContent).join('');
  }
  return '';
}

/** Wraps markdown tables in .gain-table-wrap for styled layout and horizontal scroll. */
export default function rehypeWrapTables() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (parent && index != null && node.tagName === 'table') {
        const thead = node.children?.find((c) => c.tagName === 'thead');
        const headerRow =
          thead?.children?.find((c) => c.tagName === 'tr') ??
          node.children?.find((c) => c.tagName === 'tr');
        const headerCells =
          headerRow?.children?.filter(
            (c) => c.tagName === 'th' || c.tagName === 'td',
          ) ?? [];
        const columnCount = headerCells.length;

        const className = ['gain-table-wrap'];
        if (columnCount >= 3) {
          className.push('gain-table-compare');
        }

        const secondHeader = textContent(headerCells[1]).trim().toLowerCase();
        if (
          columnCount === 4 &&
          (secondHeader === 'example value' || secondHeader === 'example')
        ) {
          className.push('gain-table-narrow-col2');
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
