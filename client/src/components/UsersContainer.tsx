import { useState, useEffect } from "react";
import { getUsers } from "../services/tweetsService";

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
      {/* TODO: render the users */}
      <p>here the users</p>
    </div>
  );
};

export default UsersContainer;
