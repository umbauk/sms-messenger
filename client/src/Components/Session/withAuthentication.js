/*
 * Higher order component which makes currently logged in user
 * object available to all components in Context.
 */

import React, { useEffect, useState } from "react";
import { getUser, logOutUser } from "Utils/api";
import connect from "Utils/socket";

import AuthUserContext from "./AuthUserContext";

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const [user, setUser] = useState(null);
    const [checkingLoginState, setCheckingLoginState] = useState(true);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
      setCurrentUser();
    }, []);

    const setCurrentUser = async (newUser) => {
      try {
        if (newUser) {
          // user just logged in or registered
          // Add .id element to match user object returned from getUser()
          newUser.id = newUser._id;
          setUser(newUser);
          setSocket(connect(newUser.id));
        } else {
          // check with server if user has jwt in cookies
          const loggedInUser = await getUser();
          if (loggedInUser.success === true) {
            setUser(loggedInUser);
            setSocket(connect(loggedInUser.id));
          }
          setCheckingLoginState(false);
        }
      } catch (error) {
        setCheckingLoginState(false);
      }
    };

    const logOut = async () => {
      try {
        await logOutUser();
        setUser(null);
      } catch (error) {
        console.log("Error logging out", error);
      }
    };

    const defaultContext = {
      user,
      checkingLoginState,
      setCurrentUser,
      logOut,
      socket,
    };

    return (
      <AuthUserContext.Provider value={defaultContext}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };
  return WithAuthentication;
};

export default withAuthentication;
