import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
import store from './store';
import filter from './filter';

for (const key in filter) {
    if (filter.hasOwnProperty(key)) {
        const element = filter[key]
        Vue.filter(key, element)
    }
}

Vue.prototype.$Store = store;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
