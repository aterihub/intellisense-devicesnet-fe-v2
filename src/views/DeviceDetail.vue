<script>
import { onMounted, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import IconButton from '@/components/input/IconButton.vue'
import BaseIndicator from '@/components/indicator/BaseIndicator.vue'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
export default {
  components: {
    IconButton, BaseIndicator
  },
  props: ['id'],

  setup() {
    const { isDark } = storeToRefs(useThemeStore())
    const selectedComponent = useLocalStorage('SelectedDeviceTab', 'GatewayMaster')
    onMounted(async () => {

    })

    return {
      selectedComponent,
      isDark
    }
  }
}
</script>
<template>
  <div class="flex relative">
    <SideNav :isDevicesManagementActive="true" />
    <div class="flex flex-col w-screen">
      <TopBar>
        <div class="flex gap-2">
          <p >Back</p>
          <p >Device Detail
          </p>
        </div>
      </TopBar>
      <div class="general-info">
        <img src="../assets//device-img.png" class="device-img">
        <div class="flex flex-col w-full gap-4">
          <div class="flex justify-between items-start w-full">
            <div class="flex gap-5 items-center">
              <BaseIndicator :status="'ONLINE'" />
              <h1>Device Name</h1>
            </div>
            <IconButton type="submit" class="outlined" label="Edit" @click="">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3.5 3.5H3C2.73478 3.5 2.48043 3.60536 2.29289 3.79289C2.10536 3.98043 2 4.23478 2 4.5V9C2 9.26522 2.10536 9.51957 2.29289 9.70711C2.48043 9.89464 2.73478 10 3 10H7.5C7.76522 10 8.01957 9.89464 8.20711 9.70711C8.39464 9.51957 8.5 9.26522 8.5 9V8.5"
                  stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M8 2.50005L9.5 4.00005M10.1925 3.29255C10.3894 3.09563 10.5001 2.82854 10.5001 2.55005C10.5001 2.27156 10.3894 2.00448 10.1925 1.80755C9.99558 1.61063 9.72849 1.5 9.45 1.5C9.17151 1.5 8.90442 1.61063 8.7075 1.80755L4.5 6.00005V7.50005H6L10.1925 3.29255Z"
                  stroke="black" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </IconButton>
          </div>
          <div class="grid grid-cols-4 flex-1">
            <div class="flex flex-col col-span-1 justify-between">
              <div class="flex gap-[10px]">
                <p class="text-label_light_secondary">ID:</p>
                <p class="text-label_light_primary">AIRIO1283912489</p>
              </div>
              <div class="flex gap-[10px]">
                <p class="text-label_light_secondary">Type:</p>
                <p class="text-label_light_primary">Node</p>
              </div>
              <div class="flex gap-[10px]">
                <p class="text-label_light_secondary">Firmware Version:</p>
                <p class="text-label_light_primary">2.0.0</p>
              </div>
            </div>
            <div class="flex col-span-1">
              <div class="flex flex-col col-span-1 justify-between">
                <div class="flex gap-[10px]">
                  <p class="text-label_light_secondary">Hardware Version:</p>
                  <p class="text-label_light_primary">2.0.0</p>
                </div>
                <div class="flex gap-[10px]">
                  <p class="text-label_light_secondary">Server Protocol Version:</p>
                  <p class="text-label_light_primary">2.0.0</p>
                </div>
                <div class="flex gap-[10px]">
                  <p class="text-label_light_secondary">Radio Protocol Version:</p>
                  <p class="text-label_light_primary">2.0.0</p>
                </div>
              </div>

            </div>
            <div class="col-span-2">
              <p class="text-label_light_secondary">Notes:</p>
              <p class="text-label_light_primary">Click the edit button to keep notes on this device, like 'Deployed to
                customer site'.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="m-[20px] flex h-[3000px] py-8 bg-white rounded-[10px] shadow border border-zinc-100 flex-col gap-5">
        <!-- <div class="mx-8 grid grid-row gap-6 md:gap-10 ">

        </div>
        <component :is="selectedComponent" /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.general-info {
  @apply h-52 shadow-md flex sticky top-[60px] px-5 py-8 gap-10 border-b
}

.general-info h1 {
  @apply font-medium text-2xl
}

.device-img {
  @apply h-full w-fit
}
</style>
