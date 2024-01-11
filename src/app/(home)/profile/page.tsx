"use client";
import StandardPage from "@/app/components/StandardPage";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

import { TbLogout } from "react-icons/tb";
import { RiVipCrownFill } from "react-icons/ri";
import { signout } from "@/services/auth/signout";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignout = async () => {
    await signout();

    router.push("/auth/login");
  };
  if (!user)
    return (
      <StandardPage headerType="noSearch">
        <></>
      </StandardPage>
    );
  return (
    <StandardPage user={user} headerType="noSearch">
      <section className="flex w-full justify-between items-center">
        <section className="flex items-center">
          <div className="max-h-[100px] max-w-[100px] rounded-full overflow-hidden mr-4">
            <Image
              src={user?.photo || ""}
              height={100}
              width={100}
              alt="Imagem de perfil"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl text-secondary-500 ">{user?.name}</span>
            <button className="text-sm underline text-start text-zinc-600">
              Alterar foto
            </button>
          </div>
        </section>
      </section>
      <h3 className="text-2xl text-secondary-500 mt-12">Conta gratuita</h3>
      <a
        href="#"
        className="flex items-center text-sm font-bold gap-2 text-primary-500 transition hover:text-primary-400 group underline mt-2"
      >
        <RiVipCrownFill
          size={20}
          className="text-primary-500 group-hover:text-primary-400 group"
        />
        Upgrade para o PRO!
      </a>

      <button
        onClick={handleSignout}
        className="flex w-fit mt-10 items-center justify-center gap-2 group text-2xl text-secondary-500"
      >
        <TbLogout className="text-danger transition group-hover:text-primary-500" />
        Sair
      </button>
    </StandardPage>
  );
};

export default ProfilePage;
