import { Api, IValetudoApi } from "@/api";
import Vue from "vue";
import Vuex from "vuex";
import { app } from "./modules/app";
import { config } from "./modules/config";
import { manualControl } from "./modules/manualControl";
import { map } from "./modules/map";
import { settings } from "./modules/settings";
import { vacuum } from "./modules/vacuum";
import { zones } from "./modules/zones";

const api: IValetudoApi = new Api();

export { api as activeApi };

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  strict: debug,
  modules: {
    app,
    vacuum,
    config,
    map,
    manualControl,
    zones,
    settings
  }
});
