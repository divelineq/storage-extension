import { Item } from "./Item";
import { useStorage } from "./useStorage";

type Props = {
  mode: number;
};

function StorageList({ mode }: Props) {
  const storage = useStorage(mode);

  return (
    <>
      <div>
        <h1 className="text-xl font-bold text-zinc-200 border-b border-zinc-700 ">
          localStorage ({storage?.length})
        </h1>
      </div>

      <div className="h-full overflow-scroll py-2">
        <Item storage={storage} />
      </div>
    </>
  );
}

export { StorageList };
