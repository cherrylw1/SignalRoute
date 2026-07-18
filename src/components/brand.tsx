import Link from "next/link";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`brand-lockup ${inverse ? "brand-lockup-inverse" : ""}`} aria-label="Churnaut home">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span>churnaut</span>
    </Link>
  );
}
