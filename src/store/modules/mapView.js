export default {
    namespaced: true,

    state: {
        navigateStatus: 'init',
        isHasNaviLine: false,
        startInfo: { },
        endInfo: { },
        pickInfo: { },
        navigatingInfo: { },
        isCanSetStart: false,
        forceUpdate: false,
        isAudio: true, // 是否打开语音
    },

    mutations: {
        save(state, payload = {}) {
            for (const key in payload) {
                state[key] = payload[key];
            }
        },

        setNavigateStatus(state, payload) {
            state.navigateStatus = payload;
        },

        setPickInfo(state, payload) {
            state.pickInfo = payload;
        },

        setStartInfo(state, payload) {
            state.startInfo = payload;
        },

        setEndInfo(state, payload) {
            state.endInfo = payload;
        },

        setNavigatingInfo(state, payload) {
            state.navigatingInfo = payload;
        },
    },
};
