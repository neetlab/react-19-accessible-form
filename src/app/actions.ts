"use server";

import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";

import { Entry, fromCSV, toCSV } from "@/models/entry";

export const createEntry = async (fd: FormData) => {
  const title = fd.get("title") as string;

  if (title.length === 0) {
    throw new Error("Title is required");
  }

  const entry = {
    id: randomUUID(),
    title,
    completed: false,
  } satisfies Entry;

  const entries = await fs.readFile("data.csv", "utf-8")
  const newEntries = [...fromCSV(entries), entry];

  await fs.writeFile("data.csv", toCSV(newEntries));
}

