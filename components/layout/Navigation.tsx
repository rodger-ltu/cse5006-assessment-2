"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./SiteLayout.module.css";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/feeds", label: "Feeds" },
  { href: "/about", label: "About" },
  { href: "/settings", label: "Settings" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.navigation} aria-label="Primary navigation">
      <ul className={styles.navigationList}>
        {navigationItems.map((item) => {
          const isCurrentPage = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                className={`${styles.navigationLink} ${
                  isCurrentPage ? styles.activeNavigationLink : ""
                }`}
                href={item.href}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
