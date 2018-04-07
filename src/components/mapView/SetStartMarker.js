import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';
import map from '../../map';

@Component({
    props: {
        display: String,
        address: String,
    },
})
class SetStartMarker extends Vue {
    close() {
        this.$store.commit('mapView/setNavigateStatus', 'init');
        const navigate = map.getPlugin('navigate');
        const highlightMng = map.getPlugin('highlight');
        navigate.removeMarker('pick');
        highlightMng.curHighlightId && highlightMng.cancel(highlightMng.curHighlightId);
    }

    async setStartMarker() {
        const navigate = map.getPlugin('navigate');
        navigate.updateMarker('pick', 'start');
        const startInfo = navigate.getMarker('start').getProperties();
        this.$store.commit('mapView/setStartInfo', { ...startInfo });
        await navigate.initNavi();
        this.$store.commit('mapView/save', { isHasNaviLine: true });
        this.$store.commit('mapView/setNavigateStatus', 'navigateReady');
    }

    render() {
        const { isCanSetStart } = this.$store.state.mapView;
        return (
            <div class={styles.goHereContainer}>
                <div class={styles.topInfo}>
                    <div class={styles.info}>
                        <div class={styles.display}>
                            { isCanSetStart ? this.display : '点击地图选择起点' }
                        </div>
                        <div class={styles.address}>{ isCanSetStart && this.address }</div>
                    </div>
                </div>
                <div class={styles.operate}>
                    <button class={styles.back} onClick={this.close}>
                        返回
                    </button>
                    <button class={styles.goHere}
                        disabled={!isCanSetStart}
                        onClick={this.setStartMarker}>
                    设为起点
                    </button>
                </div>
            </div>
        );
    }
}

export default SetStartMarker;
