"use client";
import { Button } from "@/components/UI/Button";
import { Fieldset } from "@/components/UI/Fieldset";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/UI/Inputs";
import Link from "next/link";

export default function SignIn() {
  const [signInValues, setSignInValues] = useState({
    email: "",
    password: "",
  });

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await signIn("credentials", {
      email: signInValues.email,
      password: signInValues.password,
      redirect: true,
      callbackUrl: "/",
    });
  }

  return (
    <main className="flex justify-center items-center h-[32rem] min-h-fit w-full py-14 px-4 sm:px-14 md:px-28 lg:px-64">
      <form onSubmit={login} className="flex flex-col gap-4 w-full max-w-md">
        <Fieldset label="Email" required>
          <Input
            type="email"
            onChangeInput={(e) =>
              setSignInValues((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            value={signInValues.email}
          />
        </Fieldset>
        <Fieldset label="Password" required>
          <Input
            type="password"
            value={signInValues.password}
            onChangeInput={(e) =>
              setSignInValues((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </Fieldset>
        <Button title="Sign In" type="submit" />
        <Link className="flex justify-end font-bold" href="register">
          <p>Create new account</p>
        </Link>
      </form>
    </main>
  );
}
