import { UserForm } from "@/components/UserForm/UserForm";
import { createUser } from "./actions";

export default async function Home() {
  return (
    <div className="max-w-screen-sm mx-auto py-8">
      <UserForm onSubmit={createUser} />
    </div>
  );
}
