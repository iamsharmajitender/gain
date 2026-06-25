import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {
  credentialIssuerOrder,
  credentialIssuers,
  credentialTabs,
  getCredentialsByTab,
  linkedInProfileUrl,
  type Credential,
  type CredentialTabId,
} from '@site/src/data/aboutProfile';
import styles from './about.module.css';

function sortCredentials(items: Credential[]): Credential[] {
  return [...items].sort((left, right) => {
    const leftIssuer = credentialIssuerOrder.indexOf(left.issuerKey);
    const rightIssuer = credentialIssuerOrder.indexOf(right.issuerKey);

    if (leftIssuer !== rightIssuer) {
      return leftIssuer - rightIssuer;
    }

    return left.title.localeCompare(right.title);
  });
}

function groupCredentialsByIssuer(items: Credential[]): {
  issuerKey: Credential['issuerKey'];
  credentials: Credential[];
}[] {
  const groups: {issuerKey: Credential['issuerKey']; credentials: Credential[]}[] = [];

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

function CredentialCards({tab}: {tab: CredentialTabId}): ReactNode {
  const groups = groupCredentialsByIssuer(getCredentialsByTab(tab));

  if (groups.length === 0) {
    return <p className={styles.credentialEmpty}>No certifications in this category.</p>;
  }

  return (
    <div className={styles.credentialCardGrid}>
      {groups.map((group) => {
        const issuer = credentialIssuers[group.issuerKey];

        return (
          <article key={group.issuerKey} className={styles.credentialCard}>
            <header className={styles.credentialCardHeader}>
              <img
                className={styles.credentialLogo}
                src={issuer.logo}
                alt=""
                width={40}
                height={40}
                loading="lazy"
              />
              <h3 className={styles.credentialCardTitle}>{issuer.name}</h3>
            </header>
            <ul className={styles.credentialCardList}>
              {group.credentials.map((credential) => (
                <li key={credential.title} className={styles.credentialCardItem}>
                  <p className={styles.credentialTitle}>{credential.title}</p>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

export default function CredentialsTab(): ReactNode {
  return (
    <div className={styles.tabBox}>
      <h2 className={styles.tabBoxTitle}>Credentials</h2>
      <Tabs queryString="area" defaultValue="all" className={styles.credentialTabs}>
        {credentialTabs.map((tab) => (
          <TabItem key={tab.id} value={tab.id} label={tab.label}>
            <CredentialCards tab={tab.id} />
          </TabItem>
        ))}
      </Tabs>

      <p className={styles.credentialFootnote}>
        Certifications grouped by issuing organization. Full verification on{' '}
        <Link to={linkedInProfileUrl}>LinkedIn</Link>.
      </p>
    </div>
  );
}
