import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';

@Component({
    props: {
        backHandle: Function,
        customClass: String,
    },
})
class Back extends Vue {
    render() {
        return (
            <span class={`${styles.back} ${this.customClass}`}
                onClick={this.backHandle}>
                <img src={require('../../assets/back.png')} alt=""/>
            </span>
        );
    }
}

export default Back;
