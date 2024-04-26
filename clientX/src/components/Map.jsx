import React from "react";
// import { MapContainer } from "react-leaflet/MapContainer";
// import { TileLayer} from 'react-leaflet/TileLayer'
// import { useMap } from 'react-leaflet/hooks'
import {
  Marker,
  MapContainer,
  Popup,
  TileLayer,
  ZoomControl,
  ScaleControl,
} from "react-leaflet";

const Map = () => {
  const position = [51.505, -0.09];

  return (
    <div className="map">
      {/* <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */}

      <MapContainer center={[45.4, -75.7]} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

export default Map;
