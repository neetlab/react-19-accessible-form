import { FC, Suspense, useOptimistic } from "react";
import { Entry } from "../../models/entry";
import { TodoComposer } from "./TodoComposer";
import { TodoList, TodoListPlaceholder } from "./TodoList";

export type TodoProps = {
  readonly entries: Promise<readonly Entry[]>;
  readonly compose: (fd: FormData) => Promise<void>;
  readonly check: (id: string) => Promise<void>;
  readonly remove: (id: string) => Promise<void>;
};

export const Todo: FC<TodoProps> = (props) => {
  const { entries, compose, check, remove } = props;

  return (
    <section className="border border-black rounded py-4 px-6 shadow-lg">
      <h2 className="text-2xl font-bold">今日のタスク</h2>

      <Suspense fallback={<TodoListPlaceholder />}>
        <TodoList
          className="mt-2"
          entries={entries}
          onCheck={check}
          onRemove={remove}
        />
      </Suspense>

      <TodoComposer className="mt-4" action={compose} />
    </section>
  );
};
