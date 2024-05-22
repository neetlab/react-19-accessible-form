export interface Entry {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
};

export const toCSV = (entries: Entry[]) => {
  return entries.map((entry) => {
    return `${entry.id},${entry.title},${entry.completed}`;
  }).join("\n");
}

export const fromCSV = (csv: string): Entry[] => {
  return csv.split("\n").map((line) => {
    const [id, title, completed] = line.split(",");
    return {
      id,
      title,
      completed: completed === "true",
    } satisfies Entry;
  });
}
