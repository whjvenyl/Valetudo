import {
  IDeviceInfo,
  IStatusResponse,
  IValetudoApi,
  IValetudoCommandApi,
  IValetudoConsumablesApi,
  IValetudoGotoApi,
  IValetudoManualControlApi,
  IValetudoMapApi,
  IValetudoSoundApi,
  IValetudoTimerApi,
  IValetudoWifiApi,
  IValetudoZonesApi
} from '@/api';
import { ServerCommandApi } from '@/api/server/Command';
import { ServerConsumablesApi } from '@/api/server/Consumables';
import { ServerManualControlApi } from '@/api/server/ManualControl';
import { ServerMapApi } from '@/api/server/Map';
import { ServerSoundApi } from '@/api/server/Sound';
import { ServerTimerApi } from '@/api/server/Timer';
import { ServerWifiApi } from '@/api/server/Wifi';
import { ServerZonesAndGotoApi } from '@/api/server/Zones';

// tslint:disable-next-line:max-classes-per-file
export class ServerApi implements IValetudoApi {
  public Goto: IValetudoGotoApi = new ServerZonesAndGotoApi(this);
  public Command: IValetudoCommandApi = new ServerCommandApi(this);
  public Map: IValetudoMapApi = new ServerMapApi(this);
  public Zones: IValetudoZonesApi = this.Goto as ServerZonesAndGotoApi;
  public ManualControl: IValetudoManualControlApi = new ServerManualControlApi(this);
  public Timer: IValetudoTimerApi = new ServerTimerApi(this);
  public Consumables: IValetudoConsumablesApi = new ServerConsumablesApi(this);
  public Wifi: IValetudoWifiApi = new ServerWifiApi(this);
  public Sound: IValetudoSoundApi = new ServerSoundApi(this);

  private host = '/';

  public async GetCurrentStatus(): Promise<IStatusResponse> {
    const response = await this.request('api/current_status');
    const data = await response.json();
    return data;
  }

  public async GetToken(): Promise<string> {
    const res = await this.request('api/token');
    const tokenResponse: { token: string } = await res.json();
    return tokenResponse.token;
  }

  public async GetDeviceInfo(): Promise<IDeviceInfo> {
    const res = await this.request('api/get_fw_version');
    const deviceInfo: IDeviceInfo = await res.json();
    return deviceInfo;
  }

  public async request(url: string, options?: RequestInit): Promise<Response> {
    return fetch(this.host + url, options);
  }
}
