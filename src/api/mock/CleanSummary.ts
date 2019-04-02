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
            21752,
            422265000,
            30,
            [1537424717, 1536430488, 1536323669, 1536286394, 1536286267]
          ]),
        this.parent.fakeDelay
      );
    });
  }

  public async GetRecord(id: number): Promise<ICleanRecord> {
    return new Promise((res, rej) => {
      res({
        startTime: 1,
        endTime: 1,
        duration: 1,
        area: 1,
        errorCode: 1,
        errorDescription: "no error",
        finishedFlag: true
      });
    });
  }
}
