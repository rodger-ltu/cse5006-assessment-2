"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./SiteLayout.module.css";

type NavigationProps = {
  isMenuOpen: boolean;
  onNavigate: () => void;
};

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/feeds", label: "Feeds" },
  { href: "/rss-client", label: "RSS client" },
  { href: "/manage", label: "Manage" },
  { href: "/server", label: "Server" },
  { href: "/about", label: "About" },
  { href: "/settings", label: "Settings" },
];

export function Navigation({ isMenuOpen, onNavigate }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className={styles.navigation}
      data-open={isMenuOpen}
      id="primary-navigation"
      aria-label="Primary navigation"
    >
      <div className={styles.navigationInner}>
        <span className={styles.navigationHeading} aria-hidden="true">
          Navigation
        </span>
        <ul className={styles.navigationList}>
          {navigationItems.map((item) => {
            const isCurrentPage =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));

            return (
              <li key={item.href}>
                <Link
                  className={`${styles.navigationLink} ${
                    isCurrentPage ? styles.activeNavigationLink : ""
                  }`}
                  href={item.href}
                  aria-current={isCurrentPage ? "page" : undefined}
                  onClick={onNavigate}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
