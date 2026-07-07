import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {
  credentialIssuerOrder,
  credentialIssuers,
  credentialTabs,
  credentials,
  getCredentialsByTab,
  linkedInProfileUrl,
  type Credential,
  type CredentialArea,
  type CredentialIssuerKey,
  type CredentialTabId,
} from '@site/src/data/aboutProfile';
import styles from './credentials.module.css';

const areaLabels: Record<CredentialArea, string> = {
  ai: 'AI',
  architecture: 'Architecture',
  cloud: 'Cloud',
  platform: 'Platform',
};

function sortCredentials(items: Credential[]): Credential[] {
  return [...items].sort((left, right) => {
    if (left.status !== right.status) {
      return left.status === 'current' ? -1 : 1;
    }

    const leftIssuer = credentialIssuerOrder.indexOf(left.issuerKey);
    const rightIssuer = credentialIssuerOrder.indexOf(right.issuerKey);

    if (leftIssuer !== rightIssuer) {
      return leftIssuer - rightIssuer;
    }

    return left.title.localeCompare(right.title);
  });
}

function groupCredentialsByIssuer(items: Credential[]): {
  issuerKey: CredentialIssuerKey;
  credentials: Credential[];
}[] {
  const groups: {issuerKey: CredentialIssuerKey; credentials: Credential[]}[] = [];

  for (const credential of sortCredentials(items)) {
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.issuerKey === credential.issuerKey) {
      lastGroup.credentials.push(credential);
      continue;
    }

    groups.push({issuerKey: credential.issuerKey, credentials: [credential]});
  }

  return groups;
}

function formatCredentialDates(credential: Credential): string | null {
  if (!credential.issued && !credential.expires) {
    return null;
  }

  if (credential.issued && credential.expires) {
    return `Issued ${credential.issued} · Expires ${credential.expires}`;
  }

  if (credential.issued) {
    return `Issued ${credential.issued}`;
  }

  return `Expires ${credential.expires}`;
}

function CredentialSummary({tab}: {tab: CredentialTabId}): ReactNode {
  const items = getCredentialsByTab(tab);
  const currentCount = items.filter((item) => item.status === 'current').length;
  const issuerCount = new Set(items.map((item) => item.issuerKey)).size;

  return (
    <div className={styles.summary}>
      <div className={styles.summaryStat}>
        <span className={styles.summaryValue}>{items.length}</span>
        <span className={styles.summaryLabel}>Certifications</span>
      </div>
      <div className={styles.summaryStat}>
        <span className={styles.summaryValue}>{currentCount}</span>
        <span className={styles.summaryLabel}>Current</span>
      </div>
      <div className={styles.summaryStat}>
        <span className={styles.summaryValue}>{issuerCount}</span>
        <span className={styles.summaryLabel}>Issuers</span>
      </div>
    </div>
  );
}

function CredentialRow({credential}: {credential: Credential}): ReactNode {
  const dates = formatCredentialDates(credential);

  return (
    <li
      className={clsx(
        styles.credentialRow,
        credential.status === 'historical' && styles.credentialRowHistorical,
      )}
    >
      <div className={styles.credentialRowMain}>
        <p className={styles.credentialTitle}>{credential.title}</p>
        <div className={styles.credentialMeta}>
          <span
            className={clsx(
              styles.statusBadge,
              credential.status === 'current'
                ? styles.statusCurrent
                : styles.statusHistorical,
            )}
          >
            {credential.status === 'current' ? 'Current' : 'Historical'}
          </span>
          <span className={clsx(styles.areaBadge, styles[`area_${credential.area}`])}>
            {areaLabels[credential.area]}
          </span>
          {dates ? <span className={styles.credentialDates}>{dates}</span> : null}
          {credential.credentialId ? (
            <span className={styles.credentialId}>ID {credential.credentialId}</span>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function CredentialCards({tab}: {tab: CredentialTabId}): ReactNode {
  const groups = groupCredentialsByIssuer(getCredentialsByTab(tab));

  if (groups.length === 0) {
    return <p className={styles.empty}>No certifications in this category.</p>;
  }

  return (
    <div className={styles.grid}>
      {groups.map((group) => {
        const issuer = credentialIssuers[group.issuerKey];
        const currentInGroup = group.credentials.filter(
          (credential) => credential.status === 'current',
        ).length;

        return (
          <article
            key={group.issuerKey}
            className={clsx(styles.issuerCard, styles[`issuer_${group.issuerKey}`])}
          >
            <header className={styles.issuerHeader}>
              <div className={styles.issuerBrand}>
                <img
                  className={styles.issuerLogo}
                  src={issuer.logo}
                  alt=""
                  width={44}
                  height={44}
                  loading="lazy"
                />
                <div>
                  <h3 className={styles.issuerName}>{issuer.name}</h3>
                  <p className={styles.issuerCount}>
                    {group.credentials.length} certification
                    {group.credentials.length === 1 ? '' : 's'}
                    {currentInGroup > 0 ? ` · ${currentInGroup} current` : ''}
                  </p>
                </div>
              </div>
            </header>
            <ul className={styles.credentialList}>
              {group.credentials.map((credential) => (
                <CredentialRow key={credential.title} credential={credential} />
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

export default function CredentialsTab(): ReactNode {
  const totalCurrent = credentials.filter((credential) => credential.status === 'current').length;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Credentials</h2>
        <p className={styles.lead}>
          {totalCurrent} current certifications across enterprise architecture, cloud, platform
          engineering, and AI. Grouped by issuing organization.
        </p>
      </div>

      <Tabs queryString="area" defaultValue="all" className={styles.filterTabs}>
        {credentialTabs.map((tab) => (
          <TabItem key={tab.id} value={tab.id} label={tab.label}>
            <CredentialSummary tab={tab.id} />
            <CredentialCards tab={tab.id} />
          </TabItem>
        ))}
      </Tabs>

      <p className={styles.footnote}>
        Full verification available on{' '}
        <Link to={linkedInProfileUrl}>LinkedIn</Link>.
      </p>
    </div>
  );
}
