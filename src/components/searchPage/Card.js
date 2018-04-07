import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';

@Component({
    props: {
        list: Array,
        itemClick: Function,
    },
})
class Card extends Vue {
    clickHandle(value) {
        this.itemClick && this.itemClick(value);
    }

    render() {
        return (
            <ul class={styles.card}>
            {
                (this.list || []).map((item, i) => (
                    <li key={i.toString()} class={styles.item}
                        onClick={() => this.clickHandle(item.value)}>
                        <img src={item.iconUrl} alt=""/>
                        <span>{item.text}</span>
                    </li>
                ))
            }
            </ul>
        );
    }
}

export default Card;
