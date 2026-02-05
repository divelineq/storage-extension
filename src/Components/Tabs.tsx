import { useId } from "react";

type TabItem = {
  value: number;
  label: React.ReactNode;
  disabled?: boolean;
};

type TabsListProps = {
  items: TabItem[];
  value: number;
  onValueChange: (value: number) => void;
  className?: string;
  "aria-label"?: string;
};

export function TabsList({
  items,
  value,
  onValueChange,
  className = "",
  "aria-label": ariaLabel = "Tabs",
}: TabsListProps) {
  const baseId = useId();
  const activeIndex = Math.max(
    0,
    items.findIndex((t) => t.value === value),
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();

    const enabled = items
      .map((t, idx) => ({ t, idx }))
      .filter(({ t }) => !t.disabled);

    if (!enabled.length) return;

    const currentEnabledPos = enabled.findIndex(
      ({ idx }) => idx === activeIndex,
    );
    const pos = currentEnabledPos === -1 ? 0 : currentEnabledPos;

    const nextPos =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? enabled.length - 1
          : e.key === "ArrowRight"
            ? (pos + 1) % enabled.length
            : (pos - 1 + enabled.length) % enabled.length;

    onValueChange(enabled[nextPos].t.value);
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={[
        "inline-flex w-full gap-1 rounded-xl bg-zinc-100/80 p-1.5 backdrop-blur-sm shadow-sm",
        "dark:bg-zinc-800/70",
        className,
      ].join(" ")}
    >
      {items.map((tab, idx) => {
        const selected = idx === activeIndex;
        const tabId = `${baseId}-tab-${tab.value}`;

        return (
          <button
            key={tab.value}
            id={tabId}
            role="tab"
            type="button"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onValueChange(tab.value)}
            className={[
              "relative flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              tab.disabled
                ? "opacity-40 cursor-not-allowed bg-zinc-100/50 dark:bg-zinc-800/50"
                : selected
                  ? "bg-white/90 shadow-md shadow-black/10 text-zinc-900 dark:bg-zinc-900/90 dark:text-zinc-50 dark:shadow-zinc-950/20"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-white/70 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-700/50",
              "active:scale-[0.98]",
            ].join(" ")}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
