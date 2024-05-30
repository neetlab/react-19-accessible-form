"use server";

import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { setTimeout } from "node:timers/promises";

import { Entry, fromCSV, toCSV } from "@/models/entry";
import { revalidatePath } from "next/cache";

export const list = async () => {
  await setTimeout(1000);
  const entries = await fs.readFile("data.csv", "utf-8");
  return fromCSV(entries);
};

export const create = async (fd: FormData) => {
  const title = fd.get("title") as string;

  if (title.length < 4) {
    return "タスクは4文字以上で入力してください";
  }

  const entry = {
    id: randomUUID(),
    title,
    completed: false,
  } satisfies Entry;

  const entries = await list();
  const newEntries = [...entries, entry];
  await fs.writeFile("data.csv", toCSV(newEntries));

  revalidatePath("/");
};

export const check = async (id: string) => {
  const entries = await list();
  const entry = entries.find((entry) => entry.id === id);

  if (!entry) {
    return "Entry not found";
  }

  entry.completed = !entry.completed;

  await fs.writeFile("data.csv", toCSV(entries));

  revalidatePath("/");
};

export const remove = async (id: string) => {
  const entries = await list();
  const newEntries = entries.filter((entry) => entry.id !== id);

  await fs.writeFile("data.csv", toCSV(newEntries));

  revalidatePath("/");
};
