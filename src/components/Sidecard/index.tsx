type SideCardProps = {
  children: React.ReactNode;
};
export const SideCard = ({ children }: SideCardProps) => {
  return (
    <aside className="bg-zinc-800 mb-4 w-full p-4 h-min rounded-xl select-none">
      {children}
    </aside>
  );
};
