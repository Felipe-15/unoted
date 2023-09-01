import { googleSignin } from "@/services/auth/googleSignin";
import { signin } from "@/services/auth/signin";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function usePage(router: any) {
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

  const handleLogin = async (data: any) => {
    try {
      await signin(data.email, data.password);

      router.push("/notes");
    } catch (err) {
      toast.error("Erro ao efetuar login, verifique seus dados!");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await googleSignin();

      router.push("/notes");
    } catch (err) {
      toast.error("Erro ao efetuar login pelo Google, tente novamente!");
    }
  };

  return {
    errors,
    isSubmitting,
    signin,
    register,
    clearErrors,
    handleGoogleAuth,
    handleLogin,
    handleSubmit,
  };
}
