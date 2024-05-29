import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Entry } from "../../models/entry";
import { startTransition, useId, useOptimistic } from "react";

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
    <div className="flex items-center justify-between cursor-pointer hover:bg-zinc-100 rounded transition px-2 -mx-2 py-1">
      <label className="block flex-1 cursor-pointer">
        <input
          className="mr-1.5"
          type="checkbox"
          checked={optimisticCompleted}
          onChange={handleChange}
        />

        <span className={clsx(optimisticCompleted ? "line-through" : "")}>
          {entry.title}
        </span>
      </label>

      <button className="text-zinc-500" onClick={handleRemove}>
        <XMarkIcon className="size-6" aria-label="削除" />
      </button>
    </div>
  );
};
