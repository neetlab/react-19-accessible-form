"use client"

import { FC, useActionState, useId, useState } from "react";

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

        <button type="submit" className="bg-black text-white px-3 py-1.5 rounded-r">Add</button>
      </div>
    </form>
  );
}
