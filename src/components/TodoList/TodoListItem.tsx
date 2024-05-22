"use client";

import { Entry } from "../../models/entry";
import { startTransition, useOptimistic } from "react";

export type TodoListItemProps = {
  readonly entry: Entry;
  readonly onCheck?: () => void;
};

export const TodoListItem = (props: TodoListItemProps) => {
  const { entry, onCheck } = props;

  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(
    entry.completed
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setOptimisticCompleted(event.target.checked);
      onCheck?.();
    });
  };

  return (
    <label className="flex items-center">
      <input
        className="mr-1.5"
        type="checkbox"
        checked={optimisticCompleted}
        onChange={handleChange}
      />
      <span>{entry.title}</span>
    </label>
  );
};
