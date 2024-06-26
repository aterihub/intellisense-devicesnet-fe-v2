<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useTelemetryStore } from '@/stores/telemetry/telemetry-store'
import { storeToRefs } from 'pinia'
import BaseIndicator from '@/components/indicator/BaseIndicator.vue'
import SearchBar from '@/components/input/SearchBar.vue'

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

const whileState = ref(true)

const telemetryStore = useTelemetryStore()
const { telemetryData } = storeToRefs(useTelemetryStore())
const searchValue = ref('')

const filteredTelemetryData = computed(() => {
  if (!searchValue.value.trim()) {
    return telemetryData.value
  }
  const searchTerm = searchValue.value.trim().toLowerCase()
  return telemetryData.value.filter(telemetry => {
    return telemetry.alias.toLowerCase().includes(searchTerm) ||
      telemetry.device.toLowerCase().includes(searchTerm)
  })
})

// Function to filter each object's array
const filterArraysInObjects = (input) => {
  const filteredData = {}
  for (const [key, value] of Object.entries(input)) {
    if (Array.isArray(value)) {
      filteredData[key] = value.filter(item => {
        // Your filter condition goes here
        // For example, filter objects where data1 is greater than "5"
        return item.alias.toLowerCase().includes(searchValue.value.trim().toLowerCase())
      })
    }
  }
  return filteredData
}

// Call the function with the data




const groupedData = ref({})

onMounted(async () => {
  while (whileState.value) {
    await telemetryStore.getTelemetryData()

    groupedData.value = {}

    telemetryData.value.forEach((item) => {
      const division = item.Division
      if (!groupedData.value[division]) {
        groupedData.value[division] = []
      }
      groupedData.value[division].push(item);
    });

    // Access grouped data
    console.log(groupedData.value);
    const filteredData = filterArraysInObjects(groupedData.value)

    await delay(5000)

  }
})

onUnmounted(() => {
  whileState.value = false
})
</script>

<template>
  <div class="flex">
    <SideNav :isDashboardActive="true" />
    <div class="flex flex-col w-screen">
      <TopBar>
        <p class="text-label-primary">Dashboard</p>
      </TopBar>
      <div class="p-[20px] flex flex-col gap-[20px]">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="flex flex-col gap-3">
            <h1
              class="text-lg sm:text-[24px] border border-bkg-tertiary border-opacity-60 rounded-[2px] sm:rounded-[4px] px-6 py-2 shadow-md flex flex-col gap-2 font-semibold bg-bkg-secondary text-label-primary">
              Total Devices
            </h1>
            <div class="flex gap-3">
              <div
                class="flex-1 py-[6px] px-[10px] sm:py-[20px] sm:px-[60px]  bg-bkg-primary rounded-[6px] sm:rounded-[12px] shadow border border-bkg-secondary flex flex-col justify-center">
                <div>
                  <h1 class="text-var-blue text-label-primary self-center text-center font-semibold text-[50px] sm:text-[60px]">
                    600
                  </h1>
                  <h1 class="text-center text-label-primary text-[18px] sm:text-[22px] font-semibold">
                    Devices
                  </h1>
                </div>
              </div>
              <div class="flex flex-col gap-3">
                <div
                  class="flex-1 py-[6px] px-[10px] sm:py-[20px] sm:px-[60px]  bg-bkg-primary rounded-[6px] sm:rounded-[12px] shadow border border-bkg-secondary flex flex-col justify-center">
                  <div class="flex flex-col justify-center sm:gap-2">
                    <p class="text-var-blue text-center text-label-primary text-[24px] sm:text-[26px] font-semibold">
                      20
                    </p>
                    <p class="text-center text-label-primary text-sm sm:text-[18px] font-semibold">
                      Gateways
                    </p>
                  </div>
                </div>
                <div
                  class="flex-1 py-[6px] px-[10px] sm:py-[20px] sm:px-[60px]  bg-bkg-primary rounded-[6px] sm:rounded-[12px] shadow border border-bkg-secondary flex flex-col justify-center">
                  <div class="flex flex-col justify-center sm:gap-2">
                    <p class="text-var-blue text-center text-label-primary text-[24px] sm:text-[26px] font-semibold">
                      580
                    </p>
                    <p class="text-center text-label-primary text-sm sm:text-[18px] font-semibold">
                      Nodes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-3">

            <h1
              class="text-lg sm:text-[24px] border border-bkg-tertiary border-opacity-60 rounded-[2px] sm:rounded-[64x] px-6 py-2 shadow-md flex flex-col gap-2 font-semibold bg-bkg-secondary text-label-primary">
              Online Devices
            </h1>
            <div class="flex gap-3">
              <div
                class="flex-1 py-[6px] px-[10px] sm:py-[20px] sm:px-[60px]  bg-bkg-primary rounded-[6px] sm:rounded-[12px] shadow border border-bkg-secondary flex flex-col justify-center">
                <div>
                  <h1 class="text-var-green text-label-primary self-center text-center font-semibold text-[50px] sm:text-[60px]">
                    600
                  </h1>
                  <h1 class="text-center text-label-primary text-[18px] sm:text-[22px] font-semibold">
                    Devices
                  </h1>
                </div>
              </div>
              <div class="flex flex-col gap-3">
                <div
                  class="flex-1 py-[6px] px-[10px] sm:py-[20px] sm:px-[60px]  bg-bkg-primary rounded-[6px] sm:rounded-[12px] shadow border border-bkg-secondary flex flex-col justify-center">
                  <div class="flex flex-col justify-center sm:gap-2">
                    <p class="text-var-green text-center text-label-primary text-[24px] sm:text-[26px] font-semibold">
                      20
                    </p>
                    <p class="text-center text-label-primary text-sm sm:text-[18px] font-semibold">
                      Gateways
                    </p>
                  </div>
                </div>
                <div
                  class="flex-1 py-[6px] px-[10px] sm:py-[20px] sm:px-[60px]  bg-bkg-primary rounded-[6px] sm:rounded-[12px] shadow border border-bkg-secondary flex flex-col justify-center">
                  <div class="flex flex-col justify-center sm:gap-2">
                    <p class="text-var-green text-center text-label-primary text-[24px] sm:text-[26px] font-semibold">
                      580
                    </p>
                    <p class="text-center text-label-primary text-sm sm:text-[18px] font-semibold">
                      Nodes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <h1
              class="text-lg sm:text-[24px] border border-bkg-tertiary border-opacity-60 rounded-[2px] sm:rounded-[6p4] px-6 py-2 shadow-md flex flex-col gap-2 font-semibold bg-bkg-secondary text-label-primary">
              Offline Devices
            </h1>
            <div class="flex gap-3">
              <div
                class="flex-1 py-[6px] px-[10px] sm:py-[20px] sm:px-[60px]  bg-bkg-primary rounded-[6px] sm:rounded-[12px] shadow border border-bkg-secondary flex flex-col justify-center">
                <div>
                  <h1 class="text-var-red text-label-primary self-center text-center font-semibold text-[50px] sm:text-[60px]">
                    600
                  </h1>
                  <h1 class="text-center text-label-primary text-[18px] sm:text-[22px] font-semibold">
                    Devices
                  </h1>
                </div>
              </div>
              <div class="flex flex-col gap-3">
                <div
                  class="flex-1 py-[6px] px-[10px] sm:py-[20px] sm:px-[60px]  bg-bkg-primary rounded-[6px] sm:rounded-[12px] shadow border border-bkg-secondary flex flex-col justify-center">
                  <div class="flex flex-col justify-center sm:gap-2">
                    <p class="text-var-red text-center text-label-primary text-[24px] sm:text-[26px] font-semibold">
                      20
                    </p>
                    <p class="text-center text-label-primary text-sm sm:text-[18px] font-semibold">
                      Gateways
                    </p>
                  </div>
                </div>
                <div
                  class="flex-1 py-[6px] px-[10px] sm:py-[20px] sm:px-[60px]  bg-bkg-primary rounded-[6px] sm:rounded-[12px] shadow border border-bkg-secondary flex flex-col justify-center">
                  <div class="flex flex-col justify-center sm:gap-2">
                    <p class="text-var-red text-center text-label-primary text-[24px] sm:text-[26px] font-semibold">
                      580
                    </p>
                    <p class="text-center text-label-primary text-sm sm:text-[18px] font-semibold">
                      Nodes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div
            class="flex-1 p-[20px] bg-bkg-primary rounded-[6px] sm:rounded-[12px] shadow border border-bkg-secondary flex flex-col justify-center">
            <div class="flex flex-col gap-2">
              <div v-for="data in 4"
                class="bg-var-red rounded-lg px-[10px] py-[21px] text-white font-semibold flex flex-col gap-2 justify-start">
                <div class="flex justify-between">
                  <p class="text-xs">Device Type</p>
                  <p class="text-[10px]">Last Heard: </p>
                </div>
                <p class="text-sm">Alias</p>
              </div>
              <p class="text-xs text-label-secondary text-right">show all offline devices</p>

            </div>
          </div> -->
        </div>
        <div class="flex-1 py-8 bg-bkg-primary rounded-[6px] sm:rounded-[12px] shadow border border-bkg-secondary flex-col gap-5 flex">
          <div class="mx-8 grid grid-row gap-4 md:gap-8">
            <div class="flex flex-col md:flex-row gap-4 md:justify-between">
              <SearchBar v-model="searchValue" />
            </div>
            <div class="flex flex-col gap-10">
              <div v-for="(value, key) in groupedData" class="flex flex-col gap-4">
                <div
                  class="border border-bkg-tertiary border-opacity-60 rounded-sm px-6 py-2 shadow-md flex flex-col gap-2 font-semibold bg-bkg-secondary text-label-primary">
                  DIVISION - {{
                    key }}</div>
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <div
                    class="border border-bkg-tertiary border-opacity-60 rounded-md px-6 py-6 shadow-md flex flex-col gap-2"
                    v-for="data in value">
                    <div class="flex gap-5 items-center">
                      <BaseIndicator :status="data.status" />
                      <h1 class="font-medium text-base sm:text-lg text-label-primary">
                        {{ data.alias }}
                      </h1>
                    </div>
                    <div class="grid grid-cols-1 xl:grid-cols-2 justify-between">
                      <div class="flex flex-col gap-1">
                        <div class="flex text-[10px] sm:text-xs md:text-sm gap-1">
                          <p class="font-medium text-label-primary opacity-80">SN:</p>
                          <h2 class="font-semibold text-label-primary opacity-90">{{ data.device }}</h2>
                        </div>
                        <div class="flex text-[10px] sm:text-xs md:text-sm gap-1">
                          <p class="text-label-primary font-medium opacity-80 ">Last Heard:</p>
                          <p class="text-label-primary font-semibold opacity-90">{{ data._time }}</p>
                        </div>
                        <div class="flex text-[10px] sm:text-xs md:text-sm gap-1">
                          <p class="text-label-primary font-medium opacity-80">Humidity:</p>
                          <p class="text-label-primary font-semibold opacity-90">{{ data.humidity }}%</p>
                        </div>
                        <div class="flex text-[10px] sm:text-xs md:text-sm gap-1">
                          <p class="text-label-primary font-medium opacity-80">Temperature:</p>
                          <p class="text-label-primary font-semibold opacity-90">{{ data.temperature }}°C</p>
                        </div>
                      </div>
                      <div class="flex flex-col gap-1">
                        <div class="flex text-[10px] sm:text-xs md:text-sm gap-1">
                          <p class="text-label-primary font-medium opacity-80">Fw Version:</p>
                          <p class="text-label-primary font-semibold opacity-90">{{ data.fwVersion }}</p>
                        </div>
                        <div class="flex text-[10px] sm:text-xs md:text-sm gap-1">
                          <p class="text-label-primary font-medium opacity-80">Hw Version:</p>
                          <p class="text-label-primary font-semibold opacity-90">{{ data.hwVersion }}</p>
                        </div>
                        <div class="flex text-[10px] sm:text-xs md:text-sm gap-1">
                          <p class="text-label-primary font-medium opacity-80">Lora RSSI:</p>
                          <p class="text-label-primary font-semibold opacity-90">{{ data.loraRssi }}</p>
                        </div>
                        <div class="flex text-[10px] sm:text-xs md:text-sm gap-1">
                          <p class="text-label-primary font-medium opacity-80">Uptime:</p>
                          <p class="text-label-primary font-semibold opacity-90">{{ data.uptime }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  @apply select-none
}
</style>
