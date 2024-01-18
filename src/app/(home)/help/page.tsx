"use client";
import StandardPage from "@/app/components/StandardPage";
import { openSans } from "@/app/fonts";
import { useAuth } from "@/hooks/useAuth";

const HelpPage = () => {
  const { user } = useAuth();
  return (
    <StandardPage user={user} headerType="noSearch">
      <article className="pt-6 pb-4 pl-4 pr-2 overflow-auto">
        <h2 className="text-secondary-500 text-3xl md:text-4xl pl-4 mb-3">
          <ul className="list-disc">
            <li>
              Como <span className="text-primary-500">usar?</span>
            </li>
          </ul>
        </h2>
        <p
          className={`${openSans.className} text-secondary-500 text-lg font-light`}
        >
          Para poder começar a criar tanto notas, como tarefas é muito simples,
          o único requisito é ter criado as categorias anteriormente, selecione
          <strong className="text-primary-500 font-bold"> Categorias</strong> no
          menu lateral e depois crie uma para notas e uma para tarefas, após
          isso você pode criar suas tarefas e notas sem problemas.
        </p>
        <h2 className="text-secondary-500 text-3xl md:text-4xl pl-4 mb-3 mt-4 md:mt-10">
          <ul className="list-disc">
            <li>
              Funcionalidades e{" "}
              <span className="text-primary-500">limitações</span>
            </li>
          </ul>
        </h2>
        <p
          className={`${openSans.className} text-secondary-500 text-lg mb-3 font-light`}
        >
          É possível criar inúmeras notas e tarefas, ligadas a diferentes
          categorias, filtrá-las em busca por nome e categoria respectivamente,
          para o uso gratuito notas são limitadas ao máximo de 700 caracteres, e
          em seu conteúdo não é interpretado códigos como XML ou HTML, tais
          funcionalidades são objetivos de serem implementados futuramente.
        </p>
        <p
          className={`${openSans.className} text-secondary-500 text-lg font-light`}
        >
          As tarefas podem ser filtradas por alguns filtros de tempo, com
          possibilidade de verificar quais já estão atrasadas e também as já
          finalizadas, todas as ações dentro da aplicação são executadas em
          tempo real, sem possibilidade de retroceder.
        </p>
      </article>
    </StandardPage>
  );
};

export default HelpPage;
