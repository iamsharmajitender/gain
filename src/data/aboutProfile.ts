export type BackgroundTimelineMeta = {
  yearStart: number;
  yearEnd: number | null;
  org: string;
  tier: 'engineering' | 'senior' | 'architect' | 'enterprise';
};

export type BackgroundEntry = {
  period: string;
  role: string;
  context: string;
  highlights: string[];
  timeline: BackgroundTimelineMeta;
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

export const careerHighlights: string[] = [
  'Led cloud-aligned modernization across 2,000+ enterprise applications',
  'Created multi-cloud governance framework aligned with APRA (CPS 232/230)',
  'Built enterprise Microservices and API working groups; practice-level savings ~AUD 10M annually',
  'Designed Mortgage Factory: unconditional approval turnaround from days to ~1 hour',
  'Re-architected CCOM notification platform to 700-1,000 TPS with priority-lane design',
  'Led white-label enterprise data platform uplift (100+ inputs/outputs, multi-cloud)',
  'Led replatform of Emirates.com in 2015 to AWS cloud and container technology: first in the GCC region',
  'Mentored 20+ engineers and architects through GROW, Star Camp, and hands-on programs',
];

export const backgroundEntries: BackgroundEntry[] = [
  {
    period: 'Dec 2020 – Present',
    role: 'Enterprise Architect, Cloud & Application Modernization',
    context: 'National Australia Bank (NAB), Melbourne',
    timeline: {yearStart: 2020, yearEnd: null, org: 'NAB', tier: 'enterprise'},
    highlights: [
      'Directed hybrid and multi-cloud architecture governance across core banking, digital channels, payments, and enterprise data services',
      'Partnered with business, risk, compliance, and security to align target architectures to operational resilience and regulatory expectations',
      'Established architecture review board and design authority operating model across portfolios',
      'Defined enterprise-wide standards for cloud, API, event-driven, and microservices architecture',
      'Led AI and GenAI architecture enablement with reusable enterprise patterns for responsible, scalable adoption',
    ],
  },
  {
    period: 'Aug 2019 – Dec 2020',
    role: 'Senior Architect, Software Engineering & Distributed Systems',
    context: 'National Australia Bank (NAB), Melbourne',
    timeline: {yearStart: 2019, yearEnd: 2020, org: 'NAB', tier: 'architect'},
    highlights: [
      'Defined enterprise engineering patterns and 10+ reusable libraries and quickstarts, saving approximately AUD 100K per implementation',
      'Led API, microservices, and event-driven architecture communities of practice',
      'Provided distributed systems architecture leadership for critical banking services and modernization programs',
    ],
  },
  {
    period: 'Jun 2018 – Aug 2019',
    role: 'Solution Architect / Technical Development Lead',
    context: 'Mondo (AusNet Services), Melbourne',
    timeline: {yearStart: 2018, yearEnd: 2019, org: 'AusNet', tier: 'architect'},
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
    timeline: {yearStart: 2017, yearEnd: 2018, org: 'Tuned', tier: 'senior'},
    highlights: [
      'Platform architecture and AWS-based solutions for enterprise clients',
      'Domain APIs and CI/CD enablement across delivery teams',
    ],
  },
  {
    period: 'May 2015 – Jun 2017',
    role: 'Senior Technical Consultant / Architect / Tech Lead',
    context: 'HCL Infosystems MEA (Emirates Airline), Dubai',
    timeline: {yearStart: 2015, yearEnd: 2017, org: 'HCL', tier: 'architect'},
    highlights: [
      'Led digital transformation and cloud migration initiatives for Emirates Airline',
      'Developed AWS cloud roadmap and architecture governance frameworks',
      'Oversaw multi-location, multi-language application design, migration, and delivery',
      'Mentored engineering teams and drove adoption of best practices',
    ],
  },
  {
    period: 'Feb 2014 – May 2015',
    role: 'Senior Technical Consultant',
    context: 'Sapient Consulting Services, Gurgaon, India',
    timeline: {yearStart: 2014, yearEnd: 2015, org: 'Sapient', tier: 'senior'},
    highlights: [
      'Delivered digital transformation programs across banking and retail clients',
      'Managed multi-location development and migration initiatives',
      'Engaged with stakeholders for architecture, design, and delivery alignment',
    ],
  },
  {
    period: 'Dec 2012 – Feb 2014',
    role: 'Senior Technical Consultant',
    context: 'TASC Outsourcing (Emirates Airline), Dubai',
    timeline: {yearStart: 2012, yearEnd: 2014, org: 'TASC', tier: 'senior'},
    highlights: [
      'Led application design, development, and delivery across multi-location teams',
      'Enabled developer adoption of standardized patterns and frameworks',
    ],
  },
  {
    period: 'Nov 2010 – Dec 2012',
    role: 'Senior Software Engineer',
    context: 'Sapient Corporation, Gurgaon, India',
    timeline: {yearStart: 2010, yearEnd: 2012, org: 'Sapient', tier: 'senior'},
    highlights: [
      'Developed enterprise-scale software solutions, contributing to architecture and delivery frameworks',
    ],
  },
  {
    period: 'Apr 2008 – Nov 2010',
    role: 'Software Developer',
    context: 'Tesco, Bangalore, India',
    timeline: {yearStart: 2008, yearEnd: 2010, org: 'Tesco', tier: 'engineering'},
    highlights: [
      'Designed and delivered core application features in distributed systems',
      'Participated in CI/CD enablement and technical knowledge sharing initiatives',
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
  'Principal-level enterprise architect and technical leader with 18+ years delivering transformation across banking, aviation, and critical infrastructure in Australia, the UAE, and India. Focused on cloud modernization, operational resilience, and regulator-aligned AI adoption.';

export const profileCardBio =
  'Principal-level enterprise architect with 18+ years across banking, aviation, and critical infrastructure in Australia, the UAE, and India. Focused on cloud modernization, operational resilience, and regulator-aligned AI adoption.';
