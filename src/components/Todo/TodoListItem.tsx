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
    <label className="flex items-center justify-between cursor-pointer">
      <div>
        <input
          className="mr-1.5"
          type="checkbox"
          checked={optimisticCompleted}
          onChange={handleChange}
        />
        <span className={clsx(optimisticCompleted ? "line-through" : "")}>
          {entry.title}
        </span>
      </div>

      <button onClick={handleRemove}>
        <XMarkIcon className="size-6" />
      </button>
    </label>
  );
};
