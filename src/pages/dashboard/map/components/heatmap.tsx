import React from 'react';
import { GoogleMap, HeatmapLayer, LoadScript } from '@react-google-maps/api';


// Heatmap component initialised to center on the UK
const HeatmapComponent = ({ heatmapData }) => {
    return (
        <LoadScript
        // googleMapsApiKey={"****redacted****"}
        libraries={['visualization']}
        >
            <GoogleMap
                mapContainerStyle={{ height: '500px', width: '100%' }}

                center={{ lat: 53.7496053, lng: -2.5773305 }}
                zoom={5.75}
            >
                <HeatmapLayer
                    data={heatmapData}
                    options={{ radius: 20 }}
                />
            </GoogleMap>
        </LoadScript>
    );
};

export default HeatmapComponent;
