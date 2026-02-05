function Copy({ content }: { content: string }) {
  const copy = async () => {
    await navigator.clipboard.writeText(content);
  };

  return (
    <button
      className="p-1 bg-emerald-500/20 hover:bg-emerald-500/50 rounded transition-all duration-200 shrink-0 cursor-pointer flex items-center justify-center"
      onClick={copy}
      title="Копировать"
    >
      <svg
        className="w-4 h-4 text-emerald-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M16.862 4.487L19.5 7.125"
        />
      </svg>
    </button>
  );
}

export { Copy };
