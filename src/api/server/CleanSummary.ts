import { ICleanRecord, ICleanSummary, IValetudoCleanSummaryApi } from "@/api";
import { ServerApi } from "@/api/server";

export class ServerCleanSummaryApi implements IValetudoCleanSummaryApi {
  private parent: ServerApi;

  constructor(parent: ServerApi) {
    this.parent = parent;
  }

  public async Get(): Promise<ICleanSummary> {
    const response = await this.parent.request("api/clean_summary");
    return (await response.json()) as ICleanSummary;
  }

  public async GetRecord(id: number): Promise<ICleanRecord> {
    const response = await this.parent.request("api/clean_record", {
      method: "PUT",
      body: JSON.stringify({
        recordId: id
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    return (await response.json()) as ICleanRecord;
  }
}
