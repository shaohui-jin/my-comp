import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createCompLib } from "../src";
import App from "./App.vue";

const lib = createCompLib({}, { enabled: true, key: "comp-lib-demo" });

const app = createApp(App);
app.use(ElementPlus);
app.use(lib);
app.provide("compLib", lib);
app.mount("#app");
