import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';

@Component({
    props: {
        list: Array,
    },
})
class Debug extends Vue {
    render() {
        return (
            <ul class={styles.beaconList}>
            {
                this.list.map((item, i) => (
                    <li key={i.toString()}>
                        <span>mac: {item.mac}</span>
                        <span>accuracy: {Number(item.accuracy).toFixed(2)}</span>
                        <span>rssi: {item.rssi}</span>
                    </li>
                ))
            }
            </ul>
        );
    }
}

export default Debug;
