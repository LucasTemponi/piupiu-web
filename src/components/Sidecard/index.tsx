type SideCardProps = {
  children: React.ReactNode;
};
export const SideCard = ({ children }: SideCardProps) => {
  return (
    <aside className="bg-[rgb(247,249,249)] dark:bg-zinc-800 mb-4 w-full p-4 h-min rounded-xl select-none">
      {children}
    </aside>
  );
};
