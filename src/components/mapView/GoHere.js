import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';
import map from '../../map';
import Modal from '../common/Modal';
import { tip } from '../../../NGRMap/utils/tool';

import closeIcon from '../../assets/ic_list_close@2x.png';

@Component({
    props: {
        display: String,
        address: String,
    },
})
class GoHere extends Vue {
    async goHere() {
        const location = map.getPlugin('location');
        const navigate = map.getPlugin('navigate');

        if (location && location.hasPosition()) {
            // set end marker
            navigate.updateMarker('pick', 'end');
            const info = navigate.getMarker('end').getProperties();
            this.$store.commit('mapView/setEndInfo', { ...info });

            // set start marker
            const { currentFloor: startFloor, lngLat: startLngLat } = location.getPosition();
            navigate.setStartMarker(startFloor, startLngLat, { display: '我的位置' });
            this.$store.commit('mapView/setStartInfo', {
                display: '我的位置',
                floorName: map._floorMap[startFloor].nameEn,
            });
            try {
                await navigate.initNavi();
                this.$store.commit('mapView/save', { isHasNaviLine: true });
                this.$store.commit('mapView/setNavigateStatus', 'navigateReady');
            } catch (e) {
                navigate.removeMarker('start');
                navigate.updateMarker('end', 'pick');
            }
        } else {
            Modal.alert('请手动选择起点', '', [
                {
                    text: '取消',
                },
                {
                    text: '选择起点',
                    onPress: () => {
                        navigate.updateMarker('pick', 'end');
                        const info = navigate.getMarker('end').getProperties();
                        this.$store.commit('mapView/setEndInfo', { ...info });
                        this.$store.commit('mapView/save', { isCanSetStart: false });
                        this.$store.commit('mapView/setNavigateStatus', 'setStart');
                        const highlightMng = map.getPlugin('highlight');
                        highlightMng.curHighlightId = '';
                    },
                },
            ]);
        }
    }

    data() {
        return {
            isOpen: false,
        };
    }

    close() {
        const navigate = map.getPlugin('navigate');
        navigate.reset();
        const { navigateStatus } = this.$store.state.mapView;
        this.$store.commit('mapView/setNavigateStatus', 'init');
        if (navigateStatus === 'resultGoHere') {
            location.hash = '/searchResult';
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.$store.commit('mapView/save', { forceUpdate: this.isOpen });
    }

    render() {
        return (
            <div class={styles.goHereContainer}>
                <div class={styles.infoContainer}>
                    <div class={styles.topInfo}>
                        <div class={styles.info}>
                            <div class={styles.display}>{this.display}</div>
                            <div class={styles.address}>{this.address}</div>
                        </div>
                        {/* <a href="http://www.zs-hospital.com/article/show.php?itemid=656" class={styles.details}>
                            详情
                        </a> */}
                        {
                            this.display === '骨科' &&
                            <button class={`${styles.details} ${this.isOpen ? styles.open : styles.close}`}
                                onClick={this.toggle}>
                                查看详情
                            </button>
                        }
                    </div>
                    {
                        this.isOpen && this.display === '骨科' &&
                        <div class={styles.content}>
                            舟山医院骨科,是舟山市内历史最悠久、
                            实力最雄厚的西医骨科,是首批舟山市局级重点学科，现为舟山市市级医学重点学科。多年来，致力于引进国际国内的高新技术...
                        </div>
                    }
                </div>
                <div class={styles.operate}>
                    <button class={styles.back} onClick={this.close}>
                        返回
                    </button>
                    <button class={styles.goHere} onClick={this.goHere}>
                        去这里
                    </button>
                </div>
            </div>
        );
    }
}

export default GoHere;
