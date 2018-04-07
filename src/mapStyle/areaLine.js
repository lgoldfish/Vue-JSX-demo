export default {
    id: 'AreaLine',
    type: 'line',
    source: 'dataSource',
    'source-layer': 'area',
    layout: {
        visibility: 'visible',
    },
    paint: {
        'line-color': {
            property: 'categoryid',
            stops: [
                [37000000, '#DDEDEA'],
            ],
            default: '#ffffff',
            type: 'categorical',
        },
    },
};
