import type {DomainTagId} from '@site/src/data/depthDomainTags';
import {
  DOMAIN_TAG_LABELS,
  DOMAIN_TAG_SHORT_LABELS,
} from '@site/src/data/depthDomainTags';

export type DomainCoverageArea = {
  title: string;
  description: string;
};

export type DomainSiteSection = {
  label: string;
  description: string;
  href: string;
};

export type DomainPageConfig = {
  id: DomainTagId;
  path: string;
  title: string;
  shortLabel: string;
  subtitle: string;
  whenToUse: string;
  meaningParagraphs: string[];
  coverageAreas: DomainCoverageArea[];
  frameworkHighlight?: string;
  siteSectionOverrides?: Partial<Record<'framework' | 'blueprints' | 'architecture' | 'playbooks' | 'insights', string>>;
  ctaText: string;
};

export const DOMAIN_PAGE_PATHS: Record<DomainTagId, string> = {
  'system-architecture': '/strategy-architecture',
  'platforms-engineering': '/platforms-engineering',
  'ai-intelligence': '/ai-intelligence',
  'governance-trust': '/governance-trust',
};

function defaultSiteSections(
  tagId: DomainTagId,
  overrides?: DomainPageConfig['siteSectionOverrides'],
): DomainSiteSection[] {
  const label = DOMAIN_TAG_LABELS[tagId];
  return [
    {
      label: 'Blueprints',
      description:
        overrides?.blueprints ??
        `Structural reference models and diagrams tagged ${label}.`,
      href: `/blueprints/tags/${tagId}`,
    },
    {
      label: 'Architecture',
      description:
        overrides?.architecture ??
        `Platform patterns and foundations tagged ${label}.`,
      href: `/architecture/tags/${tagId}`,
    },
    {
      label: 'Playbooks',
      description:
        overrides?.playbooks ??
        `Staged build guides and delivery paths tagged ${label}.`,
      href: `/playbooks/tags/${tagId}`,
    },
    {
      label: 'Insights',
      description:
        overrides?.insights ??
        `Essays, explainers, and field lessons tagged ${label}.`,
      href: `/insights/tags/${tagId}`,
    },
  ];
}

export const domainPages: Record<DomainTagId, DomainPageConfig> = {
  'system-architecture': {
    id: 'system-architecture',
    path: DOMAIN_PAGE_PATHS['system-architecture'],
    title: DOMAIN_TAG_LABELS['system-architecture'],
    shortLabel: DOMAIN_TAG_SHORT_LABELS['system-architecture'],
    subtitle:
      'The discipline of turning business intent into durable technical direction — through roadmaps, reference models, and design authority.',
    whenToUse:
      'Reach for this domain when the question is why and what shape — before how to build or which component to deploy.',
    meaningParagraphs: [
      'Strategy & Architecture is the practice of aligning what the organisation must achieve with how systems are shaped to deliver it — and keeping that alignment honest as technology, regulation, and delivery pressure change.',
      'Strategy sets direction: outcomes, constraints, sequencing, and the tradeoffs leadership is willing to make. Architecture makes direction durable — target states, capability boundaries, integration patterns, and standards that teams can implement without renegotiating intent on every project.',
      'It is the work of defining what “good” looks like across the enterprise, who owns which decisions, and which structures will still make sense after the first release, the first audit, and the first reorganisation.',
      'In regulated environments — banking, aviation, critical infrastructure — this discipline matters because failure is expensive and visible. Strategy without architecture stays abstract; architecture without strategy optimises locally and drifts globally. Together they are how modernisation holds up in production.',
    ],
    coverageAreas: [
      {
        title: 'Enterprise direction',
        description:
          'Target architecture, transformation roadmaps, and sequencing that balances speed with risk in regulated environments.',
      },
      {
        title: 'Reference models & boundaries',
        description:
          'How capabilities, domains, and systems connect — what owns what, and where coupling creates fragility.',
      },
      {
        title: 'Design authority',
        description:
          'Standards, architecture boards, decision frameworks, and patterns that teams can apply without waiting on a gatekeeper.',
      },
      {
        title: 'AI & platform strategy',
        description:
          'Where GenAI, agents, and platforms fit in the enterprise — maturity, rollout, and operating-model choices before build.',
      },
      {
        title: 'Business–technology alignment',
        description:
          'Translating executive intent into architecture outcomes: roadmaps stakeholders can fund, govern, and measure.',
      },
    ],
    siteSectionOverrides: {
      blueprints:
        'Structural reference models — control planes, domain boundaries, maturity, rollout scorecards.',
      architecture: 'Platform foundations and full-stack patterns that strategy depends on.',
      playbooks: 'Staged build paths where strategy meets delivery — e.g. banking AI platform design.',
      insights: 'Perspectives, explainers, and architecture breakdowns tagged Strategy & Architecture.',
    },
    ctaText:
      'Leading transformation or setting enterprise architecture direction? This is the domain I advise on most directly.',
  },
  'platforms-engineering': {
    id: 'platforms-engineering',
    path: DOMAIN_PAGE_PATHS['platforms-engineering'],
    title: DOMAIN_TAG_LABELS['platforms-engineering'],
    shortLabel: DOMAIN_TAG_SHORT_LABELS['platforms-engineering'],
    subtitle:
      'The discipline of building runnable platform capability — cloud-native, event-driven, observable systems that teams can ship on at enterprise scale.',
    whenToUse:
      'Reach for this domain when the question is how systems run, integrate, and scale — APIs, events, runtimes, gateways, and the engineering fabric beneath applications and AI.',
    meaningParagraphs: [
      'Platforms & Engineering is the practice of turning architectural intent into shared capability: the infrastructure, integration patterns, and operational foundations that many teams reuse instead of rebuilding.',
      'A platform is more than Kubernetes clusters or a cloud account. It is contracts — APIs, events, identity, observability, deployment rails — and the discipline of making those contracts stable enough that product teams move fast without fragmenting the estate.',
      'It is not ticket-driven ops, tool sprawl, or “platform” as a rebranded hosting team. It is engineering judgment applied at scale: where to standardise, where to allow variation, and how to design for failure, latency, and change before production traffic arrives.',
      'Strong platforms make everything upstream cheaper — including governed AI. Weak platforms force every team to wire their own integrations, invent their own resilience, and explain their own outages. In regulated environments, that fragmentation becomes risk.',
    ],
    coverageAreas: [
      {
        title: 'Cloud & platform foundations',
        description:
          'Multi-cloud posture, landing zones, shared services, and the platform primitives teams reuse instead of reinventing.',
      },
      {
        title: 'APIs, events & integration',
        description:
          'Contracts, coupling, and message-driven design — how systems exchange data without becoming a tangled monolith.',
      },
      {
        title: 'Distributed systems & resilience',
        description:
          'Failure modes, consistency tradeoffs, latency budgets, and patterns that hold up when volume and regulation both increase.',
      },
      {
        title: 'AI runtime & gateway patterns',
        description:
          'Inference paths, routing, cost control, and the platform surfaces that sit between applications and models.',
      },
      {
        title: 'Observability & operability',
        description:
          'Telemetry, SLOs, and runbooks — making production behaviour visible before incidents reach executives.',
      },
    ],
    siteSectionOverrides: {
      framework: 'Platform stack views in G.A.I.N AIOM — how capability layers map to runnable infrastructure.',
      blueprints: 'Runtime plane, LLM gateway, event-driven AI, latency and cost models.',
      architecture: 'Distributed systems, API design, event-driven architecture, LLM production patterns.',
      playbooks: 'LLM integration, data pipelines, AI observability, and platform build guides.',
    },
    ctaText:
      'Modernising platforms or standing up shared AI runtime capability? This is where I help teams align engineering with architecture intent.',
  },
  'ai-intelligence': {
    id: 'ai-intelligence',
    path: DOMAIN_PAGE_PATHS['ai-intelligence'],
    title: DOMAIN_TAG_LABELS['ai-intelligence'],
    shortLabel: DOMAIN_TAG_SHORT_LABELS['ai-intelligence'],
    subtitle:
      'The discipline of delivering machine intelligence as enterprise systems — retrieval, generation, agents, and context under production constraints.',
    whenToUse:
      'Reach for this domain when the question is how intelligence is produced and delivered — from context and retrieval through generation, tool use, and governed outcomes.',
    meaningParagraphs: [
      'AI & Intelligence is the practice of making machine reasoning useful inside real organisations: not isolated model calls, but systems that retrieve context, generate responses, take action, and remain accountable.',
      'It spans the full intelligence path — grounding truth before generation, shaping prompts and context, orchestrating agents and tools, and routing inference with explicit tradeoffs for latency, cost, and quality.',
      'It is not chatbot demos, model shopping, or autonomy without boundaries. It is systems design where the model proposes and the surrounding architecture decides: what data is in scope, what tools may run, what gets logged, and what requires human approval.',
      'In enterprise and regulated settings, intelligence only matters if it is repeatable, explainable, and safe to operate. That requires treating AI as architecture — pipelines, runtimes, and control points — not as a feature bolted onto legacy applications.',
    ],
    coverageAreas: [
      {
        title: 'LLM & inference patterns',
        description:
          'Model selection, routing, grounding, and production constraints — latency, cost, and quality tradeoffs made explicit.',
      },
      {
        title: 'RAG & context engineering',
        description:
          'Retrieval pipelines, context engines, memory models, and how truth enters the system before generation.',
      },
      {
        title: 'Agents & orchestration',
        description:
          'Tool use, execution flows, human checkpoints, and autonomy boundaries in enterprise workflows.',
      },
      {
        title: 'MCP & tool integration',
        description:
          'Governed capability surfaces — how agents reach enterprise systems without bypassing policy.',
      },
      {
        title: 'Production AI adoption',
        description:
          'Rollout patterns, eval harnesses, and the path from pilot to platform — not proof-of-concept theatre.',
      },
    ],
    siteSectionOverrides: {
      framework: 'G.A.I.N LLM, RAG, Prompt, Agents, and MCP — domain ownership and key patterns.',
      blueprints: 'RAG architecture, agent flows, context engine, memory model, MCP tool registry.',
      architecture: 'Enterprise RAG, governed agents, hallucination guardrails, MCP integration.',
      playbooks: 'Build enterprise RAG, agentic systems design, verification layer, governed MCP setup.',
      insights: 'Technical breakdowns and leadership perspectives on production AI.',
    },
    ctaText:
      'Standing up governed GenAI or agent capability in a regulated environment? This is the domain I advise and build in public.',
  },
  'governance-trust': {
    id: 'governance-trust',
    path: DOMAIN_PAGE_PATHS['governance-trust'],
    title: DOMAIN_TAG_LABELS['governance-trust'],
    shortLabel: DOMAIN_TAG_SHORT_LABELS['governance-trust'],
    subtitle:
      'The discipline of making systems provable, permissioned, and resilient — policy, identity, audit, and quality gates woven into how software runs.',
    whenToUse:
      'Reach for this domain when the question is who may do what, what must be demonstrable, and how systems stay compliant and trustworthy under change.',
    meaningParagraphs: [
      'Governance & Trust is the practice of ensuring systems behave within explicit boundaries — and that those boundaries can be explained, audited, and enforced when stakes are high.',
      'It covers identity and access, policy enforcement, evidence trails, evaluation gates, and the operational discipline that turns “we should be compliant” into runtime behaviour teams can rely on.',
      'It is not checkbox compliance, security theatre, or governance committees that meet after incidents. It is architectural: controls embedded in request paths, retrieval boundaries, agent actions, and release criteria — designed in, not patched on after launch.',
      'Trust is earned when behaviour is predictable under scrutiny — from regulators, risk teams, and the operators who run production. Without this discipline, strategy, platforms, and intelligence do not scale; they accumulate risk until someone says stop.',
    ],
    coverageAreas: [
      {
        title: 'Policy & access control',
        description:
          'Runtime enforcement, access-controlled retrieval, and rules that apply before action — not after damage.',
      },
      {
        title: 'Identity & authorization',
        description:
          'Who and what may invoke models, tools, and data — boundaries that hold across agents and integrations.',
      },
      {
        title: 'Audit & compliance evidence',
        description:
          'Agent audit trails, control maps, and the artefacts regulators and risk teams need to sign off.',
      },
      {
        title: 'Evaluation & quality gates',
        description:
          'Scoring, harnesses, and release criteria — governed quality, not post-hoc spreadsheets.',
      },
      {
        title: 'Operational resilience',
        description:
          'Human-in-the-loop checkpoints, rollout gates, and failure handling when models or dependencies misbehave.',
      },
    ],
    siteSectionOverrides: {
      framework: 'G.A.I.N Identity, Evaluation, and Observability — governance as system design.',
      blueprints: 'Policy enforcement, audit trails, compliance maps, access-controlled RAG, rollout gates.',
      architecture: 'Policy boundaries, governed agent systems, AI observability architecture.',
      playbooks: 'Access-controlled RAG, verification layer, and governed delivery patterns.',
      insights: 'Compliance, policy, and trust themes in enterprise AI adoption.',
    },
    ctaText:
      'Need governed AI that survives architecture review and regulatory scrutiny? This is the domain where I help teams build proof, not promises.',
  },
};

export function getDomainSiteSections(config: DomainPageConfig): DomainSiteSection[] {
  return defaultSiteSections(config.id, config.siteSectionOverrides);
}
