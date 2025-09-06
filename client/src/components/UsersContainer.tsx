import { useState, useEffect } from "react";
import { getUsers } from "../services/userService";
import { User } from "../interfaces/User";

const UsersContainer = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = () => {
    return getUsers()
      .then((users) => {
        console.log("response users: ", users);
        setUsers(users);
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoadingUsers(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div>
        {users.map((user) => (
          <div key={user.id} className="flex justify-around items-center pt-4 pb-4 border-b border-sky-200">
            <div className="flex items-center">
              <a className="mr-2">
                <img
                  src={user.avatar_url || "/src/assets/profile.svg"}
                  alt={`${user.display_name} avatar`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </a>
              <div>
                <div>{user.display_name}</div>
                <div className="text-gray-500">@{user.username}</div>
              </div>
            </div>

            <div>
              <a className="px-4 py-1 border border-sky-500 text-sky-600 rounded-full hover:bg-sky-50">Go to profile</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersContainer;
