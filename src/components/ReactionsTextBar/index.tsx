type ReactTextBarProps = {
  reactions: { title: string; total: number }[];
};
export const ReactionsTextBar = ({ reactions }: ReactTextBarProps) => {
  return (
    <div className="flex gap-4">
      {reactions.map((reaction) => (
        <div key={reaction.title}>
          <span className="text-white font-bold">{reaction.total}</span>
          <span className="text-zinc-600 text-sm ml-1">{reaction.title}</span>
        </div>
      ))}
    </div>
  );
};
