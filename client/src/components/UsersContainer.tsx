import { useState, useEffect } from "react";
import { getUsers } from "../services/userService";

const UsersContainer = () => {
  const [users, setUsers] = useState([]);
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
        {users.map((user) => {
          return (
            <div key={user.id}>
              <p>user:</p>
              <p>email: {user.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersContainer;
