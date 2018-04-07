import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';
import { tip, loading, hideLoading } from '../../../NGRMap/utils/tool';
import Back from '../common/Back';

@Component({
    props: {
        backHandle: Function,
        focusHandle: Function,
        searchHandle: Function,
        defaultValue: String,
    },
})
class TopSearch extends Vue {

    chineseInputStart() {
        this.isChineseInput = true;
    }

    chineseInputEnd(e) {
        const value = e.target.value.trim();
        this._search(value);
    }

    _search(value) {
        if (this.timer) {
            clearTimeout(this.timer);
            delete this.timer;
        }
        this.timer = setTimeout(() => {
            this.searchHandle && this.searchHandle(value);
        }, 300);
    }

    inputSearch(e) {
        if (this.isChineseInput) {
            return;
        }
        const value = e.target.value.trim();
        this._search(value);
    }

    mounted() {
        this.$refs.inputDom.value = this.defaultValue || '';
    }

    render() {
        return (
            <div class={styles.topSearch}>
                <div class={styles.container}>
                    <Back backHandle={this.backHandle} customClass="customSearch"/>
                    <span class={styles.splitLine} />
                    <input type="text"
                        placeholder="请输入目的地"
                        onFocus={this.focusHandle}
                        onCompositionEnd={this.chineseInputEnd}
                        onInput={this.inputSearch}
                        onCompositionStart={this.chineseInputStart}
                        class={styles.searchInput}
                        ref="inputDom"/>
                </div>
            </div>
        );
    }
}

export default TopSearch;
