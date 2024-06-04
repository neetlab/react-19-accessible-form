import { useFormStatus } from "react-dom";

export const SignupFormButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-black text-white rounded px-4 py-2"
      disabled={pending}
    >
      登録する
    </button>
  );
};
