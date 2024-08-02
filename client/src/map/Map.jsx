import React, { useContext, useEffect, useState, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { AppContext } from '../context/ProviderContext';
import { myIcon } from './Icon';
import axios from 'axios';
import SideBar from './SideBar';

const Map = () => {
  const { coordinates } = useContext(AppContext);
  const [spacesData, setSpacesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Added, userInfo } = useContext(AppContext);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://parkez-server.vercel.app/spaces/all");
        setSpacesData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data ", {
          position: "top-center"
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [Added]);

  const onFocusMarker = (coords) => {
    console.log('onFocusMarker called with coords:', coords);
    if (mapRef.current) {
      console.log('Map instance:', mapRef.current);
      mapRef.current.flyTo(coords, 18, {
        animate: true,
        duration: 1.5,
      });
    }
  };

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMap();

    useEffect(() => {
      mapRef.current = map;
      // console.log('Map instance set:', map);
    }, [map]);

    useMapEvent({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={myIcon}>
        <Popup>Your Current Location</Popup>
      </Marker>
    );
  }

  return (
    <div className='w-full flex'>
      <SideBar data={spacesData} onFocusMarker={onFocusMarker} loading={loading} />
      <MapContainer
        className='z-10 w-3/4'
        center={{ lat: 23.25, lng: 77.41 }}
        zoom={13} closePopupOnClick={false}  minZoom={6} 
        scrollWheelZoom={true}
        whenCreated={(mapInstance) => {
          console.log('Map created:', mapInstance);
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        {spacesData.map(elem => (
          <Marker key={elem._id} position={[elem.location.latitude, elem.location.longitude]}>
            {elem.location.address && (
              <Popup>
                <span>{elem.location.address}</span>
              </Popup>
            )}
          </Marker>
        ))}
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
          <button className='bg-red-300 text-black font-lg p-2 rounded'>Show my 📍</button>
        </div>
      </MapContainer>
    </div>
  );
};

export default Map;
