import React, { useContext, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet';
import { AppContext } from '../context/ProviderContext';
import { myIcon } from './Icon';
import locations from './locations';

const Map = () => {
    const { coordinates } = useContext(AppContext);
    const [showLocation, setShowLocation] = useState(false);

    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvent({
          click() {
            map.locate()
          },
          locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom(20))
          },
        })
      
        return position === null ? null : (
          <Marker position={position} icon={myIcon}>
            <Popup>Your Current Location </Popup>
          </Marker>
        )
      }

    return (
        <div>
            <MapContainer
                className='z-10'
                center={{ lat: 51.505, lng: -0.09 }}
                zoom={22}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                {locations.map(item => (
                    <Marker key={item.title} position={[item.lat, item.lng]}>
                        {item.title && (
                            <Popup>
                                <span>{item.title}</span>
                            </Popup>
                        )}
                    </Marker>
                ))}
            </MapContainer>
            <button
                className='fixed top-36 z-50 right-8 btn btn-tertiary'
                onClick={() => {
                    setShowLocation(true);
                }}
            >
                Locate Me 📍
            </button>
        </div>
    );
};

export default Map;
