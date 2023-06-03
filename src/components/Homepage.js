import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

function Homepage() {
    useEffect(() => {
        const map = L.map('mapid').setView([47.6097, -122.3331], 13);
        L.tileLayer(
            'https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=D7N8aZgZjVj8nE4w8TF0Onz6DLdRKWQefLhiXFzdAMvgHR5R6YkdQmz8xR50y81d',
            {}
        ).addTo(map);

        const seattleLatLong = [47.609687, -122.333131]; // Seattle coordinates
        const newYorkLatLong = [40.712237, -74.005742]; // New York coordinates

        const routingUrl = `https://api.jawg.io/routing/route/v1/car/${seattleLatLong[1]},${seattleLatLong[0]};${newYorkLatLong[1]},${newYorkLatLong[0]}?overview=false&access-token=D7N8aZgZjVj8nE4w8TF0Onz6DLdRKWQefLhiXFzdAMvgHR5R6YkdQmz8xR50y81d`;

        fetch(routingUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Log the response data to check its contents
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
                            show: true, // Set show to true to display the route on the map
                        }).addTo(map);
                    } else {
                        console.log('Invalid waypoints'); // Log a message if the waypoints are invalid
                    }
                } else {
                    console.log('No routes or waypoints found'); // Log a message if no routes or waypoints are found
                }
            })
            .catch((error) => {
                console.log('Error:', error); // Log any errors that occur during the fetch request
            });

        return () => {
            map.remove();
        };
    }, []);

    return (
        <div>
            <div id="mapid"></div>
        </div>
    );
}

export default Homepage;