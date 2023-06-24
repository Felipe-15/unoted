export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const stringData = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return stringData.replace(/(\d+)\/(\d+)\/(\d+)/, "$1 de $2, $3");
};
