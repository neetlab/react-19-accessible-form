"use client";

import clsx from "clsx";
import { FC, startTransition, use, useOptimistic } from "react";
import { Entry } from "../../models/entry";
import { TodoListItem } from "./TodoListItem";

export type TodoListProps = {
  readonly className?: string;
  readonly entries: Promise<readonly Entry[]>;
  readonly onCheck: (id: string) => Promise<void>;
  readonly onRemove: (id: string) => Promise<void>;
};

export const TodoList: FC<TodoListProps> = (props) => {
  const { className } = props;

  const entries = use(props.entries);
  const [optimisticEntries, setOptimisticEntries] = useOptimistic(entries);

  const handleRemove = async (id: string) => {
    setOptimisticEntries((entries) => entries.filter((entry) => entry.id !== id));
    await props.onRemove(id);
  }

  return (
    <>
      <p className="text-zinc-600 leading-relaxed">
        {
          optimisticEntries.length === 0 ? "No items to display" :
          optimisticEntries.length === 1 ? "You have 1 item in your list" :
          `You have ${optimisticEntries.length} items in your list`
        }
      </p>

      <ul className={clsx("space-y-1", className)}>
        {optimisticEntries.map((entry) => (
          <TodoListItem
            key={entry.id}
            entry={entry}
            onCheck={() => props.onCheck(entry.id)}
            onRemove={() => handleRemove(entry.id)}
          />
        ))}
      </ul>
    </>
  );
};
