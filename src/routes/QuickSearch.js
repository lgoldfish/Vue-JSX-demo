import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';
// components
import TopSearch from '../components/searchPage/TopSearch';
import WhiteSpace from '../components/common/WhiteSpace';
import Card from '../components/searchPage/Card';
import Accordion from '../components/common/Accordion';

import map from '../map';
import { tip } from '../../NGRMap/utils/tool';
import { sleep } from '../../NGRMap/utils/lang';
import request from '../../NGRMap/request/request';
import { searchListUrl, buildingId } from '../config';

@Component({})
class QuickSearch extends Vue {
    data() {
        return {
            hisFrequentDtoList: [],
            hospitalGuideRealDtoList: [],
        };
    }

    async created() {
        const res = await request.get(searchListUrl, { query: { bdId: buildingId } });
        this.hisFrequentDtoList = res.data.hisFrequentDtoList;
        this.hospitalGuideRealDtoList = res.data.hospitalGuideRealDtoList;
    }

    backToMapView() {
        history.back();
    }

    toOperationSearch() {
        location.hash = '/operationSearch';
    }

    async searchByKeyword(value) {
        if (!value) {
            return;
        }
        try {
            const res = await map.searchByKeyword(value);
            if (res.length === 0) {
                tip('无搜索结果, 请换个关键字');
            } else if (res.length === 1) {
                this._goHere(res[0]);
            } else {
                this.$store.commit('searchPage/setSearchResult', res);
                location.hash = '/searchResult';
            }
        } catch (e) {
            tip('您的网络异常, 搜索失败');
            throw e;
        }
    }

    async _goHere(value) {
        history.back();
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

    renderHeader(item) {
        return (
            <span class={styles.accordionHeader}>
                {/* <img src={`assets/${item.icon}`} alt=""/> */}
                {item.title}
            </span>
        );
    }

    render() {
        return (
            <div class={styles.searchPage}>
                <TopSearch backHandle={this.backToMapView}
                    focusHandle={this.toOperationSearch}/>
                <WhiteSpace />
                <div class={styles.bottomQuick}>
                    <Card list={this.hisFrequentDtoList}
                        itemClick={this.searchByKeyword}/>
                    <WhiteSpace />
                    <div class={styles.accordionContainer}>
                    {
                        this.hospitalGuideRealDtoList.map((item, i) => (
                            <Accordion isActive={item.isOpen}
                                header={this.renderHeader(item)}
                                key={i.toString()}>
                                <div class={styles.itemContainer}>
                                {
                                    item.hospitalGuideDtoList.map((jItem, j) => (
                                        <span key={j.toString()}
                                            class={styles.accordionItem}
                                            onClick={() => this.searchByKeyword(jItem.value)}>
                                            {jItem.text}
                                        </span>
                                    ))
                                }
                                </div>
                            </Accordion>
                        ))
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default QuickSearch;
