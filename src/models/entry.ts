export interface Entry {
  id: string;
  title: string;
  completed: boolean;
}

export const toCSV = (entries: Entry[]) => {
  return entries
    .map((entry) => {
      return `${entry.id},${entry.title},${entry.completed}`;
    })
    .join("\n");
};

export const fromCSV = (csv: string): Entry[] => {
  return csv
    .trim()
    .split("\n")
    .map((line) => {
      const columns = line.split(",");

      if (columns.length < 3) {
        return null;
      }

      const [id, title, completed] = columns;

      return {
        id,
        title,
        completed: completed === "true",
      } satisfies Entry;
    })
    .filter((entryOrNull): entryOrNull is Entry => entryOrNull !== null);
};
