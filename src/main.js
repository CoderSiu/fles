import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import { createApp } from 'vue'
import App from './App.vue'

import router from "./router";
import appInfo from "./app-info";
const app = createApp(App);
app.config.globalProperties.appInfo = appInfo;
app.config.globalProperties.productionTip = false;
app.use(router);
app.mount('#app')