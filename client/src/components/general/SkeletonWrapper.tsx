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
