<script setup>
import { useLocalStorage } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'
import { useTelemetryStore } from '@/stores/telemetry/telemetry-store'
import SearchBar from '@/components/input/SearchBar.vue'
import { storeToRefs } from 'pinia'

// const delay = require('delay')
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

const whileState = ref(true)

const telemetryStore = useTelemetryStore()
const { telemetryData } = storeToRefs(useTelemetryStore())
const searchValue = ref()

onMounted(async () => {
  while (whileState.value) {
    await telemetryStore.getTelemetryData()
    await delay(10000)
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
      <div
        class=" m-[20px] flex-1 py-8 bg-bkg-primary rounded-[10px] shadow border border-bkg-secondary flex-col gap-5 flex">
        <div class="mx-8 grid grid-row gap-6 md:gap-10">
          <div class="md:w-fit">
            <Tab :tabs="tabs" @clicked="changeNavigation" />
          </div>
        </div>
        <div class="mx-8 grid grid-row gap-6 md:gap-10">
          <div class="flex flex-col md:flex-row gap-4 md:justify-between">
            <SearchBar v-model="searchValue" />
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="border border-opacity-60 rounded-lg px-6 py-6 shadow-sm flex flex-col gap-2"
              v-for="telemetry in telemetryData"
              :class="{ 'border-[#34C085] shadow-[#34C085]/50': telemetry.status === 'ONLINE', 'border-red-500 shadow-red-500/50': telemetry.status === 'OFFLINE' }">
              <h1 class="font-medium text-lg">
                {{ telemetry.alias }}
              </h1>
              <div class="flex justify-between">
                <div class="flex flex-col gap-1">
                  <div class="flex text-sm gap-1">
                    <p class="opacity-80 font-medium">SN:</p>
                    <h2 class="opacity-80 font-semibold">{{ telemetry.device }}</h2>
                  </div>
                  <div class="flex text-sm gap-1">
                    <p class="opacity-80 font-medium">Last Heard:</p>
                    <p class="opacity-80 font-semibold">{{ telemetry._time }}</p>
                  </div>
                  <div class="flex text-sm gap-1">
                    <p class="opacity-80 font-medium">Humidity:</p>
                    <p class="opacity-80 font-semibold">{{ telemetry.humidity }}%</p>
                  </div>
                  <div class="flex text-sm gap-1">
                    <p class="opacity-80 font-medium">Temperature:</p>
                    <p class="opacity-80 font-semibold">{{ telemetry.temperature }}°C</p>
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <div class="flex text-sm gap-1">
                    <p class="opacity-80 font-medium">Fw Version:</p>
                    <p class="opacity-80 font-semibold">{{ telemetry.fwVersion }}</p>
                  </div>
                  <div class="flex text-sm gap-1">
                    <p class="opacity-80 font-medium">Hw Version:</p>
                    <p class="opacity-80 font-semibold">{{ telemetry.hwVersion }}</p>
                  </div>
                  <div class="flex text-sm gap-1">
                    <p class="opacity-80 font-medium">Lora RSSI:</p>
                    <p class="opacity-80 font-semibold">{{ telemetry.loraRssi }}</p>
                  </div>
                  <div class="flex text-sm gap-1">
                    <p class="opacity-80 font-medium">Uptime:</p>
                    <p class="opacity-80 font-semibold">{{ telemetry.uptime }}</p>
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
