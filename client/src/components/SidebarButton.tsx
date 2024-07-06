const SidebarButton = ({
  active,
  SVGIcon,
  title,
  goTo
}: {
  active?: boolean;
  SVGIcon: string;
  title: string;
  goTo: () => {}
}) => {
  return (
    <div
      className={`rounded-full px-6 py-2 flex align-middle gap-5 mb-4 ${
        active ? "bg-neutral-200" : ""
      }`}
      onClick={goTo}
    >
      <div>
        <img src={SVGIcon} alt="Your SVG" width={32} />
      </div>
      <p className="font-bold text-xl">{title}</p>
    </div>
  );
};

export default SidebarButton;
