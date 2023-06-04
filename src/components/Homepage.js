import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import getCrimes from '../services/getCrimes';

import './homepage.css'; // Import the CSS file for styling

function Homepage() {
    const seattleLatLong = [47.609687, -122.333131]; // Seattle coordinates
    const newYorkLatLong = [47.609687, -122.20]; // New York coordinates
    const [crimeData, setCrimeData] = useState([]);

    useEffect(() => {
        const gettingCrimeData = async () => {
            await getCrimes.getCrimes().then((response) => {
                const { data } = response;
                setCrimeData(data);
            });
        };
        gettingCrimeData();
    }, []);

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

    function getColorForCode(code) {
        let color;

        switch (code) {
            case '35A':
                color = 'red';
                break;
            case '23G':
                color = 'blue';
                break;
            case '20':
                color = 'green';
                break;
            case '290':
                color = 'orange';
                break;
            case '90D':
                color = 'purple';
                break;
            case '23C':
                color = 'yellow';
                break;
            case '23F':
                color = 'pink';
                break;
            case '26E':
                color = 'cyan';
                break;
            case '23D':
                color = 'magenta';
                break;
            case '100':
                color = 'lime';
                break;
            case '250':
                color = 'teal';
                break;
            case '23H':
                color = 'brown';
                break;
            case '370':
                color = 'navy';
                break;
            case '210':
                color = 'olive';
                break;
            case '240':
                color = 'maroon';
                break;
            case '11B':
                color = 'coral';
                break;
            case '280':
                color = 'skyblue';
                break;
            case '26A':
                color = 'lavender';
                break;
            case '26B':
                color = 'silver';
                break;
            case '270':
                color = 'gold';
                break;
            case '26F':
                color = 'orchid';
                break;
            case '26C':
                color = 'indigo';
                break;
            case '520':
                color = 'limegreen';
                break;
            case '11D':
                color = 'salmon';
                break;
            case '26G':
                color = 'darkorange';
                break;
            case '35B':
                color = 'aqua';
                break;
            case '200':
                color = 'tomato';
                break;
            case '64A':
                color = 'crimson';
                break;
            case '90G':
                color = 'darkgreen';
                break;
            case '90A':
                color = 'chocolate';
                break;
            case '23A':
                color = 'violet';
                break;
            case '11A':
                color = 'lime';
                break;
            default:
                color = 'gray';
                break;
        }

        return color;
    }

    function MapComponent() {
        const map = useMap();

        useEffect(() => {
            if (routingUrl) {
                handleMapLoad(map);
            }
        }, [map, routingUrl]);

        const [filterCodes, setFilterCodes] = useState([]);

        const handleFilterChange = (code) => {
            if (filterCodes.includes(code)) {
                setFilterCodes(filterCodes.filter((c) => c !== code));
            } else {
                setFilterCodes([...filterCodes, code]);
            }
        };

        return (
            <>
                <div className="filters">
                    {Array.from(new Set(crimeData.map((block) => block.code))).map((code) => (
                        console.log(code),
                        <div key={code}>
                            <input
                                type="checkbox"
                                id={code}
                                value={code}
                                checked={filterCodes.includes(code)}
                                onChange={() => handleFilterChange(code)}
                            />
                            <label htmlFor={code}>
                                {crimeData.find((block) => block.code === code)?.offense} {/* Get the corresponding offense for the code */}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="map-container">
                    {crimeData.map((block, index) => {
                        const { centroid, code } = block;
                        if (
                            centroid &&
                            centroid.length === 2 &&
                            (!filterCodes.length || filterCodes.includes(code))
                        ) {
                            return (
                                <Circle
                                    key={index}
                                    center={centroid}
                                    pathOptions={{
                                        color: getColorForCode(code),
                                        fillOpacity: 0.5,
                                    }}
                                    radius={1000}
                                >
                                    <Popup>{code}</Popup>
                                </Circle>
                            );
                        }
                        return null;
                    })}
                </div>
            </>
        );
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
