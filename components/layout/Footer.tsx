import styles from "./SiteLayout.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span>Rodger Herbert</span>
        <span>Student number: 22838962</span>
      </div>
    </footer>
  );
}
