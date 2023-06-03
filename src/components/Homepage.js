import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

function Homepage() {
    const seattleLatLong = [47.609687, -122.333131]; // Seattle coordinates
    const newYorkLatLong = [47.609687, -122.20]; // New York coordinates

    const routingUrl = `https://api.jawg.io/routing/route/v1/car/${seattleLatLong[1]},${seattleLatLong[0]};${newYorkLatLong[1]},${newYorkLatLong[0]}?overview=false&access-token=D7N8aZgZjVj8nE4w8TF0Onz6DLdRKWQefLhiXFzdAMvgHR5R6YkdQmz8xR50y81d`;

    function handleMapLoad(map) {
        L.tileLayer(
            'https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=D7N8aZgZjVj8nE4w8TF0Onz6DLdRKWQefLhiXFzdAMvgHR5R6YkdQmz8xR50y81d',
            {}
        ).addTo(map);

        fetch(routingUrl)
            .then((response) => response.json())
            .then((data) => {
                const { routes, waypoints } = data;
                if (routes && routes.length > 0 && waypoints && waypoints.length > 1) {
                    const locations = waypoints.map((waypoint) => {
                        const { location } = waypoint;
                        if (location && location.length === 2) {
                            return L.latLng(location[1], location[0]);
                        }
                        return null;
                    });

                    if (locations.every((point) => point !== null)) {
                        L.Routing.control({
                            waypoints: locations,
                            routeWhileDragging: true,
                            show: true,
                        }).addTo(map);
                    } else {
                        console.log('Invalid waypoints');
                    }
                } else {
                    console.log('No routes or waypoints found');
                }
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    }

    function MapComponent() {
        const map = useMap();
        useEffect(() => {
            handleMapLoad(map);
        }, [routingUrl]); // Only re-run the effect when routingUrl changes

        return null;
    }

    return (
        <div>
            <MapContainer id="mapid" center={[47.6097, -122.3331]} zoom={13}>
                <TileLayer url="https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=D7N8aZgZjVj8nE4w8TF0Onz6DLdRKWQefLhiXFzdAMvgHR5R6YkdQmz8xR50y81d" />
                <MapComponent />
            </MapContainer>
        </div>
    );
}

export default Homepage;
