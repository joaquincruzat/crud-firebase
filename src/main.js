import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { initializeApp } from "firebase/app";
import vuetify from "./plugins/vuetify";

const firebaseConfig = {
  apiKey: "AIzaSyBqMjubfjGuEfx2KLvHWjnceDp09CD7MeU",

  authDomain: "crud-firebase-vue-1e684.firebaseapp.com",

  projectId: "crud-firebase-vue-1e684",

  storageBucket: "crud-firebase-vue-1e684.appspot.com",

  messagingSenderId: "399868881275",

  appId: "1:399868881275:web:ad22ea5a0bd9fc234d35de",
};

const app = initializeApp(firebaseConfig);
app;

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
