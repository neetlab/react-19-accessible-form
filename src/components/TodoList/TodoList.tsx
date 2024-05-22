import { FC } from "react";
import { Entry } from "../../models/entry";
import { TodoListItem } from "./TodoListItem";
import { TodoComposer } from "./TodoComposer";

export type TodoListProps = {
  readonly entries: readonly Entry[];
  readonly compose: (fd: FormData) => Promise<void>;
};

export const TodoList: FC<TodoListProps> = (props) => {
  const { entries, compose } = props;

  return (
    <section className="border border-t-2 border-l-2 border-r-8 border-b-8 border-black rounded py-4 px-6 shadow-lg">
      <h2 className="font-serif text-3xl font-bold">Todo List</h2>

      <p className="text-zinc-600 leading-relaxed">You have {props.entries.length} items in your todo list.</p>

      <ul className="mt-4 space-y-1">
        {entries.map((entry) => (
          <TodoListItem key={entry.id} entry={entry} />
        ))}
      </ul>

      <TodoComposer className="mt-4" action={compose} />
    </section>
  );
};
