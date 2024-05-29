"use client";

import { FC, use, useOptimistic } from "react";
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
    setOptimisticEntries((entries) =>
      entries.filter((entry) => entry.id !== id)
    );
    await props.onRemove(id);
  };

  return (
    <>
      <p className="text-zinc-600 leading-relaxed">
        {optimisticEntries.length === 0
          ? "まだタスクはありません"
          : `${optimisticEntries.length}件のタスクがあります`}
      </p>

      <ul className={className}>
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

export const TodoListPlaceholder: FC = () => {
  return (
    <>
      <div className="w-48 bg-zinc-200 animate-pulse rounded h-4" />

      <div className="space-y-2 mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-full bg-zinc-200 animate-pulse rounded h-4"
          />
        ))}
      </div>
    </>
  );
};
