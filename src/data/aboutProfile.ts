export type BackgroundEntry = {
  period: string;
  role: string;
  context: string;
  highlights: string[];
};

export type CredentialIssuerKey =
  | 'open-group'
  | 'aws'
  | 'google'
  | 'microsoft'
  | 'databricks'
  | 'linux-foundation'
  | 'hashicorp';

export const credentialIssuerOrder: CredentialIssuerKey[] = [
  'open-group',
  'aws',
  'microsoft',
  'google',
  'databricks',
  'linux-foundation',
  'hashicorp',
];

export const credentialIssuers: Record<
  CredentialIssuerKey,
  {name: string; logo: string}
> = {
  'open-group': {
    name: 'The Open Group',
    logo: '/img/credentials/open-group.png',
  },
  aws: {
    name: 'Amazon Web Services (AWS)',
    logo: '/img/credentials/aws.svg',
  },
  google: {
    name: 'Google',
    logo: '/img/credentials/google.svg',
  },
  microsoft: {
    name: 'Microsoft',
    logo: '/img/credentials/microsoft.svg',
  },
  databricks: {
    name: 'Databricks',
    logo: '/img/credentials/databricks.svg',
  },
  'linux-foundation': {
    name: 'The Linux Foundation',
    logo: '/img/credentials/linux-foundation.svg',
  },
  hashicorp: {
    name: 'HashiCorp',
    logo: '/img/credentials/hashicorp.svg',
  },
};

export type CredentialArea = 'ai' | 'architecture' | 'cloud' | 'platform';

export type CredentialTabId = 'all' | CredentialArea;

export const credentialTabs: {id: CredentialTabId; label: string}[] = [
  {id: 'all', label: 'All'},
  {id: 'ai', label: 'Artificial Intelligence'},
  {id: 'architecture', label: 'Architecture'},
  {id: 'cloud', label: 'Cloud'},
  {id: 'platform', label: 'Platform'},
];

export type CredentialStatus = 'current' | 'historical';

export type Credential = {
  title: string;
  issuerKey: CredentialIssuerKey;
  area: CredentialArea;
  status: CredentialStatus;
  issued?: string;
  expires?: string;
  credentialId?: string;
};

export const cloudIssuerKeys: CredentialIssuerKey[] = [
  'aws',
  'microsoft',
  'google',
  'databricks',
];

export function getCredentialsByTab(
  tab: CredentialTabId,
  status?: CredentialStatus,
): Credential[] {
  return credentials.filter((credential) => {
    if (tab === 'cloud') {
      if (!cloudIssuerKeys.includes(credential.issuerKey)) {
        return false;
      }
    } else if (tab !== 'all' && credential.area !== tab) {
      return false;
    }

    if (status && credential.status !== status) {
      return false;
    }

    return true;
  });
}

export const backgroundEntries: BackgroundEntry[] = [
  {
    period: 'Dec 2020 – Present',
    role: 'Enterprise Architect, Cloud & Application Modernization',
    context: 'National Australia Bank (NAB), Melbourne',
    highlights: [
      'Enterprise-wide cloud and application modernization: secure, scalable, regulator-aligned platforms',
      'Multi-cloud adoption (AWS & Azure), hybrid governance, and integration across mission-critical banking',
      'AI / GenAI adoption strategy with responsible, ethical, and scalable deployment',
      'Architecture review boards, standards, and design authority across delivery streams',
    ],
  },
  {
    period: 'Aug 2019 – Dec 2020',
    role: 'Senior Architect, Software Engineering & Distributed Systems',
    context: 'National Australia Bank (NAB), Melbourne',
    highlights: [
      'Enterprise patterns, libraries, and quickstarts for developer productivity',
      'Led Microservices, API, and Event-driven Centers of Excellence',
      'Distributed systems guidance for critical banking platforms',
    ],
  },
  {
    period: 'Jun 2018 – Aug 2019',
    role: 'Solution Architect / Technical Development Lead',
    context: 'Mondo (AusNet Services), Melbourne',
    highlights: [
      'Event-driven and microservice architecture for mission-critical energy platforms',
      'Legacy-to-hybrid-cloud migration (Azure & on-prem), DevOps and CI/CD adoption',
      'Aligned platform strategy with business outcomes alongside senior stakeholders',
    ],
  },
  {
    period: 'Sep 2017 – May 2018',
    role: 'Software Consultant',
    context: 'Tuned Global, Melbourne',
    highlights: [
      'Platform architecture and AWS-based solutions for enterprise clients',
      'Domain APIs and CI/CD enablement across delivery teams',
    ],
  },
  {
    period: 'May 2015 – Jun 2017',
    role: 'Cloud Solution Architect / Senior Technical Consultant',
    context: 'Emirates Airline (HCL Infosystems MEA), Dubai',
    highlights: [
      'Digital transformation and AWS cloud migration for global aviation platforms',
      'Multi-region, multi-language application design, migration, and architecture governance',
      'Mentored engineering teams and drove adoption of cloud-native best practices',
    ],
  },
  {
    period: '2012 – 2015',
    role: 'Senior Technical Consultant & Solution Architect',
    context: 'Sapient, TASC (Emirates Airline), and retail clients in India & UAE',
    highlights: [
      'Large-scale CMS and enterprise platform delivery across banking and aviation',
      'Multi-location development, migration, and stakeholder alignment',
      'Architecture guidance and mentorship across distributed delivery teams',
    ],
  },
  {
    period: '2008 – 2012',
    role: 'Software Engineer → Senior Software Engineer',
    context: 'Tesco (India & UK) and Sapient Corporation, India',
    highlights: [
      'Core distributed systems, APIs, and enterprise-scale delivery frameworks',
      'CI/CD enablement and technical knowledge sharing from engineering foundations',
    ],
  },
];

export const credentials: Credential[] = [
  {
    title: 'The Open Group Certified: TOGAF® Enterprise Architecture Practitioner',
    issuerKey: 'open-group',
    area: 'architecture',
    status: 'current',
    issued: 'Sep 2025',
    expires: 'Sep 2030',
  },
  {
    title: 'AWS Certified Generative AI Developer – Professional',
    issuerKey: 'aws',
    area: 'ai',
    status: 'current',
    issued: 'May 2026',
    expires: 'May 2029',
  },
  {
    title: 'AWS Certified AI Practitioner',
    issuerKey: 'aws',
    area: 'ai',
    status: 'current',
    issued: 'May 2026',
    expires: 'May 2029',
  },
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issuerKey: 'aws',
    area: 'architecture',
    status: 'current',
    issued: 'Mar 2022',
    expires: 'Mar 2027',
  },
  {
    title: 'AWS Certified SysOps Administrator – Associate',
    issuerKey: 'aws',
    area: 'cloud',
    status: 'historical',
    issued: 'Dec 2017',
  },
  {
    title: 'AWS Certified Developer – Associate',
    issuerKey: 'aws',
    area: 'cloud',
    status: 'historical',
    issued: 'Dec 2017',
  },
  {
    title: 'Microsoft Certified: Azure AI Fundamentals',
    issuerKey: 'microsoft',
    area: 'ai',
    status: 'current',
    issued: 'Oct 2025',
    expires: 'Oct 2027',
  },
  {
    title: 'Microsoft Certified: Azure Solutions Architect Expert',
    issuerKey: 'microsoft',
    area: 'architecture',
    status: 'current',
    issued: 'Dec 2020',
  },
  {
    title: 'AZ-304 Microsoft Azure Architect Design',
    issuerKey: 'microsoft',
    area: 'architecture',
    status: 'current',
    issued: 'Dec 2020',
    expires: 'Dec 2026',
  },
  {
    title: 'AZ-303 Microsoft Azure Architect Technologies',
    issuerKey: 'microsoft',
    area: 'architecture',
    status: 'current',
    issued: 'Dec 2020',
    expires: 'Dec 2026',
  },
  {
    title: 'AZ-204 Microsoft Azure Developer Associate',
    issuerKey: 'microsoft',
    area: 'cloud',
    status: 'historical',
    issued: 'Dec 2020',
  },
  {
    title: 'AZ-104 Microsoft Azure Administrator Associate',
    issuerKey: 'microsoft',
    area: 'cloud',
    status: 'historical',
    issued: 'Nov 2020',
  },
  {
    title: 'AZ-900 Microsoft Azure Fundamentals',
    issuerKey: 'microsoft',
    area: 'cloud',
    status: 'historical',
    issued: 'Mar 2020',
  },
  {
    title: 'Generative AI Leader Certification',
    issuerKey: 'google',
    area: 'ai',
    status: 'current',
    issued: 'Oct 2025',
    expires: 'Oct 2028',
  },
  {
    title: 'Academy Accreditation – AI Agent Fundamentals',
    issuerKey: 'databricks',
    area: 'ai',
    status: 'current',
    issued: 'Oct 2025',
    expires: 'Oct 2026',
  },
  {
    title: 'Academy Accreditation – Generative AI Fundamentals',
    issuerKey: 'databricks',
    area: 'ai',
    status: 'current',
    issued: 'Feb 2025',
    expires: 'Feb 2027',
    credentialId: '133087326',
  },
  {
    title: 'Academy Accreditation – Databricks Fundamentals',
    issuerKey: 'databricks',
    area: 'platform',
    status: 'current',
    issued: 'Feb 2025',
    expires: 'Feb 2026',
    credentialId: '132595570',
  },
  {
    title: 'CKA: Certified Kubernetes Administrator',
    issuerKey: 'linux-foundation',
    area: 'platform',
    status: 'current',
    issued: 'May 2021',
    expires: 'May 2027',
  },
  {
    title: 'CKAD: Certified Kubernetes Application Developer',
    issuerKey: 'linux-foundation',
    area: 'platform',
    status: 'historical',
    issued: 'May 2021',
  },
  {
    title: 'HashiCorp Certified: Terraform Associate',
    issuerKey: 'hashicorp',
    area: 'platform',
    status: 'historical',
    issued: 'Mar 2022',
  },
];

export const linkedInProfileUrl = 'https://linkedin.com/in/iamsharmajitender';

export const profilePhotoUrl = '/img/jitender-sharma-profile.jpg';

export const profileName = 'Jitender Sharma';

export const profileHeroBio =
  'Melbourne-based advisor and technical leader with 18+ years across banking, aviation, and critical infrastructure in Australia, the UAE, and India.';
