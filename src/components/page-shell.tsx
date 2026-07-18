import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function PageShell({ children, overlay = false }: { children: React.ReactNode; overlay?: boolean }) {
  return <><SiteHeader overlay={overlay} /><main>{children}</main><SiteFooter /></>;
}
