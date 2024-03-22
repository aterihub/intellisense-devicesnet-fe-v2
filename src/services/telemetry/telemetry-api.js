import apiClient from "../api";
 
export default {
  getTelemetryData() {
    return apiClient.get('telemetry/access-token/status-device/UBS')
  }
}