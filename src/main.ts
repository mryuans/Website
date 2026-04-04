// Modules
import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import MasonryWall from "@yeger/vue-masonry-wall";

// Vue
import App from "./App.vue";

// JS
import "./assets/ts/fontawesome";
// import "./assets/ts/cursor";
import router from "./router";

// CSS
import "./assets/css/reset.styl";
// import "./assets/css/cursor.styl";
import "katex/dist/katex.min.css";
import "overlayscrollbars/overlayscrollbars.css";

// Console
const consoleMessage = () => {
    const year = new Date().getFullYear();
    console.log(`
┌────────────────────────────────────────────────────┐
│                                                    │
│                     Notebook                       │
│             Part of the Alpha Project.             │
│                                                    │
├────────────────────────────────────────────────────┤
│                                                    │
│  - [GPL-3.0 License]          for code             │
│  - [CC BY-NC-SA 4.0 License]  for notes            │ 
│                                                    │
│                                                    │
│  Special thank to Xecades,                         │
│     for his talents and spirits to his creation.   │
│                                                    │
│     Copyright © 2026 - ${year} mryuans                │
│                                                    │
└────────────────────────────────────────────────────┘
    `);
};

// Main
(async () => {
    consoleMessage();

    const app = createApp(App);
    app.use(router);
    app.use(MasonryWall);
    app.component("font-awesome-icon", FontAwesomeIcon);
    app.mount("#app");
})();
