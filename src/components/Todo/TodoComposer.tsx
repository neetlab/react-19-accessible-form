"use client";

import clsx from "clsx";
import { PlusIcon } from "@heroicons/react/16/solid";
import { FC, KeyboardEventHandler, useId } from "react";
import { useFormStatus } from "react-dom";


export type TodoComposerProps = {
  readonly className?: string;
  readonly action: (fd: FormData) => Promise<void>;
};

export const TodoComposer: FC<TodoComposerProps> = (props) => {
  const { className, action } = props;

  const inputId = useId();

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && e.metaKey) {
      if (e.currentTarget.form == null) {
        throw new Error("form is not found");
      }

      e.preventDefault();
      e.currentTarget.form.requestSubmit();
    }
  }

  return (
    <form className={className} action={action}>
      <label htmlFor={inputId}>
        新しいタスクを追加
      </label>

      <div className="flex mt-1">
        <input
          id={inputId}
          type="text"
          name="title"
          placeholder=""
          className="w-full border-zinc-400 border border-r-0 px-3 py-1.5 rounded-l"
          onKeyDown={handleKeydown}
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
      <PlusIcon className="size-6" aria-label="追加" />
    </button>
  );
};
