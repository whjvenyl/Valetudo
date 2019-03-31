import { Component } from "vue-router/types/router";
import { Module } from "vuex";

export interface AppState {
  sideBarOpen: boolean;
}

export const app: Module<AppState, any> = {
  namespaced: true,
  state: {
    sideBarOpen: false
  },
  mutations: {
    openSideBar(state) {
      state.sideBarOpen = true;
    },
    closeSideBar(state, page: Component) {
      state.sideBarOpen = false;
    },
    toggleSideBar(state) {
      state.sideBarOpen = !state.sideBarOpen;
    },
    setSideBar(state, open: boolean) {
      state.sideBarOpen = open;
    }
  }
};
