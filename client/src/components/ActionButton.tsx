type ActionButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const ActionButton = ({ onClick, children, className }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`border border-sky-500 rounded-full px-3 py-2 text-sky-500 hover:bg-sky-400 hover:text-blue-800 ${className}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
