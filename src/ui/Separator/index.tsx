type Props = {
  text?: string;
};

export const Separator = ({ text }: Props) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">{text && <span className="bg-background px-2 text-muted-foreground">{text}</span>}</div>
    </div>
  );
};
