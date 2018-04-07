import { historySearchName } from '../../config';

export default {
    namespaced: true,

    state: {
        searchResult: [],
        historySearch: JSON.parse(localStorage.getItem(historySearchName) || '[]'),
    },

    mutations: {
        save(state, payload = {}) {
            for (const key in payload) {
                state[key] = payload[key];
            }
        },

        setSearchResult(state, payload) {
            state.searchResult = payload;
        },

        pushHistory(state, payload) {
            const { historySearch } = state;
            historySearch.push(payload);

            localStorage.setItem(historySearchName, JSON.stringify(historySearch));
        },

        removeByIndex(state, payload) {
            const { historySearch } = state;
            historySearch.splice(payload, 1);

            localStorage.setItem(historySearchName, JSON.stringify(historySearch));
        },

        clearHistory(state) {
            state.historySearch = [];

            localStorage.setItem(historySearchName, '[]');
        },
    },
};
