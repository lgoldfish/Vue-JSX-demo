import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';

import Modal from '../common/Modal';

import map from '../../map';
import { tip } from '../../../NGRMap/utils/tool';

import imgLocation from '../../assets/ic_list_location@2x.png';
import imgClose from '../../assets/ic_list_close@2x.png';

@Component({})
class HistorySearch extends Vue {
    clearHistory() {
        const { historySearch } = this.$store.state.searchPage;
        if (historySearch.length === 0) {
            return;
        }

        Modal.alert('确认清空历史搜索', '', [
            { text: '取消', onPress: () => { } },
            {
                text: '确定',
                onPress: () => {
                    this.$store.commit('searchPage/clearHistory');
                },
            },
        ]);
    }

    async searchByKeyword(value) {
        try {
            const res = await map.searchByKeyword(value);
            if (res.length === 0) {
                tip('无搜索结果请换个关键字');
                return;
            }
            this.$store.commit('searchPage/setSearchResult', res);
            location.hash = '/searchResult';
        } catch (e) {
            tip('您网络异常,请稍后重试');
            throw e;
        }
    }

    render() {
        const { historySearch } = this.$store.state.searchPage;
        return (
            <div class={styles.historySearch}>
                <div class={styles.title}>历史搜索</div>
                <ul class={styles.list}>
                {
                    historySearch.map((item, i) => (
                        <li key={i.toString()} onClick={() => this.searchByKeyword(item)}>
                            <span class={styles.leftContainer}>
                                <img src={imgLocation} alt=""/>
                                {item}
                            </span>
                            <img src={imgClose} alt=""
                                onClick={(e) => {
                                    e.stopPropagation();
                                    this.$store.commit('searchPage/removeByIndex', i);
                                }}
                                class={styles.close}/>
                        </li>
                    ))
                }
                </ul>
                <div class={styles.operate}
                    onClick={this.clearHistory}>
                    {historySearch.length === 0 ? '暂无历史搜索' : '清空历史记录'}
                </div>
            </div>
        );
    }
}

export default HistorySearch;
