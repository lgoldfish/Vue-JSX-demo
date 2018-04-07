import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';

@Component({})
class WhiteSpace extends Vue {
    render() {
        return (
            <div class={styles.whiteSpace} />
        );
    }
}

export default WhiteSpace;
