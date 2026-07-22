"use client";

import {
  availableThemes,
  type Theme,
  usePreferences,
} from "./PreferencesProvider";
import styles from "./ThemeSelector.module.css";

type ThemeOption = {
  description: string;
  label: string;
  value: Theme;
};

const themeOptions: ThemeOption[] = [
  {
    value: "day",
    label: "Day",
    description: "A bright, neutral theme for well-lit environments.",
  },
  {
    value: "night",
    label: "Night",
    description: "A low-light theme with softer contrast.",
  },
  {
    value: "ocean",
    label: "Ocean",
    description: "A cool blue-green theme with calm accents.",
  },
  {
    value: "terminal",
    label: "Terminal",
    description: "A dark theme with green terminal-inspired text.",
  },
];

export function ThemeSelector() {
  const { setTheme, theme } = usePreferences();

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Choose a theme</legend>
      <p className={styles.helpText}>
        Your selection is saved in this browser and restored when you return.
      </p>

      <div className={styles.options}>
        {themeOptions.map((option) => (
          <label
            className={styles.option}
            data-selected={theme === option.value}
            key={option.value}
          >
            <input
              checked={theme === option.value}
              className={styles.radio}
              name="theme"
              onChange={() => setTheme(option.value)}
              type="radio"
              value={option.value}
            />
            <span
              className={styles.preview}
              data-theme-preview={option.value}
              aria-hidden="true"
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
        Current theme: {availableThemes.find((item) => item === theme)}
      </p>
    </fieldset>
  );
}
