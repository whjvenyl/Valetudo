import {
  IAppLocale,
  ICleanSummary,
  IConsumables,
  IDeviceInfo,
  ITimer,
  IWifiSettings
} from "@/api";
import { Module } from "vuex";
import { activeApi as api } from "../index";

export interface SettingsState {
  wifi: IWifiSettings | null;
  info: IDeviceInfo | null;
  locale: IAppLocale | null;
  timers: ITimer[];
  fetching: boolean;
  fetchCount: number;
  consumables: IConsumables | null;
  cleanSummary: ICleanSummary | null;
  token: string;
  sound: {
    volume: number | null;
  };
}

export const settings: Module<SettingsState, any> = {
  namespaced: true,
  state: {
    info: null,
    locale: null,
    fetching: false,
    fetchCount: 0,
    timers: [],
    consumables: null,
    cleanSummary: null,
    wifi: null,
    token: "????????????????????????????????",
    sound: {
      volume: null
    }
  },
  mutations: {
    setFetchStatus(state, fetching: boolean) {
      if (fetching) {
        state.fetchCount++;
      } else {
        state.fetchCount--;
      }
      if (state.fetchCount < 0) {
        state.fetchCount = 0;
      }
      state.fetching = state.fetchCount > 0;
    },
    setTimer(state, timers: ITimer[]) {
      state.timers = [...timers];
    },
    setConsumables(state, consumables: IConsumables) {
      state.consumables = { ...consumables };
    },
    setCleanSummary(state, cleanSummary: any) {
      state.cleanSummary = {
        summary: { ...cleanSummary },
        records: []
      };
    },
    setCleanRecords(state, records: any) {
      Object.assign(state.cleanSummary, { records: records });
    },
    setInfo(state, info: IDeviceInfo) {
      state.info = { ...info };
    },
    setAppLocale(state, locale: IAppLocale) {
      state.locale = { ...locale };
    },
    setWifi(state, wifi: IWifiSettings) {
      state.wifi = { ...wifi };
    },
    setToken(state, token: string) {
      state.token = token;
    },
    setVolume(state, volume: number) {
      state.sound.volume = volume;
    }
  },
  actions: {
    // INFO
    async updateInfo({ commit, state }) {
      try {
        commit("setFetchStatus", true);
        commit("setInfo", await api.GetDeviceInfo());
      } finally {
        commit("setFetchStatus", false);
      }
    },
    async updateAppLocale({ commit, state }) {
      try {
        commit("setFetchStatus", true);
        commit("setAppLocale", await api.GetAppLocale());
      } finally {
        commit("setFetchStatus", false);
      }
    },

    // TIMER
    async updateTimers({ commit, state }) {
      try {
        commit("setFetchStatus", true);
        commit("setTimer", await api.Timer.Get());
      } finally {
        commit("setFetchStatus", false);
      }
    },
    async createTimer(
      { commit, dispatch },
      payload: {
        cron: string;
      }
    ) {
      try {
        commit("setFetchStatus", true);
        await api.Timer.CreateTimer(payload.cron);
      } finally {
        commit("setFetchStatus", false);
        dispatch("updateTimers");
      }
    },
    async deleteTimer(
      { commit, dispatch },
      payload: {
        id: string;
      }
    ) {
      try {
        commit("setFetchStatus", true);
        await api.Timer.DeleteTimer(payload.id);
      } finally {
        commit("setFetchStatus", false);
        dispatch("updateTimers");
      }
    },
    async setTimerState(
      { commit, dispatch },
      payload: {
        id: string;
        enabled: boolean;
      }
    ) {
      try {
        commit("setFetchStatus", true);
        await api.Timer.SetTimerState(payload.id, payload.enabled);
      } finally {
        commit("setFetchStatus", false);
        dispatch("updateTimers");
      }
    },

    // CONSUMABLES:
    async updateConsumables({ commit, state }) {
      try {
        commit("setFetchStatus", true);
        commit("setConsumables", await api.Consumables.Get());
      } finally {
        commit("setFetchStatus", false);
      }
    },
    async resetConsumable(
      { commit, dispatch },
      payload: {
        consumable: string;
      }
    ) {
      try {
        commit("setFetchStatus", true);
        await api.Consumables.Reset(payload.consumable);
      } finally {
        commit("setFetchStatus", false);
        dispatch("updateConsumables");
      }
    },

    // CLEAN RECORDS
    async updateCleanSummary({ commit, dispatch, state }) {
      try {
        commit("setFetchStatus", true);
        commit("setCleanSummary", await api.CleanSummary.Get());
        dispatch("updateCleanRecords", state);
      } finally {
        commit("setFetchStatus", false);
      }
    },
    async updateCleanRecords({ commit, state }) {
      try {
        commit("setFetchStatus", true);

        const recordIds = state.cleanSummary!.summary[3];
        const records = [];
        if (recordIds) {
          for (let i = 0; i < recordIds.length; i++) {
            records[i] = await api.CleanSummary.GetRecord(recordIds[i]);
          }
        }
        commit("setCleanRecords", records);
      } finally {
        commit("setFetchStatus", false);
      }
    },

    // WIFI
    async updateWifi({ commit, state }) {
      try {
        commit("setFetchStatus", true);
        commit("setWifi", await api.Wifi.Get());
      } finally {
        commit("setFetchStatus", false);
      }
    },
    async setWifi(
      { commit, dispatch },
      payload: {
        ssid: string;
        password: string;
      }
    ) {
      try {
        commit("setFetchStatus", true);
        const timers = await api.Wifi.Set(payload.ssid, payload.password);
      } finally {
        commit("setFetchStatus", false);
        dispatch("updateConsumables");
      }
    },

    // TOKEN
    async updateToken({ commit, state }) {
      try {
        commit("setFetchStatus", true);
        commit("setToken", await api.GetToken());
      } finally {
        commit("setFetchStatus", false);
      }
    },

    // Sound
    async updateVolume({ commit, state }) {
      try {
        commit("setFetchStatus", true);
        commit("setVolume", await api.Sound.GetVolume());
      } finally {
        commit("setFetchStatus", false);
      }
    },
    async setVolume(
      { commit, dispatch },
      payload: {
        volume: number;
      }
    ) {
      try {
        commit("setFetchStatus", true);
        await api.Sound.SetVolume(payload.volume);
      } finally {
        commit("setFetchStatus", false);
        dispatch("updateVolume");
      }
    },
    async testVolume(
      { commit, dispatch },
      payload: {
        volume: number;
      }
    ) {
      try {
        commit("setFetchStatus", true);
        await api.Sound.TestVolume();
      } finally {
        commit("setFetchStatus", false);
        dispatch("updateVolume");
      }
    }
  }
};
