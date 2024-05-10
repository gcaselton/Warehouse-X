import React from 'react';
import HeatmapComponent from './components/heatmap';

// Heat Map page, initialised with sample latitude and longitude points
const Heatmap = () => {
    const heatmapData = [
        { lat: 37.7749, lng: -122.4194 },
        { lat: 37.7750, lng: -122.4195 },
    ];

    return (
        <div>
            <HeatmapComponent heatmapData={heatmapData} />
        </div>
    );
};

export default Heatmap;
