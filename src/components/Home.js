import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Homepage from './Homepage';

function Home() {
    const [value, setValue] = useState(0);

    const topNav = () => {
        return (<BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            sx={{
                backgroundColor: '#3d434d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', // Add this line
            }}
        >
            <span
                style={{
                    color: '#fff',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    margin: '1rem 1rem 1rem 1rem',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    window.location.href = '/'
                }}
            >
                Know Your Seattle Way
            </span>
            {/* <BottomNavigationAction
                label="Home"
                icon={<HomeIcon />}
                sx={{
                    color: '#fff',
                    ":focus": {
                        color: '#9affb1',
                    }
                }}
            />
            <BottomNavigationAction
                label="Favorites"
                icon={<FavoriteIcon />}
                sx={{
                    color: '#fff',
                    ":focus": {
                        color: '#9affb1',
                    }
                }}
            />
            <BottomNavigationAction
                label="Nearby"
                icon={<LocationOnIcon />}
                sx={{
                    color: '#fff',
                    ":focus": {
                        color: '#9affb1',
                    }
                }}
            /> */}
        </BottomNavigation>
        )
    }

    const screen = () => {
        switch (value) {
            case 0:
                return <Homepage />

            default:
                break;
        }
    }

    return (
        <div>
            {topNav()}
            {screen()}
        </div>
    )
}

export default Home;