"use client";

import { CreateUserErrors } from "@/app/actions";
import { FC, useActionState, useId } from "react";
import { UserFormControl } from "./UserFormControl.ok";

export type UserFormProps = {
  readonly onSubmit: (formData: FormData) => Promise<CreateUserErrors>;
};

export const UserForm: FC<UserFormProps> = (props) => {
  const { onSubmit } = props;

  const headingId = useId();
  const descriptionid = useId();

  const [errors, submitAction] = useActionState<CreateUserErrors, FormData>(
    async (_, formData) => {
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

      {errors.length > 0 && (
        <div
          role="alert"
          className="mt-2 bg-red-100 text-red-500 py-2 px-3 rounded"
        >
          {errors.length}件のエラーがあります。フォームを修正してください。
        </div>
      )}

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
