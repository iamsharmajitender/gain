import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {
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

const monthIndex: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

/** Parse "Aug 2026" style dates; missing/invalid sorts last. */
function issuedTimestamp(issued: string | undefined): number {
  if (!issued) {
    return Number.NEGATIVE_INFINITY;
  }

  const [monthLabel, yearLabel] = issued.split(' ');
  const month = monthIndex[monthLabel];
  const year = Number(yearLabel);

  if (month === undefined || !Number.isFinite(year)) {
    return Number.NEGATIVE_INFINITY;
  }

  return Date.UTC(year, month, 1);
}

function compareByLatestIssued(left: Credential, right: Credential): number {
  if (left.status !== right.status) {
    return left.status === 'current' ? -1 : 1;
  }

  const issuedDiff = issuedTimestamp(right.issued) - issuedTimestamp(left.issued);

  if (issuedDiff !== 0) {
    return issuedDiff;
  }

  return left.title.localeCompare(right.title);
}

function sortCredentials(items: Credential[]): Credential[] {
  return [...items].sort(compareByLatestIssued);
}

function groupCredentialsByIssuer(items: Credential[]): {
  issuerKey: CredentialIssuerKey;
  credentials: Credential[];
}[] {
  const byIssuer = new Map<CredentialIssuerKey, Credential[]>();

  for (const credential of items) {
    const existing = byIssuer.get(credential.issuerKey);

    if (existing) {
      existing.push(credential);
    } else {
      byIssuer.set(credential.issuerKey, [credential]);
    }
  }

  return [...byIssuer.entries()]
    .map(([issuerKey, issuerCredentials]) => ({
      issuerKey,
      credentials: sortCredentials(issuerCredentials),
    }))
    .sort((left, right) => {
      const leftNewest = Math.max(
        ...left.credentials.map((credential) => issuedTimestamp(credential.issued)),
      );
      const rightNewest = Math.max(
        ...right.credentials.map((credential) => issuedTimestamp(credential.issued)),
      );

      if (rightNewest !== leftNewest) {
        return rightNewest - leftNewest;
      }

      return left.issuerKey.localeCompare(right.issuerKey);
    });
}

function formatCredentialDates(credential: Credential): string | null {
  if (!credential.issued && !credential.expires) {
    return null;
  }

  if (credential.issued && credential.expires) {
    return `${credential.issued} – ${credential.expires}`;
  }

  if (credential.issued) {
    return credential.issued;
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
  const metaParts = [
    areaLabels[credential.area],
    dates,
    credential.credentialId ? `ID ${credential.credentialId}` : null,
  ].filter(Boolean);

  return (
    <li
      className={clsx(
        styles.credentialRow,
        credential.status === 'current'
          ? styles.credentialRowCurrent
          : styles.credentialRowHistorical,
      )}
    >
      <div className={styles.credentialRowMain}>
        <div className={styles.credentialTitleRow}>
          <p className={styles.credentialTitle}>{credential.title}</p>
          {credential.status === 'historical' ? (
            <span className={clsx(styles.statusBadge, styles.statusHistorical)}>
              Historical
            </span>
          ) : null}
        </div>
        {metaParts.length > 0 ? (
          <p className={styles.credentialMeta}>{metaParts.join(' · ')}</p>
        ) : null}
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
                  width={32}
                  height={32}
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
