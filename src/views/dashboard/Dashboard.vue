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

onMounted(async () => {
  while (whileState.value) {
    await telemetryStore.getTelemetryData()
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
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div class="border border-bkg-tertiary border-opacity-60 rounded-lg px-6 py-6 shadow-sm flex flex-col gap-2"
              v-for="telemetry in filteredTelemetryData">
              <div class="flex gap-5 items-center">
                <BaseIndicator :status="telemetry.status" />
                <h1 class="font-medium text-base sm:text-lg text-label-primary">
                  {{ telemetry.alias }}
                </h1>
              </div>
              <div class="flex flex-col xl:flex-row justify-between">
                <div class="flex flex-col gap-1">
                  <div class="flex text-xs md:text-sm gap-1">
                    <p class="font-medium text-label-primary opacity-80">SN:</p>
                    <h2 class="font-semibold text-label-primary opacity-90">{{ telemetry.device }}</h2>
                  </div>
                  <div class="flex text-xs md:text-sm gap-1">
                    <p class="text-label-primary font-medium opacity-80 ">Last Heard:</p>
                    <p class="text-label-primary font-semibold opacity-90">{{ telemetry._time }}</p>
                  </div>
                  <div class="flex text-xs md:text-sm gap-1">
                    <p class="text-label-primary font-medium opacity-80">Humidity:</p>
                    <p class="text-label-primary font-semibold opacity-90">{{ telemetry.humidity }}%</p>
                  </div>
                  <div class="flex text-xs md:text-sm gap-1">
                    <p class="text-label-primary font-medium opacity-80">Temperature:</p>
                    <p class="text-label-primary font-semibold opacity-90">{{ telemetry.temperature }}°C</p>
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <div class="flex text-xs md:text-sm gap-1">
                    <p class="text-label-primary font-medium opacity-80">Fw Version:</p>
                    <p class="text-label-primary font-semibold opacity-90">{{ telemetry.fwVersion }}</p>
                  </div>
                  <div class="flex text-xs md:text-sm gap-1">
                    <p class="text-label-primary font-medium opacity-80">Hw Version:</p>
                    <p class="text-label-primary font-semibold opacity-90">{{ telemetry.hwVersion }}</p>
                  </div>
                  <div class="flex text-xs md:text-sm gap-1">
                    <p class="text-label-primary font-medium opacity-80">Lora RSSI:</p>
                    <p class="text-label-primary font-semibold opacity-90">{{ telemetry.loraRssi }}</p>
                  </div>
                  <div class="flex text-xs md:text-sm gap-1">
                    <p class="text-label-primary font-medium opacity-80">Uptime:</p>
                    <p class="text-label-primary font-semibold opacity-90">{{ telemetry.uptime }}</p>
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
