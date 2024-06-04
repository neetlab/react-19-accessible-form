import clsx from "clsx";

import { ComponentProps, FC } from "react";

export type SignupFormControlProps = ComponentProps<"input"> & {
  readonly title: string;
  readonly description?: string;
  readonly errors?: readonly string[];
};

export const SignupFormControl: FC<SignupFormControlProps> = (props) => {
  const { title, description, className, errors = [], ...inputProps } = props;

  return (
    <div className={className}>
      <span className="block leading-relaxed">{title}</span>
      {description && <p className="text-zinc-500">{description}</p>}

      <input
        {...inputProps}
        className={clsx("border border-black rounded px-2 py-1 w-full", {
          "border-red-500": errors.length > 0,
        })}
      />

      {errors.length > 0 && (
        <div className="text-red-500 mt-1">
          {errors.map((error) => error).join(", ")}
        </div>
      )}
    </div>
  );
};
