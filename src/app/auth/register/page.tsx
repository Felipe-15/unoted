"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { openSans } from "@/app/fonts";

import { signup } from "@/services/auth/signup";
import { googleSignin } from "@/services/auth/googleSignin";

import Input from "@/app/components/Input";
import Button from "@/app/components/Button";

import { AiOutlineGoogle } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { MdPassword } from "react-icons/md";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const passWatch = watch("password");

  const handleRegister = async (data: any) => {
    try {
      await signup(data.email, data.password, data.name);

      router.push("/notes");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await googleSignin();
      router.push("/notes");
    } catch (err) {}
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
              ? handleSubmit(handleRegister, () =>
                  setTimeout(clearErrors, 5000)
                )
              : () => null
          }
          className="gap-4 flex flex-col"
        >
          <Input
            registerField={{
              ...register("name", {
                required: { value: true, message: "O nome é obrigatório!" },
              }),
            }}
            icon={AiOutlineUser}
            placeholder="Nome"
            error={errors.name?.message}
          />
          <Input
            registerField={{
              ...register("email", {
                required: { value: true, message: "O email é obrigatório!" },
              }),
            }}
            icon={MdAlternateEmail}
            type="email"
            placeholder="Email"
            error={errors.email?.message}
          />
          <Input
            registerField={{
              ...register("password", {
                required: { value: true, message: "Senha é obrigatória!" },
              }),
            }}
            icon={FaLock}
            type="password"
            placeholder="Senha"
            visibility
            error={errors.password?.message}
          />
          <Input
            registerField={{
              ...register("confirmPassword", {
                required: {
                  value: true,
                  message: "É necessário confirmar a senha!",
                },
                validate: (value) =>
                  value === passWatch || "As senhas devem ser iguais!",
              }),
            }}
            icon={MdPassword}
            placeholder="Confirme a senha"
            type="password"
            error={errors.confirmPassword?.message}
          />
          <div className="pt-2 flex flex-col gap-2">
            <Button text="Criar conta" onClick={() => null} />
            <span
              className={`${openSans.className} text-secondary-500 font-normal text-sm text-center`}
            >
              Já tem uma conta?{" "}
              <Link
                href="/auth/login"
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
            Criar com
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

export default RegisterPage;
