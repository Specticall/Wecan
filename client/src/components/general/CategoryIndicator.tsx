// Tooltip that displays a text and a counter
export function CategoryIndicator({
  count,
  text,
}: {
  count: number;
  text: string;
}) {
  return (
    <p className="text-light flex items-center justify-start gap-3 text-[1rem] mb-[-1.5rem] 3xl:mb-0">
      {text}
      <div className="text-dark bg-white-soft p-2 rounded-md border-[1px] border-border w-6 h-6 flex items-center justify-center">
        {count}
      </div>
    </p>
  );
}
