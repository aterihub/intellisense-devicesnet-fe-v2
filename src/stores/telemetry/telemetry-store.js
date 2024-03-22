import { defineStore } from 'pinia'
import telemetryAPI from '@/services/telemetry/telemetry-api'
import { ref } from 'vue'
import moment from 'moment'

function formatUptime(uptimeInSeconds) {
  const days = Math.floor(uptimeInSeconds / (3600 * 24));
  const hours = Math.floor((uptimeInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);

  let formattedString = '';
  if (days > 0) {
      formattedString += days + ' day' + (days > 1 ? 's ' : ' ');
  }
  if (hours > 0) {
      formattedString += hours + ' hour' + (hours > 1 ? 's ' : ' ');
  }
  if (minutes > 0 || formattedString === '') {
      formattedString += minutes + ' min' + (minutes > 1 ? 's ' : ' ');
  }

  return formattedString.trim();
}

export const useTelemetryStore = defineStore('Telemetry', {
  state: () => ({
    telemetryData: ref([]),
    getTelemetryStatus: ref({
      isError: null,
      message: null,
      code: null,
    }),
    getTelemetryDataLoading: ref(false)
  }),
  actions: {
    async getTelemetryData() {
      this.getTelemetryDataLoading = true
      try {
        const res = await telemetryAPI.getTelemetryData()
        console.log(res)
        this.getTelemetryDataLoading = false
        this.telemetryData = res.data.statusDevice
        this.telemetryData.map((data) => {
          data._time = new Date(data._time).toLocaleString()
          data.humidity = data.humidity.toFixed(1)
          data.temperature = data.temperature.toFixed(1)
          data.uptime = formatUptime(data.uptime)
        })
        console.log('telemetry data data', this.telemetryData)
        this.getTelemetryStatus.code = res.status
        this.getTelemetryStatus.isError = false
        this.getTelemetryStatus.message = "Data Fetched"
      } catch (err) {
        console.error(err)
        this.getTelemetryDataLoading = false
        this.getTelemetryStatus.code = err.response.data.status
        this.getTelemetryStatus.message = JSON.stringify(err.response.data.data)
        this.getTelemetryStatus.isError = true
        return err
      }
    }
  }
})