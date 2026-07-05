/** Escape characters that are invalid in XML attribute values. */
function escapeXmlAttr(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

/** @type {import('@docusaurus/plugin-content-blog').CreateFeedItemsFn} */
export default async function createFeedItems(params) {
  const {defaultCreateFeedItems, ...rest} = params;
  const items = await defaultCreateFeedItems(rest);

  return items.map((item) => ({
    ...item,
    content: item.description,
    category: item.category?.map((cat) => ({
      ...cat,
      name: escapeXmlAttr(cat.name),
      term: escapeXmlAttr(cat.term ?? cat.name),
    })),
  }));
}
