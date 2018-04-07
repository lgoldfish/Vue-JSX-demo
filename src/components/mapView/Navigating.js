import Vue from 'vue';
import Component from 'vue-class-component';
import map from '../../map';
import styles from './style.css';

@Component({})
export class NavigatingTop extends Vue {
    render() {
        const { endInfo } = this.$store.state.mapView;
        const { navigatingInfo, navigateStatus } = this.$store.state.mapView;
        const location = map.getPlugin('location');
        const navigate = map.getPlugin('navigate');
        const simMarker = navigate.getMarker('sim');
        const {
            currentFloor: locationFloor,
        } = (simMarker && simMarker.getPosition()) || location.getPosition();
        if (navigatingInfo.facility) {
            return (
                <div class={styles.navigatingFacility}>
                    <img src={`assets/${navigatingInfo.facility}.png`} alt=""/>
                </div>
            );
        }
        return (
            <div class={styles.navigatingTop}>
            {
                navigateStatus === 'navigating' &&
                (<div class={styles.info}>
                    {
                        navigatingInfo.direction &&
                        <img src={`assets/direction/${navigatingInfo.direction}.png`} alt=""/>
                    }
                    <span>{navigatingInfo.message}</span>
                </div>)
            }
            {
                navigateStatus === 'navigateEnd' &&
                (<div class={styles.info}>
                     <span>您已到达目的地附近</span>
                </div>)
            }
                <div class={styles.position}>
                    <span>当前位置：{map._floorMap[locationFloor].nameEn}</span>
                    <span>目的地：{endInfo.floorName} &nbsp;&nbsp;{endInfo.display}</span>
                </div>
            </div>
        );
    }
}

@Component({})
export class NavigatingBottom extends Vue {

    toggleVoice() {
        const { isAudio } = this.$store.state.mapView;
        const navigate = map.getPlugin('navigate');
        if (isAudio) {
            this.$store.commit('mapView/save', { isAudio: false });
            navigate.closeAudio();
        } else {
            this.$store.commit('mapView/save', { isAudio: true });
            navigate.openAudio();
        }
    }

    navigateComplete() {
        const navigate = map.getPlugin('navigate');
        navigate.endNavigate();

        this.$store.commit('mapView/setNavigateStatus', 'init');
    }

    render() {
        const { navigatingInfo, navigateStatus } = this.$store.state.mapView;
        const distanceToEnd = Math.round(navigatingInfo.distanceToEnd);
        const { isAudio } = this.$store.state.mapView;
        const voiceImg = isAudio ? 'ic_voice' : 'ic_voice_disabled';

        if (navigateStatus === 'navigating') {
            return (
                <div class={styles.navigatingBottom}>
                    <img src={require('../../assets/ic_exit.png')}
                        class={styles.close}
                        onClick={this.navigateComplete} alt=""/>

                    <span class={styles.message}>剩余{distanceToEnd}米</span>
                    <img src={require(`../../assets/${voiceImg}.png`)}
                        class={styles.voice}
                        onClick={this.toggleVoice}/>
                </div>
            );
        } else if (navigateStatus === 'navigateEnd') {
            return (
                <div class={styles.navigateEnd}>
                    <button
                        class={styles.btn}
                        onClick={this.navigateComplete}>
                        导航完成
                    </button>
                </div>
            );
        }

        return null;
    }

}
