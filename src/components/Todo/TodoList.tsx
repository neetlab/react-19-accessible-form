"use client";

import { FC, Ref, RefAttributes, RefObject, use, useOptimistic } from "react";
import { Entry } from "../../models/entry";
import { TodoListItem } from "./TodoListItem";
import clsx from "clsx";

export type TodoListProps = RefAttributes<HTMLDivElement> & {
  readonly className?: string;
  readonly entries: Promise<readonly Entry[]>;
  readonly onCheck: (id: string) => Promise<void>;
  readonly onRemove: (id: string) => Promise<void>;
};

export const TodoList: FC<TodoListProps> = (props) => {
  const { className, ref } = props;

  const entries = use(props.entries);
  const [optimisticEntries, setOptimisticEntries] = useOptimistic(entries);

  const handleRemove = async (id: string) => {
    setOptimisticEntries((entries) =>
      entries.filter((entry) => entry.id !== id)
    );
    await props.onRemove(id);
  };

  return (
    <div ref={ref}>
      <p>
        {optimisticEntries.length === 0 ? (
          "まだタスクはありません"
        ) : (
          <>
            <span className="tabular-nums">{optimisticEntries.length}件</span>
            のタスク
          </>
        )}
      </p>

      {optimisticEntries.length > 0 && (
        <ul
          className={clsx(
            "mt-1 border border-zinc-300 rounded divide-y divide-zinc-300",
            className
          )}
        >
          {optimisticEntries.map((entry) => (
            <li key={entry.id}>
              <TodoListItem
                entry={entry}
                onCheck={() => props.onCheck(entry.id)}
                onRemove={() => handleRemove(entry.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
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
