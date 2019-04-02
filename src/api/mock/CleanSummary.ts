import { ICleanRecord, IValetudoCleanSummaryApi } from "@/api";
import { MockApi } from "@/api/mock/index";

export class MockCleanSummaryApi implements IValetudoCleanSummaryApi {
  private parent: MockApi;

  constructor(parent: MockApi) {
    this.parent = parent;
  }

  public async Get(): Promise<any> {
    return new Promise((res, rej) => {
      setTimeout(
        () =>
          res([
            16414, // Total cleaning time in sec
            252165000, // total area (in cm2)
            9, // Total # cleanups
            [1537424717, 1536430488, 1536323669, 1536286394, 1536286267] // Array clean of cleaning records ID's
          ]),
        this.parent.fakeDelay
      );
    });
  }

  public async GetRecord(id: number): Promise<ICleanRecord> {
    return new Promise((res, rej) => {
      res({
        startTime: 1497163727, // Start time (unix timestamp)
        endTime: 1497165195, // End time (unix timestamp)
        duration: 1468, // Cleaning duration in secs
        area: 22902500, // Area (in cm²)
        errorCode: 1,
        errorDescription: "no error",
        finishedFlag: true // Completed (Y/N)
      });
    });
  }
}
