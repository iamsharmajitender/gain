import type {ReactNode} from 'react';
import DomainPage from '@site/src/components/DomainPage';
import {domainPages} from '@site/src/data/domainPages';

export default function PlatformsEngineering(): ReactNode {
  return <DomainPage config={domainPages['platforms-engineering']} />;
}
