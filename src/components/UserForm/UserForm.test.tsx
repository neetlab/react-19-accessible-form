import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserForm } from "./UserForm.ok";
import { CreateUserErrors } from "@/app/actions";

test("フォームが送信される", async () => {
  const onSubmit = jest.fn();

  render(<UserForm onSubmit={onSubmit} />);

  expect(
    screen.getByRole("form", {
      name: "ユーザー登録",
      description: "ユーザー登録を行うと、サービスがもっと便利になります。",
    })
  ).toBeInTheDocument();

  await userEvent.type(
    screen.getByRole("textbox", {
      name: "メールアドレス",
      description: "ログインに使用します",
    }),
    "foo@example.com"
  );

  await userEvent.type(
    screen.getByLabelText("パスワード"),
    "password"
  );

  await userEvent.click(screen.getByRole("button", { name: "登録する" }));

  expect(onSubmit).toHaveBeenCalled();
});

test("エラーが認識される", async () => {
  const onSubmit = jest.fn(async (): Promise<CreateUserErrors> => {
    return [
      {
        field: "email",
        message: "メールアドレスが既に使用されています",
      },
      {
        field: "password",
        message: "パスワードは8文字以上で入力してください",
      }
    ]
  });

  render(<UserForm onSubmit={onSubmit} />);

  expect(
    screen.getByRole("form", {
      name: "ユーザー登録",
      description: "ユーザー登録を行うと、サービスがもっと便利になります。",
    })
  ).toBeInTheDocument();

  await userEvent.type(
    screen.getByRole("textbox", {
      name: "メールアドレス",
      description: "ログインに使用します",
    }),
    "foo@example.com"
  );
  await userEvent.type(screen.getByLabelText("パスワード"), "pass");
  await userEvent.click(screen.getByRole("button", { name: "登録する" }));

  expect(onSubmit).toHaveBeenCalled();

  // expect(
  //   screen.getByRole("alert", {
  //     name: "エラー",
  //     description: "2件のエラーがあります。フォームを修正してください。",
  //   })
  // ).toBeInTheDocument();

  expect(
    screen.getByRole("textbox", {
      name: "メールアドレス",
      description: "ログインに使用します",
    })
  ).toBeInvalid()

  expect(screen.getByLabelText("パスワード")).toBeInvalid()
});
