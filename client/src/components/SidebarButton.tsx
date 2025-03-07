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
      className={`rounded-full px-6 py-2 flex align-middle gap-5 mb-4 ${
        active ? "bg-neutral-200 dark:bg-gray-500" : ""
      }`}
      onClick={onClick}
    >
      <div>
        <SVGIcon className="h-6 w-6 dark:stroke-gray-400" />
      </div>
      <p className="font-bold text-xl">{title}</p>
    </div>
  );
};

export default SidebarButton;
