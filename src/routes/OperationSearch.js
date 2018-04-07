import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';
import { hotSearch } from '../config';

// components
import TopSearch from '../components/searchPage/TopSearch';
import HistorySearch from '../components/searchPage/HistorySearch';

import map from '../map';
import { tip } from '../../NGRMap/utils/tool';

@Component({})
class OperationSearch extends Vue {
    back() {
        history.back();
    }

    mounted() {
        // 自动获取焦点
        this.$refs.topSearch.$refs.inputDom.focus();
    }

    async searchByKeyword(value) {
        try {
            const res = await map.searchByKeyword(value);
            if (res.length === 0) {
                tip('无搜索结果请换个关键字');
                return;
            }
            this.$store.commit('searchPage/setSearchResult', res);
            this.$store.commit('searchPage/pushHistory', value);
            location.hash = '/searchResult';
        } catch (e) {
            tip('您网络异常,请稍后重试');
            throw e;
        }
    }

    render() {
        return (
            <div class={styles.operationSearch}>
                <TopSearch backHandle={this.back}
                    focusHandle={() => {}}
                    searchHandle={this.searchByKeyword}
                    ref="topSearch"/>
                <div class={styles.hotSearch}>
                    <div class={styles.title}>热门搜索</div>
                    <div class={styles.content}>
                    {
                        hotSearch.map((item, i) => (
                            <span class={styles.item}
                                onClick={() => this.searchByKeyword(item.value)}
                                key={i.toString()}>
                                {item.text}
                            </span>
                        ))
                    }
                    </div>
                </div>
                <HistorySearch />
            </div>
        );
    }
}

export default OperationSearch;
