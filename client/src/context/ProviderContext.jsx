import React, { createContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export const AppContext = createContext();


const ProviderContext = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser(AppContext);
  const [userInfo, setUserInfo] = useState(null);
  const [Added, SetAdded] = useState(0)
  const [coordinates, setCoordinates] = useState({ longitude: '', latitude: '' });

  useEffect(() => {
    // console.log("isSignedIn" , isSignedIn)
    // console.log("isLoaded" , isLoaded)
    const getLocation = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log(latitude , longitude)
              setCoordinates({ longitude: Number(position.coords.longitude),latitude : Number(position.coords.latitude) });

              // Now you can do whatever you want with latitude and longitude
          }, (error) => {
              console.error("Error getting location:", error.message);
          });
      } else {
          console.error("Geolocation is not supported by this browser.");
      }
  };
  getLocation();  
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
        userInfo,
        Added, SetAdded , coordinates
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ProviderContext;
