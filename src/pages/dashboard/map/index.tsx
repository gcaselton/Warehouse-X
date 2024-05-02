import React from 'react';
import HeatmapComponent from './components/heatmap';

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
