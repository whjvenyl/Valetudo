<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Settings</v-ons-back-button>
      </div>
      <div class="center">Cleaning History</div>
      <div class="right"></div>
    </v-ons-toolbar>


    <div class="content">
      <v-ons-progress-bar
          indeterminate="indeterminate"
          v-if="fetching"
      ></v-ons-progress-bar>
      <div style="text-align: center" v-if="!cleanSummary">
        <br />
        <ons-progress-circular indeterminate></ons-progress-circular>
      </div>
      <div v-if="cleanSummary">
        <v-ons-list-title style="margin-top:5px;">Last Cleaning Runs</v-ons-list-title>

        <v-ons-list>
          <v-ons-list-item v-for="(recordId, index) in cleanSummary.summary[3]" v-if="index < 5">
            <v-ons-row>
              <v-ons-col></v-ons-col>
              <v-ons-col width="400px" vertical-align="center">{{cleanSummary.records[index].startTime}}</v-ons-col>
              <v-ons-col></v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col></v-ons-col>
              <v-ons-col width="100px" vertical-align="center">Duration</v-ons-col>
              <v-ons-col width="150px" vertical-align="center">{{cleanSummary.records[index].duration}}</v-ons-col>
              <v-ons-col></v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col></v-ons-col>
              <v-ons-col width="100px" vertical-align="center">Area</v-ons-col>
              <v-ons-col width="150px" vertical-align="center">{{cleanSummary.records[index].area}}</v-ons-col>
              <v-ons-col></v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col></v-ons-col>
              <v-ons-col width="100px" vertical-align="center">Completed</v-ons-col>
              <v-ons-col width="150px" vertical-align="center">{{cleanSummary.records[index].finishedFlag}}</v-ons-col>
              <v-ons-col></v-ons-col>
            </v-ons-row>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </div>
  </v-ons-page>
</template>

<script lang="ts">
  import { ICleanSummary } from "@/api";
  import { Component, Vue } from "vue-property-decorator";
  import { namespace } from "vuex-class";

  const settings = namespace("settings");

  @Component
  export default class CleaningSettings extends Vue {
    @settings.State private cleanSummary!: ICleanSummary;
    @settings.State private fetching!: boolean;
    @settings.Action private updateCleanSummary!: () => Promise<boolean>;

    public mounted() {
      this.updateCleanSummary();
    }
  }
</script>