"use client";

import {
  type NavigationLayout,
  usePreferences,
} from "./PreferencesProvider";
import styles from "./ThemeSelector.module.css";

type LayoutOption = {
  description: string;
  label: string;
  value: NavigationLayout;
};

const layoutOptions: LayoutOption[] = [
  {
    value: "top",
    label: "Top navigation",
    description: "Places the primary links in a horizontal bar above the page.",
  },
  {
    value: "side",
    label: "Side navigation",
    description: "Places the primary links in a vertical panel on the left.",
  },
];

export function NavigationLayoutSelector() {
  const { navigationLayout, setNavigationLayout } = usePreferences();

  return (
    <fieldset className={`${styles.fieldset} ${styles.secondaryFieldset}`}>
      <legend className={styles.legend}>Choose a navigation layout</legend>
      <p className={styles.helpText}>
        Compact screens use the hamburger menu for either selection.
      </p>

      <div className={styles.options}>
        {layoutOptions.map((option) => (
          <label
            className={`${styles.option} ${styles.optionWithoutPreview}`}
            data-selected={navigationLayout === option.value}
            key={option.value}
          >
            <input
              checked={navigationLayout === option.value}
              className={styles.radio}
              name="navigation-layout"
              onChange={() => setNavigationLayout(option.value)}
              type="radio"
              value={option.value}
            />
            <span className={styles.optionText}>
              <span className={styles.optionName}>{option.label}</span>
              <span className={styles.optionDescription}>
                {option.description}
              </span>
            </span>
          </label>
        ))}
      </div>

      <p className={styles.currentTheme} aria-live="polite">
        Current layout: {navigationLayout} navigation
      </p>
    </fieldset>
  );
}
