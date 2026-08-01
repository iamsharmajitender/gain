export type AdvisoryService = {
  icon: string;
  title: string;
  description: string;
};

export type CaseStudyDomain =
  | 'banking'
  | 'regulatory'
  | 'platform'
  | 'data'
  | 'aviation';

export type AdvisoryCaseStudy = {
  title: string;
  outcome: string;
  domain: CaseStudyDomain;
};

export type AdvisoryEngagementModel = {
  title: string;
  description: string;
};

export const servicesLead =
  'I advise CIOs, CTOs, and transformation leaders when architecture decisions must hold up in production, under regulatory scrutiny, and at enterprise scale.';

export const servicesWhenToEngage =
  'Engage when modernization is stalled, design authority is unclear, or GenAI needs a path that risk and security will accept.';

export const servicesProofOutcomes: string[] = [
  'Cloud-aligned modernization across 2,000+ enterprise applications',
  'Multi-cloud governance aligned with APRA (CPS 232/230)',
  'Emirates.com replatform to AWS: first in the GCC',
];

export const advisoryServices: AdvisoryService[] = [
  {
    icon: '☁',
    title: 'Cloud & platform modernization',
    description:
      'When portfolio modernization stalls under risk and delivery pressure, I set the target architecture and operating model so programs can move across hybrid and multi-cloud.',
  },
  {
    icon: '⬡',
    title: 'Architecture governance & design authority',
    description:
      'I establish review boards, standards, and decision rights so delivery portfolios stay aligned to resilience and regulatory expectations, without slowing the work that matters.',
  },
  {
    icon: '◎',
    title: 'Governed AI & GenAI adoption',
    description:
      'I help leadership adopt production AI with clear readiness, patterns, and governance, so agents and RAG sit on foundations the enterprise can trust.',
  },
  {
    icon: '▦',
    title: 'System design for scale & resilience',
    description:
      'End-to-end distributed-system design for capacity, failure modes, and operability, including APIs, microservices, and event-driven platforms where they earn their place.',
  },
];

export const approachIntro =
  'I work from first principles: understanding the business problem, constraints, and success criteria before defining architecture. Every engagement balances speed with governance, especially where risk, compliance, and security are in the room from day one.';

export const approachPrinciples: string[] = [
  'Start with the problem, not the technology',
  'Design for evolution, not just delivery',
  'Embed observability and governance from day one',
  'Partner with risk, compliance, and security stakeholders to align architecture to operational resilience and regulatory expectations',
  'Enable teams through clarity, patterns, and standards',
  'Build in public: share patterns and lessons that accelerate outcomes',
];

export const caseStudiesIntro =
  'Representative outcomes from enterprise architecture engagements across banking, aviation, and critical infrastructure.';

export const advisoryCaseStudies: AdvisoryCaseStudy[] = [
  {
    title: 'Enterprise Cloud Modernization',
    outcome: 'Led cloud-aligned modernization across 2,000+ enterprise applications',
    domain: 'banking',
  },
  {
    title: 'Multi-cloud Governance',
    outcome:
      'Created multi-cloud governance framework aligned with APRA(CPS 232/230)',
    domain: 'regulatory',
  },
  {
    title: 'AI-Assisted Regulatory Document Review',
    outcome:
      'Designed & architected AI-assisted review engine for the full regulatory document estate',
    domain: 'regulatory',
  },
  {
    title: 'API & Microservices Practice',
    outcome:
      'Built enterprise Microservices and API working groups; practice-level savings ~AUD 10M annually',
    domain: 'platform',
  },
  {
    title: 'Mortgage Factory',
    outcome: 'Designed automated home loan workflow: unconditional approval from days to ~1 hour',
    domain: 'banking',
  },
  {
    title: 'Enterprise Notification Platform',
    outcome: 'Re-architected enterprise notification platform to 700-1,000 TPS with priority-lane design',
    domain: 'banking',
  },
  {
    title: 'White-label Data Platform Design & Architecture',
    outcome:
      'Led white-label enterprise data platform uplift (100+ inputs/outputs, multi-cloud)',
    domain: 'data',
  },
  {
    title: 'Emirates.com Replatform',
    outcome:
      'Led replatform of Emirates.com to AWS cloud and container technology: first in the GCC region',
    domain: 'aviation',
  },
];

export const caseStudyDomainLabels: Record<CaseStudyDomain, string> = {
  banking: 'Banking',
  regulatory: 'Banking / Regulatory',
  platform: 'Platform',
  data: 'Data',
  aviation: 'Aviation',
};

export const advisoryEngagementModels: AdvisoryEngagementModel[] = [
  {
    title: 'Architecture reviews',
    description:
      'Structured assessment of system and platform architecture with actionable recommendations, including distributed-system risks, ARB readiness, and regulatory alignment',
  },
  {
    title: 'Strategy workshops',
    description:
      'Align stakeholders on multi-portfolio target architecture and modernization roadmaps',
  },
  {
    title: 'Fractional leadership',
    description:
      'Hands-on design authority embedded in cloud, application, and platform modernization programs',
  },
  {
    title: 'Design authority',
    description:
      'Ongoing advisory for cloud, API, event-driven, distributed-system, and AI architecture decisions',
  },
  {
    title: 'Capability uplift',
    description:
      'Engineering patterns, quickstarts, and architecture mentoring to accelerate team delivery',
  },
];

export const advisoryCtaText =
  'I advise on cloud modernization, platform architecture, and governed AI. Tell me your context and we can decide if a short conversation is useful.';

export const contactIntro =
  'Interested in advisory work or an architecture conversation? Reach out with your context.';

export const contactLocation =
  'Based in Melbourne, Australia. Available for advisory engagements locally and internationally.';

export const advisoryEmail = 'jitender.sharma@outlook.com';

export const advisoryLinkedInUrl = 'https://linkedin.com/in/iamsharmajitender';
