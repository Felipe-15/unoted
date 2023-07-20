# Unoted

O projeto consiste em um gerenciador de tarefas e notas semelhantes a post-it's, com um design intuitivo e de fácil uso. Para banco de dados, autenticação, etc foi usado Firebase, sendo o Firestore o banco de dados, com o Google Auth e autentitação por meio de email e senha.

[Prototipação no Figma](https://www.figma.com/file/x5KAYMhbz6hKTjiUCM7c6X/unoted?type=design&node-id=0%3A1&mode=design&t=X4vRADCPwy1r3dvz-1) || [Site em produção](https://unoted.vercel.app/)

## Tecnologias

- NextJS 13
- Tailwind
- React Hot Toast
- Firebase
- TypeScript
- StoryBook
- Jest

## Como executar

Ao clonar, execute um `npm i` para ter todas as dependências necessárias para o projeto.

Após isso, é necessário configurar suas chaves do Firebase no seu `.env.local` conforme as variáveis presentes no arquivo `src/config/firebase.ts`

Com isso você já pode executar o projeto com um simples `npm run dev`, ou fazer uma build rápida com `npm run build` e executá-la logo em seguida com `npm start`
