"use client";

import clsx from "clsx";
import { PlusIcon, ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { FC, KeyboardEventHandler, useId } from "react";
import { useFormStatus } from "react-dom";


export type TodoComposerProps = {
  readonly className?: string;
  readonly error?: string;
  readonly action: (fd: FormData) => void;
};

export const TodoComposer: FC<TodoComposerProps> = (props) => {
  const { className, action, error } = props;

  const inputId = useId();
  const errorId = useId();

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
      <label htmlFor={inputId} className="sr-only">
        新しいタスクを追加
      </label>

      <div className="flex">
        <input
          id={inputId}
          type="text"
          name="title"
          placeholder="例: 部屋の掃除をする"
          className="w-full p-2 border-zinc-300 border border-r-0 rounded rounded-r-none"
          onKeyDown={handleKeydown}
          aria-invalid={error != null}
          aria-describedby={errorId}
        />
        <AddButton />
      </div>

      <div role="alert" id={errorId}>
        {
          error != null && (
            <p className="mt-1 text-red-500 text-sm">
              <ExclamationCircleIcon className="size-4 inline-block mr-1" aria-hidden />
              {error}
            </p>
          )
        }
      </div>
    </form>
  );
};

export const AddButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx("bg-black text-white p-2 rounded rounded-l-none", {
        "cursor-not-allowed bg-black/80": pending,
      })}
      aria-label="追加"
      aria-disabled={pending}
    >
      <PlusIcon className="size-6"/>
    </button>
  );
};
