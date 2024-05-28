import { FC, Suspense, useOptimistic } from "react";
import { Entry } from "../../models/entry";
import { TodoComposer } from "./TodoComposer";
import { TodoList } from "./TodoList";

export type TodoProps = {
  readonly entries: Promise<readonly Entry[]>;
  readonly compose: (fd: FormData) => Promise<void>;
  readonly check: (id: string) => Promise<void>;
  readonly remove: (id: string) => Promise<void>;
};

export const Todo: FC<TodoProps> = (props) => {
  const { entries, compose, check, remove } = props;

  return (
    <section className="border border-t-2 border-l-2 border-r-8 border-b-8 border-black rounded py-4 px-6 shadow-lg">
      <h2 className="font-serif text-3xl font-bold">Todo List</h2>

      <Suspense fallback={<p>Loading...</p>}>
        <TodoList
          className="mt-4"
          entries={entries}
          onCheck={check}
          onRemove={remove}
        />
      </Suspense>

      <TodoComposer className="mt-4" action={compose} />
    </section>
  );
};
