import { StorageList } from "./Components";

function App() {
  return (
    <div className="w-200 h-150 bg-zinc-900 text-zinc-100 p-2 overflow-hidden border border-zinc-800 shadow-2xl">
      <StorageList mode={0} />
    </div>
  );
}

export default App;
