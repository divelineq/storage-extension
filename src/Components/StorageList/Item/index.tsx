import { useState, type MouseEvent } from "react";
import { Actions } from "./Actions";

type Props = {
  storage: [string, any][] | undefined;
};

type PopoverState = {
  type: "key" | "value";
  content: string;
} | null;

function Item({ storage }: Props) {
  const [popover, setPopover] = useState<PopoverState>(null);

  const openPopover = (
    e: MouseEvent,
    type: "key" | "value",
    content: string,
  ) => {
    e.stopPropagation();
    setPopover({ type, content });
  };

  const closePopover = () => setPopover(null);

  if (!storage || storage.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500 text-sm">
        localStorage пуст
      </div>
    );
  }

  return (
    <>
      {storage.map(([key, value]) => (
        <div
          key={key}
          className="group p-1 bg-zinc-800/50 hover:bg-zinc-700/70 border border-zinc-700/50 rounded-lg transition-all flex items-center h-8 overflow-hidden my-1 relative"
        >
          <div
            className="text-zinc-300 font-mono text-xs bg-zinc-900/70 px-2 py-0.5 rounded shrink-0 w-40 truncate leading-none flex items-center h-full cursor-pointer hover:bg-zinc-800/50"
            onClick={(e: MouseEvent) => openPopover(e, "key", key)}
          >
            <code className="truncate">{key}</code>
          </div>
          <div className="w-px h-4 bg-zinc-600/50 mx-3 shrink-0 self-center" />
          <div
            className="flex-1 text-zinc-400 text-xs font-mono bg-black/20 px-2 py-0.5 rounded truncate leading-none flex items-center h-full cursor-pointer hover:bg-zinc-900/50"
            onClick={(e) =>
              openPopover(e, "value", JSON.stringify(value, null, 2))
            }
          >
            <code className="truncate">{value}</code>
          </div>
          <div className="w-px h-4 bg-zinc-600/50 mx-3 shrink-0 self-center" />
          <Actions />
        </div>
      ))}

      {popover && (
        <>
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />

          <div
            className="fixed z-60 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-zinc-900/95 backdrop-blur-md border border-zinc-700/50 rounded-xl shadow-2xl
        max-w-[95vw] max-h-[95vh] 
        min-w-[min(500px,90vw)] min-h-75
        overflow-hidden"
          >
            <div className="bg-zinc-800/80 p-3 flex items-center justify-between border-b border-zinc-700/50 sticky top-0 z-10 backdrop-blur-sm">
              <span className="text-zinc-300 text-sm font-semibold capitalize tracking-wide">
                {popover.type.toUpperCase()}
              </span>
              <button
                className="w-7 h-7 bg-zinc-700/50 hover:bg-red-500/90 text-zinc-400 hover:text-white 
            rounded-lg flex items-center justify-center text-lg font-black transition-all 
            shadow-md hover:shadow-xl border border-zinc-600/50 hover:border-red-400/50 hover:scale-105"
                onClick={closePopover}
              >
                ×
              </button>
            </div>

            <div
              className="w-full h-full p-6 font-mono text-sm leading-relaxed text-zinc-100 
        overflow-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900/50"
            >
              <pre className="select-all whitespace-pre-wrap break-all">
                {popover.content}
              </pre>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export { Item };
