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
        <v-ons-list-title style="margin-top:5px;"
          >Last Cleaning Runs</v-ons-list-title
        >

        <v-ons-list>
          <v-ons-list-item
            v-for="(recordId, index) in cleanSummary.summary[3]"
            v-if="index < 5 && cleanSummary.records[index]"
          >
            <v-ons-row>
              <v-ons-col></v-ons-col>
              <v-ons-col width="400px" vertical-align="center" style='text-align:center;'>{{
                formatTimestamp(index, cleanSummary.records[index].startTime)
              }}</v-ons-col>
              <v-ons-col></v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col></v-ons-col>
              <v-ons-col width="100px" vertical-align="center"
                >Duration</v-ons-col
              >
              <v-ons-col width="150px" vertical-align="center">{{
                formatDuration(cleanSummary.records[index].duration)
              }}</v-ons-col>
              <v-ons-col></v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col></v-ons-col>
              <v-ons-col width="100px" vertical-align="center">Area</v-ons-col>
              <v-ons-col width="150px" vertical-align="center"
                >{{ formatArea(cleanSummary.records[index].area) }} m<sup>2</sup></v-ons-col
              >
              <v-ons-col></v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col></v-ons-col>
              <v-ons-col width="100px" vertical-align="center"
                >Completed</v-ons-col
              >
              <v-ons-col width="150px" vertical-align="center">
                <v-ons-icon
                  :icon="
                    cleanSummary.records[index].finishedFlag
                      ? 'fa-check-circle'
                      : 'fa-times-circle'
                  "
                  :style="
                    cleanSummary.records[index].finishedFlag
                      ? 'color: green'
                      : 'color:red'
                  "
                ></v-ons-icon>
              </v-ons-col>
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

  private formatDuration(durationTotalSeconds: number) {
    var durationSeconds = durationTotalSeconds % 60;
    var durationMinutes = Math.floor(durationTotalSeconds / 60);
    var durationHours = Math.floor(durationTotalSeconds / 3600);
    return (
      durationHours +
      ":" +
      this.formatTwoDigitNumber(durationMinutes) +
      ":" +
      this.formatTwoDigitNumber(durationSeconds)
    );
  }

  private formatArea(area: number) {
    return Math.round(area / 1000000);
  }

  private formatTimestamp(index: number, startTime: number) {
    var currentEntryId = this.cleanSummary.records!.length - index;
    var fromTime = new Date(startTime).toUTCString();
   return "#" + currentEntryId + " started on " + fromTime;
  }

  private formatTwoDigitNumber(number: number) {
    if (number >= 0 && number <= 9) {
      return "0" + number;
    } else return number;
  }
}
</script>
