import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState();
  const [isAuthenticated, setAuthenticated] = useState(undefined);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/auth`,
          {
            withCredentials: true,
          }
        );

        setLoggedUser(response.data.user);
        setAuthenticated(true);
        console.log(response.data);
      } catch (err) {
        setLoading(false);
        setAuthenticated(false);
        console.log(err);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ loggedUser, setLoggedUser, isAuthenticated, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useLoggedUser() {
  const context = useContext(UserContext);
  return context;
}

export { UserProvider, useLoggedUser };
