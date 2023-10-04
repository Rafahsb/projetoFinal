import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function Localizacao(props) {
    const [currentLocation, setCurrentLocation] = useState({
        lat: Number(props.lat),
        lng: Number(props.lng),
    });
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const mapContainerStyle = {
        width: "100%",
        height: "500px",
    };

    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
            {currentLocation ? (
                <GoogleMap
                    center={currentLocation}
                    zoom={15}
                    mapContainerStyle={mapContainerStyle}
                >
                    <Marker position={currentLocation} />
                </GoogleMap>
            ) : (
                <p>Obtendo a localização atual...</p>
            )}
        </LoadScript>
    );
}

export default Localizacao;
