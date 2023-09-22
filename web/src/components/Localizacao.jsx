import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function Localizacao(props) {
    const [currentLocation, setCurrentLocation] = useState(null);
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        // Acessar a API de geolocalização para obter a localização atual
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Erro ao obter a localização:", error);
                }
            );
        }
    }, []);

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
