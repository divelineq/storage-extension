import { useEffect, useState } from "react";

export function useStorage(mode: number) {
  const [storage, setStorage] = useState<[string, any][]>([]);

  useEffect(() => {
    async function loadStorage() {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      const [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: (modeNum: number) => {
          const storage = modeNum === 0 ? localStorage : sessionStorage;
          return Object.entries(storage);
        },
        args: [mode === 0 ? 0 : 1],
      });

      setStorage(result as any);
    }

    loadStorage();
  }, [mode]);

  return storage;
}
