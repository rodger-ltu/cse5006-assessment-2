"use client";

import styles from "@/components/home/HomePrimaryContent.module.css";

import { usePreferences } from "./PreferencesProvider";
import selectorStyles from "./ThemeSelector.module.css";

export function WelcomeGuideControl() {
  const { isWelcomeGuideDismissed, restoreWelcomeGuide } = usePreferences();

  return (
    <section
      className={`${selectorStyles.fieldset} ${selectorStyles.secondaryFieldset}`}
      aria-labelledby="welcome-guide-heading"
    >
      <h3 className={selectorStyles.legend} id="welcome-guide-heading">
        Welcome guide
      </h3>
      <p className={styles.settingsText}>
        Restore the short introduction shown to first-time visitors on Home.
      </p>
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
