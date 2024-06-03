import clsx from "clsx";

import { ComponentProps, FC } from "react";

export type UserFormControlProps = ComponentProps<"input"> & {
  readonly title: string;
  readonly description?: string;
  readonly errors?: readonly string[];
};

export const UserFormControl: FC<UserFormControlProps> = (props) => {
  const {
    title,
    description,
    className,
    errors = [],
    ...inputProps
  } = props;

  return (
    <div className={className}>
      <span className="block leading-relaxed">{title}</span>
      <input
        {...inputProps}
        className={clsx("border border-black rounded px-2 py-1 w-full", {
          "border-red-500": errors.length > 0,
        })}
      />

      {description && <p className="text-zinc-500 mt-1">{description}</p>}

      {errors.length > 0 && (
        <div className="text-red-500 mt-1">
          {errors.map((error) => error).join(", ")}
        </div>
      )}
    </div>
  )
};
