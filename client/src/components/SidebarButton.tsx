const SidebarButton = ({
  active,
  SVGIcon,
  title,
  onClick,
}: {
  active?: boolean;
  title: string;
  SVGIcon: React.ComponentType<React.SVGProps<SVGSVGElement> & { title?: string }>;
  onClick: () => void;
}) => {
  return (
    <div
      className={`rounded-full cursor-pointer px-6 py-2 flex items-center gap-5 mb-4 ${
        active ? "bg-neutral-200 dark:bg-gray-500" : ""
      }`}
      onClick={onClick}
    >
      <SVGIcon className="h-6 w-6 dark:stroke-gray-400" />
      <p className="font-bold text-xl">{title}</p>
    </div>
  );
};

export default SidebarButton;
