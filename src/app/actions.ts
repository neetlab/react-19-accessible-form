const EXISTING_USERS = ["alice@example.com", "bob@example.com"];

export type CreateUserErrors = Array<
  | {
      field: "email";
      message: string;
    }
  | {
      field: "password";
      message: string;
    }
>;

export const createUser = async (
  fd: FormData
): Promise<CreateUserErrors | undefined> => {
  "use server";

  const email = fd.get("email") as string;
  const password = fd.get("password") as string;

  const errors: CreateUserErrors = [];

  if (EXISTING_USERS.includes(email)) {
    errors.push({
      field: "email",
      message: "既に登録されているメールアドレスです",
    });
  }

  if (password.length < 20) {
    errors.push({
      field: "password",
      message: "パスワードは20文字以上で入力してください",
    });
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push({
      field: "password",
      message: "パスワードには記号を含めてください",
    });
  }

  if (errors.length > 0) {
    return errors;
  }

  const user = {
    email,
    password
  }

  console.info(`アカウント作成: ${JSON.stringify(user)}`);
  return [];
};
