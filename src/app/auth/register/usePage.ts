import { googleSignin } from "@/services/auth/googleSignin";
import { signup } from "@/services/auth/signup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function usePage(router: any) {
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

  const passWatch = watch("password");

  const handleRegister = async (data: any) => {
    try {
      await signup(data.email, data.password, data.name.trim());

      router.push("/notes");
    } catch (err) {
      toast.error("Ocorreu algum erro interno, tente novamente!");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await googleSignin();
      router.push("/notes");
    } catch (err) {
      toast.error("Ocorreu algum erro interno, tente novamente!");
    }
  };

  return {
    errors,
    isSubmitting,
    passWatch,
    clearErrors,
    handleGoogleAuth,
    handleRegister,
    register,
    handleSubmit,
  };
}
