export {
  DOMAIN_TAG_IDS,
  DOMAIN_TAG_LABELS,
  DOMAIN_TAG_SHORT_LABELS,
  findDomainTag,
  getDepthDomainTagGroup,
  type DomainTagId,
  type DepthAssetBasePath,
} from '@site/src/data/depthDomainTags';

import {getDepthDomainTagGroup} from '@site/src/data/depthDomainTags';

/** @deprecated Use getDepthDomainTagGroup('/playbooks') */
export const PLAYBOOK_TAG_GROUP = getDepthDomainTagGroup('/playbooks');
