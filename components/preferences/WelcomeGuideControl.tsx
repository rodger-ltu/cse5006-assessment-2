"use client";

import { usePreferences } from "./PreferencesProvider";
import styles from "./ThemeSelector.module.css";

export function WelcomeGuideControl() {
  const { isWelcomeGuideDismissed, restoreWelcomeGuide } = usePreferences();

  return (
    <section
      className={`${styles.fieldset} ${styles.secondaryFieldset}`}
      aria-labelledby="welcome-guide-heading"
    >
      <h3 className={styles.legend} id="welcome-guide-heading">
        Welcome guide
      </h3>
      <button
        className={styles.restoreButton}
        disabled={!isWelcomeGuideDismissed}
        onClick={restoreWelcomeGuide}
        type="button"
      >
        {isWelcomeGuideDismissed
          ? "Show welcome guide again"
          : "Welcome guide is currently shown"}
      </button>
    </section>
  );
}
