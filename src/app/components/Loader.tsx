interface Props {
  alternative?: boolean;
}

const Loader = ({ alternative }: Props) => {
  return (
    <div
      data-alternative={alternative}
      className="w-5 h-5 rounded-full border-2 border-zinc-300 border-t-secondary-500 animate-spin data-[alternative=true]:border-secondary-500 data-[alternative=true]:border-t-primary-500 ease-in-out"
    />
  );
};

export default Loader;
