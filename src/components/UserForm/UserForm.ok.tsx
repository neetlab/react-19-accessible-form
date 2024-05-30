"use client";

import { CreateUserErrors } from "@/app/actions";
import clsx from "clsx";
import { FC, useActionState, useId } from "react";

export type UserFormProps = {
  readonly onSubmit: (formData: FormData) => Promise<CreateUserErrors>;
};

export const UserForm: FC<UserFormProps> = (props) => {
  const { onSubmit } = props;

  const headingId = useId();
  const descriptionid = useId();
  const emailId = useId();
  const passwordId = useId();

  const [errors, submitAction] = useActionState<CreateUserErrors, FormData>(
    async (_, formData) => {
      return await onSubmit(formData);
    },
    []
  );

  const emailErrors = errors.filter((error) => error.field === "email");
  const passwordErrors = errors.filter((error) => error.field === "password");

  return (
    <form
      action={submitAction}
      aria-labelledby={headingId}
      aria-describedby={descriptionid}
      className="border border-black rounded p-4"
    >
      <h2 id={headingId} className="text-2xl leading-tight font-bold">
        ユーザー登録
      </h2>

      <p id={descriptionid} className="text-zinc-500 leading-relaxed">
        ユーザー登録を行うと、サービスがもっと便利になります。
      </p>

      {
        errors.length > 0 && (
          <div role="alert" className="mt-2 bg-red-100 text-red-500 py-2 px-3 rounded">
            {errors.length}件のエラーがあります。フォームを修正してください。
          </div>
        )
      }

      <div className="space-y-2 mt-4">
        <div>
          <label htmlFor={emailId} className="block leading-relaxed">
            メールアドレス (必須)
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            required
            className={clsx("border border-black rounded px-2 py-1 w-full", {
              "border-red-500": emailErrors.length > 0,
            })}
            aria-invalid={emailErrors.length > 0}
            aria-errormessage={`${emailId}-error`}
          />
          {emailErrors.length > 0 && (
            <div role="alert" className="text-red-500" id={`${emailId}-error`}>
              {emailErrors.map((error) => error.message).join(", ")}
            </div>
          )}
        </div>

        <div>
          <label htmlFor={passwordId} className="block leading-relaxed">
            パスワード (必須)
          </label>
          <input
            id={passwordId}
            type="password"
            name="password"
            required
            className={clsx("border border-black rounded px-2 py-1 w-full", {
              "border-red-500 forced-colors:text-[AccentColorText]": passwordErrors.length > 0,
            })}
            aria-invalid={passwordErrors.length > 0}
            aria-errormessage={`${passwordId}-error`}
          />
          {passwordErrors.length > 0 && (
            <div
              role="alert"
              className="text-red-500 forced-colors:text-[AccentColorText]"
              id={`${passwordId}-error`}
            >
              {passwordErrors.map((error) => error.message).join(", ")}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="bg-black text-white rounded px-4 py-2 forced-colors:bg-[ButtonFace] forced-colors:border forced-colors:border-[ButtonBorder] forced-colors:text-[ButtonText]"
        >
          登録する
        </button>
      </div>
    </form>
  );
};
