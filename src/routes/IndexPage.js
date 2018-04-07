import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';
import MapView from '../components/mapView/MapView';

@Component({
    props: {
        isShow: Boolean,
    },
})
class IndexPage extends Vue {
    render() {
        const { navigateStatus } = this.$store.state.mapView;
        const notShowStatus = ['navigateReady', 'navigating', 'navigateEnd'];
        return (
            <div class={styles.indexPage}
                style={!this.isShow && { display: 'none' }}>
                {
                    notShowStatus.indexOf(navigateStatus) === -1 &&
                    <a href="#/quickSearch" class={styles.link}>
                        请输入目的地
                    </a>
                }
                <MapView />
            </div>
        );
    }
}

export default IndexPage;
