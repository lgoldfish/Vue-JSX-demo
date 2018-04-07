import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';
import map from '../../map';
import { tip } from '../../../NGRMap/utils/tool';

@Component({})
class NavigateReady extends Vue {
    simulate() {
        const navigate = map.getPlugin('navigate');
        navigate.simulateNavigate();

        this.$store.commit('mapView/setNavigateStatus', 'navigating');
    }

    back() {
        const navigate = map.getPlugin('navigate');
        navigate.endNavigate();

        this.$store.commit('mapView/setNavigateStatus', 'init');
    }

    startNavigate() {
        const { isLocateSuccess } = this.$store.state.mapView;
        if (!isLocateSuccess) {
            tip('暂时没有您的位置信息,无法导航');
            return;
        }
        const navigate = map.getPlugin('navigate');
        navigate.startNavigate();

        this.$store.commit('mapView/setNavigateStatus', 'navigating');
    }

    render() {
        const { startInfo, endInfo, isLocateSuccess } = this.$store.state.mapView;
        return (
            <div class={styles.navigateReady}>
                <div class={styles.info}>
                    <div class={styles.start}>
                        <span class={styles.unit}>起</span>
                        {startInfo.display}
                    </div>
                    <div class={styles.end}>
                        <span class={styles.unit}>终</span>
                        {endInfo.display}
                    </div>
                </div>
                <div class={styles.operate}>
                    <button onClick={this.simulate}>模拟导航</button>
                    <button class={isLocateSuccess ? '' : styles.disable}
                        onClick={this.startNavigate}>
                        开始导航
                    </button>
                </div>
                <div class={styles.back} onClick={this.back}>
                    返回
                </div>
            </div>
        );
    }
}

export default NavigateReady;

