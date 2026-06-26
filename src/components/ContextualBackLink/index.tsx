import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import type {ContextualBackLinkConfig} from '@site/src/data/contextualBackLinks';

export default function ContextualBackLink({
  label,
  href,
}: ContextualBackLinkConfig): ReactNode {
  return (
    <Link to={href} className="gain-back-link">
      ← Back to {label}
    </Link>
  );
}
