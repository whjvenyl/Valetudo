<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Settings</v-ons-back-button>
      </div>
      <div class="center">Info</div>
      <div class="right"></div>
    </v-ons-toolbar>
    <div class="content">
      <v-ons-progress-bar indeterminate v-if="fetching"></v-ons-progress-bar>
      <div v-if="info">
        <v-ons-list-title style="margin-top:5px;">System</v-ons-list-title>
        <v-ons-list>
          <v-ons-list-item>
            <div class="left">
              Firmware version:
            </div>
            <div class="right">
              {{ info.version }}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="left">
              Firmware build:
            </div>
            <div class="right">
              {{ info.build }}
            </div>
          </v-ons-list-item>
          <ons-list-item>
            <div class="left">
              Valetudo version:
            </div>
            <div class="right" id="info_valetudo_version">
              ???
            </div>
          </ons-list-item>
        </v-ons-list>
      </div>
      <div v-if="locale">
        <ons-list-title style="margin-top:5px;">App Locale</ons-list-title>
        <ons-list>
          <ons-list-item>
            <div class="left">
              Name:
            </div>
            <div class="right" id="app_locale_name">
              {{ locale.name }}
            </div>
          </ons-list-item>
          <ons-list-item>
            <div class="left">
              Bom:
            </div>
            <div class="right" id="app_locale_bom">
              {{ locale.bom }}
            </div>
          </ons-list-item>
          <ons-list-item>
            <div class="left">
              Location:
            </div>
            <div class="right" id="app_locale_location">
              {{ locale.location }}
            </div>
          </ons-list-item>
          <ons-list-item>
            <div class="left">
              Language:
            </div>
            <div class="right" id="app_locale_language">
              {{ locale.language }}
            </div>
          </ons-list-item>
          <ons-list-item>
            <div class="left">
              Timezone:
            </div>
            <div class="right" id="app_locale_timezone">
              {{ locale.timezone }}
            </div>
          </ons-list-item>
          <ons-list-item>
            <div class="left">
              Logserver:
            </div>
            <div class="right" id="app_locale_logserver">
              {{ locale.logserver }}
            </div>
          </ons-list-item>
        </ons-list>
      </div>
    </div>
  </v-ons-page>
</template>

<script lang="ts">
import { IAppLocale, IDeviceInfo } from "@/api";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const settings = namespace("settings");

@Component
export default class InfoSettings extends Vue {
  @settings.State private info!: IDeviceInfo;
  @settings.State private locale!: IAppLocale;
  @settings.State private fetching!: boolean;
  @settings.Action private updateInfo!: () => Promise<boolean>;
  @settings.Action private updateAppLocale!: () => Promise<boolean>;

  public async mounted() {
    this.updateInfo();
    this.updateAppLocale();
  }
}
</script>
