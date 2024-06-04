import { SignupForm } from "@/components/SignupForm/SignupForm";
import { createUser } from "./actions";

export default async function Home() {
  return (
    <div className="max-w-screen-sm mx-auto py-8">
      <SignupForm onSubmit={createUser} />
    </div>
  );
}
