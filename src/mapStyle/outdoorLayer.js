export default [
    {
        id: 'OutdoorFrameFace',
        type: 'fill-extrusion',
        source: 'outdoorSource',
        'source-layer': 'frame',
        paint: {
            'fill-extrusion-color': '#ffffff',
            'fill-extrusion-height': 0,
        },
    },
    {
        id: 'OutdoorFrameLine',
        type: 'line',
        source: 'outdoorSource',
        'source-layer': 'frame',
        layout: {
            visibility: 'visible',
        },
        paint: {
            'line-color': '#cfb07a',
            'line-width': 2,
        },
    },
    {
        id: 'OutdoorArea',
        type: 'fill-extrusion',
        source: 'outdoorSource',
        'source-layer': 'area',
        layout: {
            visibility: 'visible',
        },
        paint: {
            'fill-extrusion-opacity': 0.45,
            'fill-extrusion-color': {
                property: 'categoryid',
                stops: [
                    [11473000, '#BEE6FF'],
                    [13053000, '#BEE6FF'],
                    [13129000, '#FFD6D6'],
                    [13151000, '#BEE6FF'],
                    [13152000, '#BEE6FF'],
                    [15000000, '#CFEEBB'],
                    [15009000, '#FEFAD5'],
                    [15045000, '#B6DEFF'],
                    [16000000, '#FEFAD5'],
                    [16004000, '#FFE8D6'],
                    [21000000, '#FFC0CB'],
                    [21002000, '#FFF3CF'],
                    [21003000, '#B6DEFF'],
                    [21004000, '#FEFAD5'],
                    [21005000, '#FEFAD5'],
                    [21006000, '#FFC0CB'],
                    [21007000, '#FFC0CB'],
                    [21008000, '#B6DEFF'],
                    [21010000, '#FFC0CB'],
                    [21013000, '#FFC0CB'],
                    [21019000, '#FFC0CB'],
                    [21020000, '#FFC0CB'],
                    [21021000, '#FFC0CB'],
                    [21022000, '#FFC0CB'],
                    [21025000, '#FFC0CB'],
                    [21028000, '#FFC0CB'],
                    [21029000, '#FFC0CB'],
                    [21032000, '#FFC0CB'],
                    [21034000, '#FFC0CB'],
                    [21043000, '#FFC0CB'],
                    [21050000, '#FFC0CB'],
                    [22006000, '#DDEDEA'],
                    [23003000, '#BEE6FF'],
                    [23004000, '#FFF3CF'],
                    [23009000, '#FFC0CB'],
                    [23024000, '#DFEEC9'],
                    [23025000, '#DFEEC9'],
                    [23063000, '#DFEEC9'],
                    [23059000, '#DFEEC9'],
                    [23040000, '#BEE6FF'],
                    [23041000, '#DDEDEA'],
                    [23043000, '#DDEDEA'],
                    [23062000, '#e3e3e3'],
                    [23999000, '#e3e3e3'],
                    [24091000, '#FFF3CF'],
                    [24093000, '#FFF3CF'],
                    [24097000, '#FFF3CF'],
                    [24111000, '#BEE6FF'],
                    [24112000, '#BEE6FF'],
                    [24122000, '#FEFAD5'],
                    [35002000, '#c4d79f'],
                    [35003000, '#DDEDEA'],
                    [37000000, '#e4e9f2'],
                ],
                default: '#FFFFF0',
                type: 'categorical',
            },
            'fill-extrusion-height': {
                property: 'categoryid',
                stops: [
                    [16004000, 0.12],
                    [21000000, 0.15],
                    [21006000, 0.15],
                    [21007000, 0.15],
                    [21010000, 0.15],
                    [21013000, 0.15],
                    [21019000, 0.15],
                    [21020000, 0.15],
                    [21021000, 0.15],
                    [21022000, 0.15],
                    [21025000, 0.15],
                    [21028000, 0.15],
                    [21029000, 0.15],
                    [21032000, 0.15],
                    [21034000, 0.15],
                    [21043000, 0.15],
                    [21050000, 0.15],
                    [23009000, 0.15],
                    [11473000, 0.15],
                    [13053000, 0.15],
                    [13151000, 0.15],
                    [13152000, 0.15],
                    [23003000, 0.15],
                    [23040000, 0.18],
                    [23999000, 0.18],
                    [24111000, 0.15],
                    [24112000, 0.15],
                    [15009000, 0.15],
                    [15045000, 0.15],
                    [16000000, 0.15],
                    [21003000, 0.15],
                    [21004000, 0.15],
                    [21005000, 0.15],
                    [21008000, 0.15],
                    [23024000, 0.15],
                    [23025000, 0.15],
                    [23063000, 0.15],
                    [23059000, 0.15],
                    [24122000, 0.15],
                    [24091000, 0.15],
                    [24093000, 0.15],
                    [24097000, 0.15],
                    [22006000, 0.15],
                    [23041000, 0.15],
                    [23043000, 0.15],
                    [21002000, 0.15],
                    [23004000, 0.15],
                    [13129000, 0.12],
                    [15000000, 0.12],
                    [23062000, 0.12],
                    [35002000, 0.4],
                    [35003000, 0.12],
                    [37000000, 0.12],
                ],
                default: 0.11,
                type: 'categorical',
            },
        },
    },
     //  地图上小poi的文字
     {
        id: 'OutdoorAreaPoiText',
        type: 'symbol',
        source: 'outdoorSource',
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
            'text-color': '#666666',
        },
    },
    // 地图上大面的文字
    {
        id: 'OutdoorAreaText',
        type: 'symbol',
        source: 'outdoorSource',
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
];
