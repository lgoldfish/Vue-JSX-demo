import Vue from 'vue';
import mapboxgl from 'mapbox-gl';
import Component from 'vue-class-component';
import map from '../../map';
import styles from './style.css';
import Modal from '../common/Modal';
import mapStyle from '../../mapStyle/style';

// components
import GoHere from './GoHere';
import SetStartMarker from './SetStartMarker';
import NavigateReady from './NavigateReady';
import {
    NavigatingTop,
    NavigatingBottom,
} from './Navigating';

const initTopStyle = '60px';

@Component({})
class MapView extends Vue {

    mounted() {
        map.init({
            container: 'mapView',
            zoom: 19,
            maxZoom: 22,
            minZoom: 18,
        }, mapStyle);
        map.setControlTop(initTopStyle);

        map.mapView.on('pitchend', () => {
            const pitch = map.mapView.getPitch();
            if (pitch >= 20) {
                map.setLayerVisible(['AreaLine', 'FrameLine'], 'none');
            } else {
                map.setLayerVisible(['AreaLine', 'FrameLine'], 'visible');
            }
        });
        // for location
        const location = map.getPlugin('location');
        location && location.on('locationChange', ({ floorId }) => {
            if (floorId) {
                this.$store.commit('mapView/save', { isLocateSuccess: true });
            }
        });

        // for navigate
        const navigate = map.getPlugin('navigate');
        navigate.on('navigatingInfo', (info) => {
            this.$store.commit('mapView/setNavigatingInfo', info);
        });

        navigate.on('navigateEnd', () => {
            this.$store.commit('mapView/setNavigateStatus', 'navigateReady');
        });

        navigate.on('reset', () => {
            const highlightMng = map.getPlugin('highlight');
            highlightMng.cancel();
        });
        // for map click
        map.on('click', this._clickHandle);
    }

    _clickHandle(e) {
        const feature = e.features[0];
        const navigate = map.getPlugin('navigate');
        const highlightMng = map.getPlugin('highlight');
        const endMarker = navigate.getMarker('end');
        // 有导航线时
        if (navigate._naviMng.hasNaviLine()) {
            return;
        }
        // 点击地图空白处时
        if (!feature) {
            if (!endMarker) {
                navigate.reset();
                this.$store.commit('mapView/setNavigateStatus', 'init');
            }
            return;
        }
        if (process.env.NODE_ENV === 'development') {
            console.log(feature.properties);
        }
        const info = {
            display: feature.properties.display,
            floorName: map._floorMap[map.currentFloor].nameEn,
            floorId: map.currentFloor,
            address: feature.properties.description,
        };
        if (!info.display) {
            return;
        }
        // 提交info
        this.$store.commit('mapView/setPickInfo', info);
        const center = JSON.parse(feature.properties.center);
        const lngLat = new mapboxgl.LngLat(center[0], center[1]);

        // highlight
        highlightMng.curHighlightId && highlightMng.cancel(highlightMng.curHighlightId);
        highlightMng.highlight(lngLat, true);
        navigate.setPickMarker(map.currentFloor, lngLat, info);

        if (endMarker) {
            this.$store.commit('mapView/setNavigateStatus', 'setStart');
            this.$store.commit('mapView/save', { isCanSetStart: true });
            return;
        }

        this.$store.commit('mapView/setNavigateStatus', 'goHere');
    }

    updated() {
        this._updateControlPosition();
    }

    _updateControlPosition() {
        const notShowStatus = ['navigateReady', 'navigating', 'navigateEnd'];
        const { navigateStatus } = this.$store.state.mapView;
        const topDom = this.$refs.navigateTop;
        let topStyle = `${topDom.offsetHeight}px`;
        if (this.$refs.navigateTop.innerHTML === '' && notShowStatus.indexOf(navigateStatus) === -1) {
            topStyle = initTopStyle;
        }
        map.setControlTop(topStyle);

        const bottomDom = this.$refs.navigateBottom;
        map.setControlBottom(`${bottomDom.offsetHeight}px`);
    }

    render() {
        const { navigateStatus, pickInfo, forceUpdate } = this.$store.state.mapView;
        return (
            <div class={styles.mapView} id="mapView">
                <div class={styles.navigateTop} ref="navigateTop">
                    {
                        (navigateStatus === 'navigating' || navigateStatus === 'navigateEnd') &&
                        <NavigatingTop />
                    }
                </div>
                <div class={styles.navigateBottom} ref="navigateBottom">
                    {
                        (navigateStatus === 'goHere' || navigateStatus === 'resultGoHere') &&
                        <GoHere display={pickInfo.display}
                            address={pickInfo.address} />
                    }
                    {
                        navigateStatus === 'setStart' &&
                        <SetStartMarker display={pickInfo.display}
                            address={pickInfo.address}/>
                    }
                    {navigateStatus === 'navigateReady' && <NavigateReady />}
                    {
                        (navigateStatus === 'navigating' || navigateStatus === 'navigateEnd') &&
                        <NavigatingBottom />
                    }
                </div>
            </div>
        );
    }
}

export default MapView;
