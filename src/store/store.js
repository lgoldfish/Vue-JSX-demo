import Vue from 'vue';
import Vuex from 'vuex';

// modules
import mapView from './modules/mapView';
import searchPage from './modules/searchPage';

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        mapView,
        searchPage,
    },
});
