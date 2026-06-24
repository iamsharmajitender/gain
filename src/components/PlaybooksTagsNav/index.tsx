import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {PLAYBOOK_TAG_GROUP} from '@site/src/data/playbookTags';

function isActive(pathname: string, to: string): boolean {
  return pathname === to || pathname === `${to}/`;
}

export default function PlaybooksTagsNav(): ReactNode {
  const {pathname} = useLocation();
  const {heading, id: groupId, tags} = PLAYBOOK_TAG_GROUP;

  return (
    <div className="gain-insights-tags-nav">
      <div className={clsx('gain-insights-tags-row', `gain-insights-tags-row--${groupId}`)}>
        <span className="gain-insights-tags-row__label">{heading}</span>
        <nav className="gain-insights-tags" aria-label={`Filter playbooks by ${heading.toLowerCase()}`}>
          {tags.map((tag) => (
            <Link
              key={tag.to}
              to={tag.to}
              className={clsx('gain-insights-tags__link', {
                'gain-insights-tags__link--active': isActive(pathname, tag.to),
              })}>
              {tag.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
