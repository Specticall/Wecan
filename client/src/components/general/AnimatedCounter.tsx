import { useEffect, useState } from "react";

export default function AnimatedCounter({
  from,
  to,
  format,
  speedMultiplier = 5,
}: {
  from: number;
  to: number;
  speedMultiplier?: number;
  format?: Intl.LocalesArgument;
}) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let iterationCount = to - from;

    const counter = setInterval(iterate, 1);

    function iterate() {
      if (iterationCount <= 0) {
        clearInterval(counter);
        return;
      }
      iterationCount -= 1 * speedMultiplier;
      setCount((current) => current + 1 * speedMultiplier);
    }

    return () => clearInterval(counter);
  }, [to, from, speedMultiplier]);

  return format ? count.toLocaleString(format) : count;
}
