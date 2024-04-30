import React, { createContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export const AppContext = createContext();


const ProviderContext = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser(AppContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    console.log("isSignedIn" , isSignedIn)
    console.log("isLoaded" , isLoaded)
    if (isLoaded && isSignedIn) {
      setUserInfo(user);
      console.log("signed in",user.primaryEmailAddress.emailAddress)
    } else {    
      setUserInfo(null);
    }
  }, [isSignedIn, isLoaded, user]);

  return (
    <AppContext.Provider
      value={{
        userInfo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ProviderContext;
