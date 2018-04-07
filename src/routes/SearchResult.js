import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';
import { sleep } from '../../NGRMap/utils/lang';

import map from '../map';

// components
import TopSearch from '../components/searchPage/TopSearch';
import WhiteSpace from '../components/common/WhiteSpace';

@Component({})
class SearchResult extends Vue {
    back() {
        history.back();
    }

    async goHere(value) {
        location.hash = '/';
        // for floor control scroll
        await sleep(160);
        const locationMng = map.getPlugin('location');
        locationMng && locationMng.setAutoChange(false);

        const navigate = map.getPlugin('navigate');
        const lngLat = {
            lng: value.center.coordinates[0],
            lat: value.center.coordinates[1],
        };
        const info = {
            display: value.shopNameCn,
            floorName: value.floorName,
            floorId: value.flId,
        };
        if (map.currentFloor !== value.flId) {
            map.setCurrentFloor(value.flId);
            // await sleep(160);
        }
        navigate.setPickMarker(map.currentFloor, lngLat, info);
        // 取消之前的高亮
        const highlightMng = map.getPlugin('highlight');
        highlightMng.curHighlightId && highlightMng.cancel(highlightMng.curHighlightId);
        // highlightMng.highlight(lngLat);
        map.easeTo({ center: lngLat });
        this.$store.commit('mapView/setNavigateStatus', 'resultGoHere');
        this.$store.commit('mapView/setPickInfo', info);
    }

    goToOperationSearch() {
        location.hash = '/operationSearch';
    }

    render() {
        const list = this.$store.state.searchPage.searchResult || [];
        return (
            <div class={styles.searchPage}>
                <TopSearch backHandle={this.back}
                    focusHandle={this.goToOperationSearch}/>
                <WhiteSpace />
                <ul class={styles.result}>
                {
                    list.map((item, i) => (
                        <li key={i.toString()}
                            onClick={() => this.goHere(item)}>
                            <span class={styles.location}>
                                <img src={require('../assets/ic_list_location@2x.png')} alt=""/>
                                {item.shopNameCn}
                            </span>
                            <span class={styles.roomNum}>{item.description}</span>
                            <span class={styles.floor}>{item.floorName}</span>
                        </li>
                    ))
                }
                </ul>
            </div>
        );
    }
}

export default SearchResult;
