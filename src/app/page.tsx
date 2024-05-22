import { TodoList } from "@/components/TodoList";
import * as actions from "./actions";

import fs from "node:fs/promises";
import { fromCSV } from "@/models/entry";

export default async function Home() {
  const data = await fs.readFile("data.csv", "utf-8");
  const entries = fromCSV(data);

  return (
    <div className="max-w-screen-sm mx-auto py-8">
      <TodoList
        entries={entries}
        compose={actions.createEntry}
      />
    </div>
  );
}
