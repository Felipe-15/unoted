"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { openSans } from "@/app/fonts";

import Input from "@/app/components/Input";
import Button from "@/app/components/Button";

import { AiOutlineGoogle } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { signin } from "@/services/auth/signin";
import { googleSignin } from "@/services/auth/googleSignin";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleLogin = async (data: any) => {
    try {
      await signin(data.email, data.password);

      router.push("/notes");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await googleSignin();

      router.push("/notes");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-secondary-500 text-center text-4xl mb-6">
        <span className="text-primary-500">u</span>noted
      </h1>
      <div className="max-w-[300px] rounded-md bg-background-800 p-4">
        <form
          onSubmit={
            !isSubmitting
              ? handleSubmit(handleLogin, () => setTimeout(clearErrors, 5000))
              : () => null
          }
          className="gap-4 flex flex-col"
        >
          <Input
            registerField={{
              ...register("email", {
                required: { value: true, message: "O email é obrigatório!" },
              }),
            }}
            icon={MdAlternateEmail}
            type="email"
            placeholder="Email"
          />
          <Input
            registerField={{
              ...register("password", {
                required: { value: true, message: "A senha é obrigatória!" },
              }),
            }}
            icon={FaLock}
            type="password"
            placeholder="Senha"
            visibility
          />

          <div className="pt-2 flex flex-col gap-2">
            <Button text="Entrar" onClick={() => null} />
            <span
              className={`${openSans.className} text-secondary-500 font-normal text-sm text-center`}
            >
              Ainda não tem conta?{" "}
              <Link
                href="/auth/register"
                className="text-primary-500 transition hover:text-primary-400"
              >
                Clique aqui!
              </Link>
            </span>
          </div>
        </form>
        <div className="flex w-full px-4 justify-center items-center mt-4">
          <div className="w-full bg-gray-500 h-[1px]"></div>
          <span className={`${openSans.className} text-gray-500 text-sm mx-4`}>
            ou
          </span>
          <div className="w-full bg-gray-500 h-[1px]"></div>
        </div>
        <div className="flex gap-4 w-full justify-center items-center mt-4">
          <span className={`${openSans.className} text-gray-500 font-normal`}>
            Entrar com
          </span>
          <div className="w-[120px]">
            <Button
              outline
              text="Google"
              icon={AiOutlineGoogle}
              onClick={handleGoogleAuth}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
