import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return <>{formattedTime}</>;
}
