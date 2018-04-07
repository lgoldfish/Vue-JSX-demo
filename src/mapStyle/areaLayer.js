export default {
    id: 'Area',
    type: 'fill-extrusion',
    source: 'dataSource',
    'source-layer': 'area',
    layout: {
        visibility: 'visible',
    },
    paint: {
        'fill-extrusion-color': {
            property: 'colorid',
            stops: [
                [1, '#823250'],
                [2, '#C0785A'],
                [3, '#338C54'],
                [4, '#152654'],

                [5, '#fbede2'],

                [6, '#e4e9ed'],
            ],
            default: '#ffffff',
            type: 'categorical',
        },
        'fill-extrusion-height': {
            property: 'colorid',
            stops: [
                [1, 0.4],
                [2, 0.2],
                [3, 1],
                [4, 1],
                [5, 1],

                [6, 0.6],
            ],
            default: 0.1,
            type: 'categorical',
        },
    },
};
