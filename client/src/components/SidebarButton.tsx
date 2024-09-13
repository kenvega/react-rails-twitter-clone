const SidebarButton = ({
  active,
  SVGIcon,
  title,
  onClick,
}: {
  active?: boolean;
  SVGIcon: string;
  title: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={`rounded-full px-6 py-2 flex align-middle gap-5 mb-4 ${active ? "bg-neutral-200" : ""}`}
      onClick={onClick}
    >
      <div>
        <img src={SVGIcon} alt="An SVG icon" width={32} />
      </div>
      <p className="font-bold text-xl">{title}</p>
    </div>
  );
};

export default SidebarButton;
