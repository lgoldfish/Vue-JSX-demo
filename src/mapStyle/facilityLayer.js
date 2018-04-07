export default {
    id: 'Facility',
    type: 'symbol',
    source: 'dataSource',
    'source-layer': 'area',
    layout: {
        'icon-image': {
            property: 'categoryid',
            stops: [
                // 直梯
                [24091000, 'ic_elevator'],
                [24092000, 'ic_elevator'],
                // 扶梯
                [24093000, 'ic_escalator'],
                [24094000, 'ic_escalator'],
                [24095000, 'ic_escalator'],
                [24096000, 'ic_escalator'],
                // 楼梯
                [24097000, 'ic_stairs'],
                // 出入口
                [23043000, 'ic_entrance'],
                [23012000, 'ic_entrance'],
                [23061000, 'ic_entrance'],
                [22006000, 'ic_entrance'],
                [23041000, 'ic_entrance'],
                [22054000, 'ic_entrance'],
                // 洗手间
                [23024000, 'ic_toilet'],
                [23025000, 'ic_toilet'],
                [23063000, 'ic_toilet'],
                [23059000, 'ic_toilet'],

            ],
            type: 'categorical',

        },
        'icon-size': 0.1,
    },
};
