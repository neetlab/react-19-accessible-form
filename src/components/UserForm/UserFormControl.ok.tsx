import clsx from "clsx";

import { ComponentProps, FC, useId } from "react";

export type UserFormControlProps = ComponentProps<"input"> & {
  readonly title: string;
  readonly description?: string;
  readonly errors?: readonly string[];
};

export const UserFormControl: FC<UserFormControlProps> = (props) => {
  const { title, description, className, errors = [], ...inputProps } = props;

  const labelId = useId();
  const descriptionId = useId();
  const errorId = useId();

  return (
    <div className={className}>
      <label htmlFor={labelId} className="block leading-relaxed">
        {title}
      </label>

      <input
        {...inputProps}
        id={labelId}
        className={clsx("border border-black rounded px-2 py-1 w-full", {
          "border-red-500": errors.length > 0,
        })}
        aria-describedby={descriptionId}
        aria-errormessage={errorId}
        aria-invalid={errors.length > 0}
      />

      {description && <p id={descriptionId} className="text-zinc-500 mt-1">{description}</p>}

      {errors.length > 0 && (
        <div id={errorId} className="text-red-500 mt-1">
          {errors.map((error) => error).join(", ")}
        </div>
      )}
    </div>
  );
};
