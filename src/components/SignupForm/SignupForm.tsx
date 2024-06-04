"use client"

import { FC, useActionState } from "react";

import { SignupFormControl } from "./SignupFormControl";
import { SignupFormButton } from "./SignupFormButton";

export type SignupErrors = Array<
  | { field: "email"; message: string }
  | { field: "password"; message: string }
>;


export type SignupFormProps = {
  onSubmit: (formData: FormData) => Promise<SignupErrors>;
};

export const SignupForm: FC<SignupFormProps> = (props) => {
  const { onSubmit } = props;

  const [errors, submitAction] = useActionState<SignupErrors, FormData>(async (_previousState, formData) => {
    return await onSubmit(formData);
  }, []);

  const emailErrors = errors.filter((error) => error.field === "email").map((error) => error.message);
  const passwordErrors = errors.filter((error) => error.field === "password").map((error) => error.message);

  return (
    <form action={submitAction} className="border border-black rounded p-4 bg-white">
      <h2 className="text-2xl leading-tight font-bold">ユーザー登録</h2>

      <p className="text-zinc-500 leading-relaxed">
        ユーザー登録を行うと、サービスがもっと便利になります。
      </p>

      <div className="space-y-2 mt-4">
        <SignupFormControl title="メールアドレス" description="ログインに使用します" name="email" required errors={emailErrors} />
        <SignupFormControl title="パスワード" description="8文字以上で入力してください" name="password" type="password" required errors={passwordErrors} />
      </div>

      <div className="mt-4 flex justify-end">
        <SignupFormButton />
      </div>
    </form>
  );
};
