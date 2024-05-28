import { Todo } from "@/components/Todo";
import { check, list, create, remove } from "./actions";

export default async function Home() {
  const entriesPromise = list();

  return (
    <div className="max-w-screen-sm mx-auto py-8">
      <Todo
        entries={entriesPromise}
        compose={create}
        check={check}
        remove={remove}
      />
    </div>
  );
}
