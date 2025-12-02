type UserActionButtonProps = {
  user: {
    avatar_url: string | null;
  };
  children: React.ReactNode;
};

const UserActionButton = ({ user, children }: UserActionButtonProps) => {
  return (
    <div className="mb-8 mt-8 flex justify-between items-center">
      <img className="w-32 h-32 rounded-full" src={user.avatar_url || "/src/assets/profile.svg"} alt="avatar" />
      <div>{children}</div>
    </div>
  );
};

export default UserActionButton;
