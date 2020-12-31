import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import { createApp }  from "vue";
import router from "./router";
import { createI18n } from 'vue-i18n'
import {User} from './model/User'

import App from "./App.vue";
import appInfo from "./app-info";

const i18n = createI18n({
    locale: 'chs',
    messages: {
      chs: require ('./locale/chs.js'),
      eng: require ('./locale/eng.js'),
    }
  })

const curUser: User | null = null;

const app = createApp(App);

app.use(router);
app.config.globalProperties.$appInfo = appInfo;
app.config.globalProperties.$curUser = curUser;
app.use(i18n);
app.mount('#app');