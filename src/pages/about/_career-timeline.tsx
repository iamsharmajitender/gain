import {useRef, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import type {BackgroundEntry} from '@site/src/data/aboutProfile';
import styles from './career-timeline.module.css';

const TIMELINE_START = 2008;
const TIMELINE_END = 2026;

const tierLabels: Record<BackgroundEntry['timeline']['tier'], string> = {
  engineering: 'Engineering',
  senior: 'Senior engineering',
  architect: 'Solution architecture',
  enterprise: 'Enterprise architecture',
};

function yearToPercent(year: number): number {
  return ((year - TIMELINE_START) / (TIMELINE_END - TIMELINE_START)) * 100;
}

function formatSpan(yearStart: number, yearEnd: number | null): string {
  if (yearEnd === null) {
    return `${yearStart}–Present`;
  }

  return yearStart === yearEnd ? `${yearStart}` : `${yearStart}–${yearEnd}`;
}

type CareerTimelineRailProps = {
  entries: BackgroundEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

function CareerTimelineRail({
  entries,
  activeIndex,
  onSelect,
}: CareerTimelineRailProps): ReactNode {
  const chronological = [...entries].reverse();

  return (
    <div className={styles.rail}>
      <div className={styles.railHeader}>
        <p className={styles.railEyebrow}>Career arc</p>
        <p className={styles.railSummary}>
          <span className={styles.railYears}>18+ years</span>
          <span className={styles.railDivider}>·</span>
          <span>Engineering to enterprise architecture</span>
        </p>
      </div>

      <div className={styles.railAxis} aria-hidden="true">
        <span className={styles.axisLabel}>{TIMELINE_START}</span>
        <div className={styles.railTrack}>
          <div className={styles.railLine} />
          {chronological.map((entry) => {
            const {yearStart, yearEnd, tier} = entry.timeline;
            const endYear = yearEnd ?? TIMELINE_END;
            const left = yearToPercent(yearStart);
            const width = Math.max(yearToPercent(endYear) - left, 1.5);

            return (
              <div
                key={`${entry.period}-${entry.context}-segment`}
                className={clsx(styles.segment, styles[`tier_${tier}`])}
                style={{left: `${left}%`, width: `${width}%`}}
              />
            );
          })}
        </div>
        <span className={styles.axisLabel}>Today</span>
      </div>

      <div className={styles.nodeRow} role="tablist" aria-label="Career milestones">
        {chronological.map((entry, chronologicalIndex) => {
          const index = entries.length - 1 - chronologicalIndex;
          const {yearStart, yearEnd, org, tier} = entry.timeline;
          const midpoint = (yearStart + (yearEnd ?? TIMELINE_END)) / 2;
          const isActive = activeIndex === index;

          return (
            <button
              key={`${entry.period}-${entry.context}-node`}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={clsx(
                styles.node,
                styles[`tier_${tier}`],
                isActive && styles.nodeActive,
              )}
              style={{left: `${yearToPercent(midpoint)}%`}}
              onClick={() => onSelect(index)}
            >
              <span className={styles.nodeDot} />
              <span className={styles.nodeOrg}>{org}</span>
              <span className={styles.nodeYears}>{formatSpan(yearStart, yearEnd)}</span>
            </button>
          );
        })}
      </div>

      <ul className={styles.legend} aria-label="Career progression tiers">
        {(['engineering', 'senior', 'architect', 'enterprise'] as const).map((tier) => (
          <li key={tier} className={styles.legendItem}>
            <span className={clsx(styles.legendSwatch, styles[`tier_${tier}`])} />
            {tierLabels[tier]}
          </li>
        ))}
      </ul>
    </div>
  );
}

type CareerTimelineDetailsProps = {
  entries: BackgroundEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
  setItemRef: (index: number, element: HTMLLIElement | null) => void;
};

function CareerTimelineDetails({
  entries,
  activeIndex,
  onSelect,
  setItemRef,
}: CareerTimelineDetailsProps): ReactNode {
  return (
    <ul className={styles.details}>
      {entries.map((entry, index) => {
        const isActive = activeIndex === index;

        return (
          <li
            key={`${entry.period}-${entry.context}`}
            ref={(element) => setItemRef(index, element)}
            className={clsx(styles.detailCard, isActive && styles.detailCardActive)}
          >
            <button
              type="button"
              className={styles.detailToggle}
              aria-expanded={isActive}
              onClick={() => onSelect(index)}
            >
              <div className={styles.detailHeader}>
                <span className={styles.period}>{entry.period}</span>
                <span
                  className={clsx(
                    styles.tierBadge,
                    styles[`tier_${entry.timeline.tier}`],
                  )}
                >
                  {entry.timeline.org}
                </span>
              </div>
              <h3 className={styles.role}>{entry.role}</h3>
              <p className={styles.context}>{entry.context}</p>
            </button>
            {isActive ? (
              <ul className={styles.highlights}>
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

type CareerTimelineProps = {
  entries: BackgroundEntry[];
};

export default function CareerTimeline({entries}: CareerTimelineProps): ReactNode {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const setItemRef = (index: number, element: HTMLLIElement | null) => {
    itemRefs.current[index] = element;
  };

  const selectEntry = (index: number) => {
    setActiveIndex(index);
    itemRefs.current[index]?.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  };

  return (
    <>
      <CareerTimelineRail
        entries={entries}
        activeIndex={activeIndex}
        onSelect={selectEntry}
      />
      <CareerTimelineDetails
        entries={entries}
        activeIndex={activeIndex}
        onSelect={selectEntry}
        setItemRef={setItemRef}
      />
    </>
  );
}
