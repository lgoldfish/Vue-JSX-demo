import Vue from 'vue';
import Component from 'vue-class-component';
import './index.css';

import map from './map';

// routes
import IndexPage from './routes/IndexPage';
import OperationSearch from './routes/OperationSearch';
import QuickSearch from './routes/QuickSearch';
import SearchResult from './routes/SearchResult';
import Debug from './components/common/Debug';

import store from './store/store';

const isDebug = location.href.indexOf('debug=true') !== -1;

@Component({})
class App extends Vue {

    data() {
        return {
            curPath: this._getPath(),
            beaconList: [],
        };
    }

    created() {
        !location.hash && (location.hash = '/');
        window.addEventListener('hashchange', () => {
            this.curPath = this._getPath();
        });
        if (isDebug) {
            const locationMng = map.getPlugin('location');
            locationMng.on('beacons', (beacons) => {
                this.beaconList = beacons;
            });
        }
    }

    _getPath() {
        const str = location.hash.split('?')[0];
        return str.replace(/#/, '');
    }

    updated() {
        if (this.curPath === '/') {
            map.mapView.resize();
        }
    }

    render() {
        return (
            <div id="app">
                {isDebug && <Debug list={this.beaconList}/>}
                <IndexPage isShow={this.curPath === '/'}/>
                { this.curPath === '/operationSearch' && <OperationSearch /> }
                { this.curPath === '/quickSearch' && <QuickSearch /> }
                { this.curPath === '/searchResult' && <SearchResult /> }
            </div>
        );
    }
}

function render() {
    return new Vue({
        el: '#app',
        store,
        components: { App },
        template: '<App />',
    });
}

export default render;
