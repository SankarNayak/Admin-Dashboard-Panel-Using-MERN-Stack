import { createContext, useContext, useEffect, useState } from "react";

//*?Creating a context instance for authentication purposes
const AuthContext = createContext();

//? Creating a provider component to manage the authentication state and store the token
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState([]);
  const authorizationToken = `Bearer ${token}`;

  const storeToken = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  console.log(isLoggedIn);

  const logoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  //* JWT Authentication - to get the currently loggedIN user data
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        //? there is a userData object where the data of user is preserved
        console.log("user data", data.userData);
        //? here we sending the `userData` obj of `data`
        setUser(data.userData);

        setIsLoading(false);
      } else {
        console.error("Error fetching user data");
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //* To fetch the services data from the server
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("service data", data);
        setService(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getServices();
    userAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeToken,
        logoutUser,
        user,
        service,
        authorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//* Custom hook to access the authentication context value
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  //? Accessing the authentication context value using useContext hook
  const authContextValue = useContext(AuthContext);

  //? Checking if the context value exists, throwing an error if not
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }

  //? Returning the authentication context value (storeToken function in this case)
  return authContextValue;
};
