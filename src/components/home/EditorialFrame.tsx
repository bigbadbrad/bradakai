import type { ReactNode } from 'react';
import styles from './editorial-frame.module.css';

type EditorialFrameProps = {
  children: ReactNode;
  /** When false, renders children only (no frame markup). */
  enabled?: boolean;
};

/** Double-mat “framed editorial card” wrapper for homepage image experiments. */
export function EditorialFrame({ children, enabled = true }: EditorialFrameProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div className={styles.editorialFrame}>
      <div className={styles.editorialFrameInner}>{children}</div>
    </div>
  );
}
