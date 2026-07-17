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

        // Column-count classes drive width recipes. Do not apply the 3-col
        // compare recipe to 4+ col tables (it wastes space and forces wrapping).
        if (columnCount === 2) {
          className.push('gain-table-cols-2');
        } else if (columnCount === 3) {
          className.push('gain-table-compare');
        } else if (columnCount === 4) {
          className.push('gain-table-cols-4');
        } else if (columnCount >= 5) {
          className.push('gain-table-cols-wide');
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
