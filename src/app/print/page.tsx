import { Fragment } from 'react';
import type { Metadata } from 'next';
import { HatIconPerfect } from '@/components/icon-hat-perfect';
import styles from './print-page.module.css';

export const metadata: Metadata = {
  title: 'Print — heart icon',
  description: 'Printable Nury heart icon at 30mm height for home printers.',
  robots: { index: false, follow: false },
};

const ICON_COUNT = 12;
const COLS = 4;

function chunkIntoRows(count: number, cols: number): number[][] {
  const rows: number[][] = [];
  for (let i = 0; i < count; i += cols) {
    rows.push(
      Array.from({ length: Math.min(cols, count - i) }, (_, j) => i + j),
    );
  }
  return rows;
}

/** Short horizontal + short vertical dashed cross in gutter bands only — no rules beside icons. */
function gutterCross() {
  return (
    <>
      <span className={styles.vBandTick} aria-hidden />
      <span className={styles.hCutLine} aria-hidden />
    </>
  );
}

/** Horizontal gutter band between icon rows (+ top edge / bottom edge of matrix). */
function InterRowCutRow({ rowKey }: { rowKey: string }) {
  return (
    <>
      <div className={styles.hCutGutter} key={`${rowKey}-edge-l`} aria-hidden>
        {gutterCross()}
      </div>
      {Array.from({ length: COLS }, (_, c) => (
        <Fragment key={`${rowKey}-${c}`}>
          <div className={styles.hCutBlank} aria-hidden />
          {c < COLS - 1 ? (
            <div className={styles.hCutGutter} aria-hidden>
              {gutterCross()}
            </div>
          ) : null}
        </Fragment>
      ))}
      <div className={styles.hCutGutter} key={`${rowKey}-edge-r`} aria-hidden>
        {gutterCross()}
      </div>
    </>
  );
}

export default function PrintPage() {
  const rows = chunkIntoRows(ICON_COUNT, COLS);

  return (
    <div className={styles.page}>
      <p className={styles.lead}>
        Each icon prints at <strong>30mm tall</strong>. Crop marks appear only in the narrow bands between icons (short dashed
        crosses)—nothing prints beside the artwork.
      </p>
      <div className={styles.sheet}>
        <div className={styles.matrix} aria-label="Printable heart icons with cut guides">
          <InterRowCutRow rowKey="top" />
          {rows.map((row, ri) => (
            <Fragment key={ri}>
              <div className={styles.gutterSpacer} aria-hidden />
              {row.map((idx, ci) => (
                <Fragment key={idx}>
                  {ci > 0 ? <div className={styles.gutterSpacer} aria-hidden /> : null}
                  <div className={styles.iconSlot}>
                    <HatIconPerfect fill1="#111827" />
                  </div>
                </Fragment>
              ))}
              <div className={styles.gutterSpacer} aria-hidden />
              <InterRowCutRow rowKey={`row-${ri}`} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
