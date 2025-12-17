import LoadingIcon from "../assets/loading.svg?react";

type TweetActionButtonProps = {
  active: boolean;
  loading: boolean;
  count?: number;
  activeIcon: string;
  inactiveIcon: string;
  onClick: () => void;
  alt: string;
};

const TweetActionButton = ({
  active,
  loading,
  count,
  activeIcon,
  inactiveIcon,
  alt,
  onClick,
}: TweetActionButtonProps) => {
  return (
    <div className="flex items-center">
      <button disabled={loading} className="flex cursor-pointer" onClick={onClick}>
        <img src={active ? activeIcon : inactiveIcon} className={`w-4 mr-2 ${loading ? "opacity-50" : ""}`} alt={alt} />
        {count !== undefined && <span>{count}</span>}
      </button>
      {loading ? <LoadingIcon className="animate-spin w-3 h-3 ml-3" /> : <div className="w-3 h-3 ml-3" />}
    </div>
  );
};

export default TweetActionButton;
