import areaLayer from './areaLayer';
import frameLine from './frameLine';
import facilityLayer from './facilityLayer';
import outdoorLayer from './outdoorLayer';

const emptyData = {
    type: 'geojson',
    data: {
        type: 'FeatureCollection',
        features: [],
    },
};

export default {
    version: 8,
    name: 'mapbox parking',
    glyphs: 'https://source.ipalmap.com/fonts/{fontstack}/{range}.pbf',
    light: {
        anchor: 'viewport',
        color: 'white',
        intensity: 0.2,
    },
    sprite: 'https://source.ipalmap.com/sprites/his/sprite',
    sources: {
        naviLine: emptyData,
        naviLineWalked: emptyData,
        pick: emptyData,
        start: emptyData,
        end: emptyData,
        highlight: emptyData,
        facility: emptyData,
    },
    layers: [
        {
            id: 'FrameFace',
            type: 'fill-extrusion',
            source: 'dataSource',
            'source-layer': 'frame',
            paint: {
                'fill-extrusion-color': '#fcfdff',
                'fill-extrusion-height': 0,
            },
        },
        areaLayer,
        {
            id: 'OtherArea',
            type: 'fill-extrusion',
            source: 'dataSource',
            'source-layer': 'area',
            filter: ['in', 'categoryid', 23999001, 24093000, 23999000, 23063000, 24097000, 24091000],
            paint: {
                'fill-extrusion-color': {
                    property: 'categoryid',
                    stops: [
                        [23999001, '#cccccc'],
                        [24093000, '#BBBBBB'],
                        [23999000, '#e4e9ed'],
                        [23063000, '#BCB4BB'],
                        [24097000, '#BBBBBB'],
                        [24091000, '#BBBBBB'],
                    ],
                    default: '#ffffff',
                    type: 'categorical',
                },
                'fill-extrusion-height': 2.3,
            },
        },
        ...outdoorLayer,
        frameLine,
        {
            id: 'highlight',
            type: 'fill-extrusion',
            source: 'highlight',
            paint: {
                'fill-extrusion-opacity': 0.5,
                'fill-extrusion-color': '#5da0f1',
                'fill-extrusion-height': 1.8,
            },
        },
        //  地图上小poi的文字
        {
            id: 'AreaPoiText',
            type: 'symbol',
            source: 'dataSource',
            'source-layer': 'area',
            filter: ['!=', 'categoryid', 13129000],
            layout: {
                'text-field': '{display}',
                'text-offset': [0, 0],
                'text-anchor': 'center',
                'text-size': 12,
                'text-padding': 10,
            },
            paint: {
                'text-color': '#333333',
                'text-halo-color': '#ffffff',
                'text-halo-width': 1,
            },
        },
        // 地图上大面的文字
        {
            id: 'AreaText',
            type: 'symbol',
            source: 'dataSource',
            'source-layer': 'label',
            filter: ['==', 'categoryid', 13129000],
            layout: {
                'text-field': '{display}',
                'text-anchor': 'center',
                'text-size': 16,
                'text-padding': 0,
            },
            paint: {
                'text-color': {
                    stops: [
                        [18, '#64b5f6'],
                        [19, 'rgb(34, 67, 115)'],
                    ],
                },
                'text-opacity': {
                    stops: [
                        [16, 1],
                        [17, 1],
                        [18, 1],
                        [19, 0.4],
                        [20, 0.4],
                    ],
                },
                'text-halo-color': '#ffffff',
                'text-halo-width': 2,
                'text-halo-blur': 1,
            },
        },
        facilityLayer,
        {
            id: 'naviLine',
            type: 'line',
            source: 'naviLine',
            layout: {
                'line-cap': 'square',
                'line-join': 'round',
            },
            paint: {
                'line-width': 8,
                'line-pattern': 'ic_line',
            },
        },
        {
            id: 'naviLineWalked',
            type: 'line',
            source: 'naviLineWalked',
            layout: {
                'line-cap': 'square',
                'line-join': 'round',
            },
            paint: {
                'line-width': 8,
                'line-pattern': 'ic_line_hui',
            },
        },
        {
            id: 'pick',
            type: 'symbol',
            source: 'pick',
            layout: {
                'icon-image': 'ic_pick',
                'icon-size': 0.2,
                'icon-anchor': 'bottom',
            },
        },
        {
            id: 'start',
            type: 'symbol',
            source: 'start',
            layout: {
                'icon-image': 'ic_start',
                'icon-size': 0.2,
                'icon-anchor': 'bottom',
            },
        },
        {
            id: 'end',
            type: 'symbol',
            source: 'end',
            layout: {
                'icon-image': 'ic_end',
                'icon-size': 0.2,
                'icon-anchor': 'bottom',
            },
        },
        {
            id: 'facility',
            type: 'symbol',
            source: 'facility',
            layout: {
                'icon-image': 'ic_pick',
                'icon-size': 0.2,
                'icon-anchor': 'bottom',
                'icon-ignore-placement': true,
                'icon-allow-overlap': true,
            },
        },
    ],
};
