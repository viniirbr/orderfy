"use client";
import { Button } from "@/components/UI/Button";
import { Fieldset } from "@/components/UI/Fieldset";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/UI/Inputs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [signInValues, setSignInValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { push } = useRouter();

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: signInValues.email,
        password: signInValues.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (result?.url) push(result?.url);
      if (result?.error) {
        if (result.error === "Invalid credentials") {
          setError("Email or password is incorrect");
        } else {
          setError("Something went wrong during login");
        }
      }
    } catch (error) {
      console.log("LOGIN ERROR", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex justify-center items-center h-[32rem] min-h-fit w-full py-14 px-4 sm:px-14 md:px-28 lg:px-64">
      <form onSubmit={login} className="flex flex-col gap-4 w-full max-w-md">
        <Fieldset label="Email" required>
          <Input
            type="email"
            onChangeInput={(e) => {
              setError(null);
              setSignInValues((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
            value={signInValues.email}
          />
        </Fieldset>
        <Fieldset label="Password" required>
          <Input
            type="password"
            value={signInValues.password}
            onChangeInput={(e) => {
              setError(null);
              setSignInValues((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
          />
        </Fieldset>
        {error && (
          <h3 className="text-center font-bold text-red-500">{error}</h3>
        )}
        <Button title="Sign In" type="submit" loading={loading} />
        <Link className="flex justify-end font-bold" href="register">
          <p>Create new account</p>
        </Link>
      </form>
    </main>
  );
}
