import wx from 'wx';
import NGRMap from '../NGRMap/NGRMap';
import control from '../NGRMap/control';
import Navigate from '../NGRMap/navigate/Navigate';
import Location from '../NGRMap/location/Location';
import Highlight from '../NGRMap/highlight/Highlight';
import {
    buildingId,
    appId,
    locationUrl,
    signatureUrl,
    disableCategory,
    apiServer,
    vectorServer,
    defaultFloor,
} from './config';

const {
    CompassControl,
    ScaleControl,
    ZoomControl,
    FloorControl,
    ViewControl,
    LocateControl,
    FacilityControl,
} = control;

const map = new NGRMap(buildingId, {
    animateFps: 30,
    apiServer,
    vectorServer,
    defaultFloor,
    background: "url('assets/bg_grid.png')",
});

map.setClickDisableCategory(disableCategory);

const zoomConfig = {
    default: { maxZoom: 22, minZoom: 16, zoom: 17.3 },
};

map.setZoomConfig(zoomConfig);

map.addDomControl(new CompassControl());
map.addDomControl(new ScaleControl());
map.addDomControl(new ZoomControl());
map.addDomControl(new FloorControl());
map.addDomControl(new ViewControl());
map.addDomControl(new LocateControl());
map.addDomControl(new FacilityControl());

// plugins
map.addPlugin(new Highlight());

// location
const location = new Location({ appId, locationUrl, signatureUrl });
map.addPlugin(location);

// navigate
const navigate = new Navigate();
navigate.setMarkerConfig({
    pick: { type: 'layer', options: { size: 0.2 } },
    start: { type: 'layer', options: { size: 0.2 } },
    end: { type: 'layer', options: { size: 0.2 } },
    sim: {
        type: 'overlay',
        url: 'assets/marker/ic_position.svg',
        options: {
            size: [50, 50],
            offset: [0, 0],
        },
    },
});

navigate.setLocationManager(location);
map.addPlugin(navigate);

function updateView() {
    if (map.mapStatus !== 'loaded') {
        return;
    }
    const floorId = map.currentFloor;
    const floorName = map._floorMap[floorId].nameEn;
    if (floorName === 'F1') {
        map.setLayerVisible(['OutdoorFrameLine', 'OutdoorFrameFace'], 'visible');
    } else {
        map.setLayerVisible(['OutdoorFrameLine', 'OutdoorFrameFace'], 'none');
    }
}

map.on('loaded', () => {
    updateView();
    if (process.env.NODE_ENV === 'development') {
        // location.fire('locationChange', {
        //     floorId: map._floors[0].flId,
        //     lngLat: { lng: 121.38656798269471, lat: 31.22664079645459 },
        // });
    }
});


map.on('changeFloor', updateView);

if (process.env.NODE_ENV === 'development') {
    window.map = map;
    map.on('click', (e) => {
        if (navigate._navigateStatus === 'navigating') {
            location.fire('locationChange', { floorId: map.currentFloor, lngLat: e.lngLat });
        }
    });
}

export default map;
