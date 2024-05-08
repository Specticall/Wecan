/**
 * Wrapper component to display loading skeleton. This component prevents having to use many ternaries on the code.
 * NOTE: This component is not able to do a typescript type guarding, so even if you have a certain uncertain value be condition for fallback render, the actual children component itself won't know that the uncertain varible has been type guarded.
 *
 */
export default function Suspend({
  fallback,
  renderFallback,
  children,
}: {
  fallback: React.ReactNode;
  renderFallback: boolean;
  children: React.ReactNode;
}) {
  if (renderFallback) return fallback;
  return children;
}
