import {createApp} from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const swOptions = {
    confirmButtonColor: '#06cd89',
    cancelButtonColor: '#e50832',
};

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);


import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
const loaderOptions = {
    color: '#0321dc',
    width: 64,
    height: 64
}
createApp(App)
    .use(VueAxios, axios)
    .use(VueSweetalert2, swOptions)
    .use(VueLoading, loaderOptions)
    .component("fa", FontAwesomeIcon)
    .mount('#app')