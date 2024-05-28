"use client";

import clsx from "clsx";
import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { FC, useId, useState } from "react";
import { useFormStatus } from "react-dom";

export type TodoComposerProps = {
  readonly className?: string;
  readonly action: (fd: FormData) => Promise<void>;
};

export const TodoComposer: FC<TodoComposerProps> = (props) => {
  const { className, action } = props;

  const inputId = useId();
  const [title, setTitle] = useState("");

  return (
    <form className={className} action={action}>
      <label htmlFor={inputId} className="font-serif">
        Add a new todo item
      </label>

      <div className="flex mt-1">
        <input
          name="title"
          id={inputId}
          type="text"
          placeholder=""
          className="w-full border-black border px-3 py-1.5 rounded-l"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <AddButton />
      </div>
    </form>
  );
};

export const AddButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx("bg-black text-white px-3 py-1.5 rounded-r", {
        "cursor-not-allowed bg-black/80": pending,
      })}
      aria-disabled={pending}
    >
      <PlusIcon className="size-6" />
    </button>
  );
};
