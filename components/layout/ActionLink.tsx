import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./ActionLink.module.css";

type ActionLinkProps = {
  ariaLabel?: string;
  children: ReactNode;
  direction: "back" | "forward";
  href: string;
};

export function ActionLink({
  ariaLabel,
  children,
  direction,
  href,
}: ActionLinkProps) {
  return (
    <Link aria-label={ariaLabel} className={styles.actionLink} href={href}>
      {direction === "back" && <span aria-hidden="true">← </span>}
      {children}
      {direction === "forward" && <span aria-hidden="true"> →</span>}
    </Link>
  );
}
