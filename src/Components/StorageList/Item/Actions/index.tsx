import { Copy } from "./Copy";
import { Delete } from "./Delete";

function Actions() {
  return (
    <div className="flex gap-1">
      <Delete />
      <Copy content="jopaaaa" />
    </div>
  );
}

export { Actions };
