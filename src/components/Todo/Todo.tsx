"use client";

import { FC, Suspense, useActionState, useId, useRef } from "react";
import { Entry } from "../../models/entry";
import { TodoComposer } from "./TodoComposer";
import { TodoList, TodoListPlaceholder } from "./TodoList";

export type TodoProps = {
  readonly entries: Promise<readonly Entry[]>;
  readonly compose: (fd: FormData) => Promise<string | undefined>;
  readonly check: (id: string) => Promise<void>;
  readonly remove: (id: string) => Promise<void>;
};

export const Todo: FC<TodoProps> = (props) => {
  const { entries, compose, check, remove } = props;

  const headingId = useId();
  const listRef = useRef<HTMLDivElement | null>(null);

  const [error, submitAction] = useActionState<string | undefined, FormData>(
    async (_, formData) => {
      const error = await compose(formData);
      if (error) {
        return error;
      }
      return;
    },
    undefined,
  )

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="text-2xl font-bold">タスク一覧</h2>

      <TodoComposer className="mt-4" action={submitAction} error={error} />

      <div className="mt-4">
        <Suspense fallback={<TodoListPlaceholder />}>
          <TodoList
            ref={listRef}
            entries={entries}
            onCheck={check}
            onRemove={remove}
          />
        </Suspense>
      </div>
    </section>
  );
};
