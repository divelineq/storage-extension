function Delete() {
  return (
    <button
      className="p-1 bg-red-500/20 hover:bg-red-500/50 rounded transition-all duration-200 shrink-0 cursor-pointer flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        console.log("Удалить:");
      }}
      title="Удалить"
    >
      <svg
        className="w-3.5 h-3.5 text-red-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  );
}

export { Delete };
