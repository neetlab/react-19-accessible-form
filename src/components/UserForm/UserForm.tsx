"use client";

import { FC, useActionState } from "react";

import { CreateUserErrors } from "@/app/actions";
import { UserFormControl } from "./UserFormControl";

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

  const emailErrors = errors
    .filter((error) => error.field === "email")
    .map((error) => error.message);

  const passwordErrors = errors
    .filter((error) => error.field === "password")
    .map((error) => error.message);

  return (
    <form action={submitAction} className="border border-black rounded p-4">
      <h2 className="text-2xl leading-tight font-bold">ユーザー登録</h2>

      <p className="text-zinc-500 leading-relaxed">
        ユーザー登録を行うと、サービスがもっと便利になります。
      </p>

      <div className="space-y-2 mt-4">
        <UserFormControl
          title="メールアドレス"
          description="ログインに使用します"
          name="email"
          required
          errors={emailErrors}
        />

        <UserFormControl
          title="パスワード"
          description="8文字以上で入力してください"
          name="password"
          type="password"
          required
          errors={passwordErrors}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button type="submit" className="bg-black text-white rounded px-4 py-2">
          登録する
        </button>
      </div>
    </form>
  );
};
