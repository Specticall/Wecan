export default function ShuffleShortcutTooltip() {
  return (
    <p className="flex self-center gap-1 items-center py-6">
      Press{" "}
      <span className="border-[2px] border-dark rounded-sm px-2 py-[0.1px]">
        space
      </span>{" "}
      to shuffle
      <i className="bx bx-shuffle"></i>
    </p>
  );
}
