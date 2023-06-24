export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const stringData = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  let replaced: any = stringData.replace(/(de\s)|\./g, "").split(" ");

  replaced[1] = replaced[1].slice(0, 1).toUpperCase() + replaced[1].slice(1);

  replaced = `${replaced[0]} ${replaced[1]}, ${replaced[2]}`;

  return replaced;
};
