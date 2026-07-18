"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "./brand";

const links = [
  { href: "/product", label: "Product" },
  { href: "/scout", label: "Scout AI" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Field notes" },
];

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-header ${overlay ? "site-header-overlay" : ""}`}>
      <div className="nav-shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="text-link desktop-only" href="https://app.churnaut.com" target="_blank" rel="noreferrer">Sign in</a>
          <a className="button button-ink desktop-only" href="https://cal.com/sharath.mb/demo" target="_blank" rel="noreferrer">Book a demo</a>
          <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
            <span>{open ? "Close" : "Menu"}</span><i /><i />
          </button>
        </div>
      </div>
      <div id="mobile-navigation" className={`mobile-nav ${open ? "mobile-nav-open" : ""}`}>
        {links.map((link, index) => <Link key={link.href} href={link.href}><span>0{index + 1}</span>{link.label}</Link>)}
        <div className="mobile-nav-actions">
          <a href="https://app.churnaut.com" target="_blank" rel="noreferrer">Sign in</a>
          <a className="button button-ink" href="https://cal.com/sharath.mb/demo" target="_blank" rel="noreferrer">Book a demo</a>
        </div>
      </div>
    </header>
  );
}
