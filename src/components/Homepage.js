import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Homepage() {
    const seattleLat = 47.6062;
    const seattleLong = -122.3321;

    return (
        <MapContainer center={[seattleLat, seattleLong]} zoom={15}>
            <TileLayer
                attribution='&copy; <a href="http://stamen.com">Stamen</a> contributors'
                url="https://tile.jawg.io/25a4a339-5767-4962-a2b1-bf8d2f810fd3/{z}/{x}/{y}{r}.png?access-token=D7N8aZgZjVj8nE4w8TF0Onz6DLdRKWQefLhiXFzdAMvgHR5R6YkdQmz8xR50y81d"
            />
        </MapContainer>
    );
}

export default Homepage;
