/**
 * Re-mounted on every navigation, so a short opacity fade (300ms, CSS only, no JS)
 * gives smooth page transitions without ever slowing navigation down.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
