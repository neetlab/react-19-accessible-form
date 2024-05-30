"use client";

import { FC, useActionState } from "react";
import clsx from "clsx";

import { CreateUserErrors } from "@/app/actions";

export type UserFormProps = {
  readonly onSubmit: (formData: FormData) => Promise<CreateUserErrors>;
};

export const UserForm: FC<UserFormProps> = (props) => {
  const { onSubmit } = props;

  const [errors, submitAction] = useActionState<CreateUserErrors, FormData>(
    async (_previousState, formData) => {
      return await onSubmit(formData);
    },
    []
  );

  const emailErrors = errors.filter((error) => error.field === "email");
  const passwordErrors = errors.filter((error) => error.field === "password");

  return (
    <form action={submitAction} className="border border-black rounded p-4">
      <h2 className="text-2xl leading-tight font-bold">ユーザー登録</h2>

      <p className="text-zinc-500 leading-relaxed">
        ユーザー登録を行うと、サービスがもっと便利になります。
      </p>

      <div className="space-y-2 mt-4">
        <div>
          <span className="block leading-relaxed">メールアドレス</span>
          <input
            type="email"
            name="email"
            required
            className={clsx("border border-black rounded px-2 py-1 w-full", {
              "border-red-500": emailErrors.length > 0,
            })}
          />
          {emailErrors.length > 0 && (
            <div className="text-red-500">
              {emailErrors.map((error) => error.message).join(", ")}
            </div>
          )}
        </div>

        <div>
          <span className="block leading-relaxed">パスワード</span>
          <input
            type="password"
            name="password"
            required
            className={clsx("border border-black rounded px-2 py-1 w-full", {
              "border-red-500": passwordErrors.length > 0,
            })}
          />
          {passwordErrors.length > 0 && (
            <div className="text-red-500">
              {passwordErrors.map((error) => error.message).join(", ")}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button type="submit" className="bg-black text-white rounded px-4 py-2">
          登録する
        </button>
      </div>
    </form>
  );
};
