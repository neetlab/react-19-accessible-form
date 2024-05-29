import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Entry } from "../../models/entry";
import { startTransition, useOptimistic } from "react";

export type TodoListItemProps = {
  readonly entry: Entry;
  readonly onCheck: () => Promise<void>;
  readonly onRemove: () => Promise<void>;
};

export const TodoListItem = (props: TodoListItemProps) => {
  const { entry, onCheck, onRemove } = props;

  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(
    entry.completed
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(async () => {
      setOptimisticCompleted(event.target.checked);
      await onCheck?.();
    });
  };

  const handleRemove = () => {
    startTransition(async () => {
      await onRemove?.();
    });
  };

  return (
    <div
      className="flex items-center justify-between hover:bg-zinc-100 transition focus:bg-zinc-100"
      tabIndex={-1}
    >
      <label
        className={clsx(
          "block flex-1 cursor-pointer px-2 py-1.5",
          optimisticCompleted ? "opacity-50" : ""
        )}
      >
        <input
          className="mr-2 mx-auto"
          type="checkbox"
          checked={optimisticCompleted}
          onChange={handleChange}
        />

        <span className={clsx(optimisticCompleted ? "line-through" : "")}>
          {entry.title}
        </span>
      </label>

      <button
        className="text-zinc-500 pr-2"
        onClick={handleRemove}
        aria-label="削除"
      >
        <XMarkIcon className="size-6" />
      </button>
    </div>
  );
};
