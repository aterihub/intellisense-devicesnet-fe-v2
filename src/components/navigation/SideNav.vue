<template>
  <aside :class="{ 'sideBarExpanded': isExpanded }" class="sidebar">
    <!-- <div class="flex flex-col gap-5 relative px-4 w-[214px]"> -->
    <div class="sidebar-head">
      <div class="flex justify-between items-start px-4 gap-2 w-full">
        <div class="w-6 h-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M0.0010078 20.4267C-0.00487051 20.3101 0.0150206 20.1937 0.0592631 20.0856C0.103506 19.9776 0.17101 19.8807 0.256963 19.8018L11.8124 8.2669C11.9213 8.17051 12.036 8.08078 12.1558 7.99821L12.0996 7.89824H0.0384646V0H28V28H20.1465V11.3162L11.3754 20.0643H16.8129V27.9875H0.0010078V20.4267Z"
              class="fill-accent-1" />
          </svg>
        </div>
        <div class="expandButton" :class="{ 'expandButtonExpanded': isExpanded }" @click="expandSideNav">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9.5" class="fill-bkg-secondary stroke-bkg-tertiary" />
            <path
              d="M8.63645 5.84362C8.59134 5.79589 8.55608 5.73974 8.53267 5.67837C8.50926 5.61701 8.49817 5.55163 8.50003 5.48598C8.50188 5.42033 8.51665 5.35569 8.54349 5.29575C8.57033 5.2358 8.60872 5.18173 8.65645 5.13662C8.70419 5.09152 8.76034 5.05625 8.8217 5.03284C8.88307 5.00943 8.94844 4.99834 9.01409 5.0002C9.07974 5.00206 9.14439 5.01683 9.20433 5.04367C9.26427 5.07051 9.31834 5.10889 9.36345 5.15662L13.6135 9.65662C13.7012 9.74946 13.7501 9.87237 13.7501 10.0001C13.7501 10.1279 13.7012 10.2508 13.6135 10.3436L9.36345 14.8441C9.31864 14.8929 9.26458 14.9323 9.20442 14.96C9.14426 14.9877 9.07919 15.0032 9.01299 15.0056C8.94679 15.0079 8.88079 14.9971 8.81881 14.9737C8.75683 14.9503 8.70011 14.9149 8.65195 14.8694C8.60379 14.8239 8.56515 14.7693 8.53826 14.7088C8.51138 14.6483 8.4968 14.583 8.49535 14.5168C8.49391 14.4505 8.50564 14.3847 8.52986 14.323C8.55409 14.2614 8.59032 14.2052 8.63645 14.1576L12.5625 10.0001L8.63645 5.84362Z"
              class="fill-label-primary" />
          </svg>
        </div>
        <!-- <img :class="{ 'expandButtonExpanded': isExpanded }" @click="expandSideNav" alt="ateri logo" class="expandButton"
          src="../../assets/expand-btn.svg" width="125" height="125" /> -->
      </div>
    </div>
    <div class="sidebar-body">
      <SideNavIcon :isExpanded="isExpanded" :isActive="isDevicesManagementActive" :route="{ name: 'devicesManagement' }"
        menuName="Devices Provisioning"
        path="M20.88 6.36585L12.63 1.84991C12.4371 1.74338 12.2204 1.6875 12 1.6875C11.7796 1.6875 11.5629 1.74338 11.37 1.84991L3.12 6.36678C2.91357 6.47973 2.7413 6.6461 2.62123 6.84848C2.50115 7.05085 2.4377 7.28178 2.4375 7.5171V16.4833C2.4377 16.7187 2.50115 16.9496 2.62123 17.152C2.7413 17.3543 2.91357 17.5207 3.12 17.6337L11.37 22.1505C11.5629 22.2569 11.7797 22.3127 12 22.3127C12.2203 22.3127 12.4371 22.2569 12.63 22.1505L20.88 17.6337C21.0864 17.5207 21.2587 17.3543 21.3788 17.152C21.4988 16.9496 21.5623 16.7187 21.5625 16.4833V7.5171C21.5625 7.28162 21.4991 7.0505 21.379 6.84794C21.2589 6.64539 21.0866 6.47887 20.88 6.36585ZM11.9063 2.83616C11.9338 2.82106 11.9648 2.81315 11.9963 2.81315C12.0277 2.81315 12.0587 2.82106 12.0862 2.83616L19.9228 7.12522L12 11.4602L4.07719 7.12522L11.9063 2.83616ZM3.65625 16.6474C3.6275 16.6308 3.60367 16.6069 3.5872 16.578C3.57073 16.5492 3.5622 16.5165 3.5625 16.4833V8.4L11.1 12.6342V20.7L3.65625 16.6474ZM20.3363 16.6474L12.63 20.7V12.6342L20.3363 8.4L20.4375 16.4815C20.4381 16.515 20.4298 16.5481 20.4133 16.5772C20.3968 16.6064 20.3728 16.6307 20.3438 16.6474H20.3363Z" />
      <SideNavIcon :isExpanded="isExpanded" :isActive="isMasterDataActive" :route="{ name: 'masterData' }"
        menuName="Master Data">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M14.1667 2.49984V17.4998M2.5 5.83317H5.83333M2.5 9.99984H5.83333M2.5 14.1665H5.83333M11.25 18.3332H16.25M11.25 1.6665H16.25H16.7869C17.3392 1.6665 17.7869 2.11422 17.7869 2.6665V17.3332C17.7869 17.8855 17.3392 18.3332 16.7869 18.3332H11H5.5C4.94772 18.3332 4.5 17.8855 4.5 17.3332V2.6665C4.5 2.11422 4.94772 1.6665 5.5 1.6665H11.25Z"
            :class="{'stroke-accent-1': isMasterDataActive , 'stroke-label-secondary'  : !isMasterDataActive}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </SideNavIcon>
    </div>
    <div class="sidebar-foot">
      <SideNavIcon @click="signOut" :route="{ name: 'login' }" menuName="Logout">
        <path
          d="M12.085 3.3418C11.9012 3.3418 11.725 3.41479 11.5951 3.54472C11.4652 3.67464 11.3922 3.85086 11.3922 4.03461C11.3922 4.21835 11.4652 4.39457 11.5951 4.5245C11.725 4.65443 11.9012 4.72742 12.085 4.72742C13.8612 4.72742 15.5646 5.43302 16.8206 6.68898C18.0766 7.94495 18.7822 9.6484 18.7822 11.4246C18.7822 13.2008 18.0766 14.9043 16.8206 16.1602C15.5646 17.4162 13.8612 18.1218 12.085 18.1218C11.9012 18.1218 11.725 18.1948 11.5951 18.3247C11.4652 18.4546 11.3922 18.6309 11.3922 18.8146C11.3922 18.9984 11.4652 19.1746 11.5951 19.3045C11.725 19.4344 11.9012 19.5074 12.085 19.5074C14.2287 19.5074 16.2846 18.6558 17.8004 17.14C19.3162 15.6242 20.1678 13.5683 20.1678 11.4246C20.1678 9.28091 19.3162 7.22502 17.8004 5.7092C16.2846 4.19338 14.2287 3.3418 12.085 3.3418Z" />
        <path
          d="M7.95583 9.14363C8.07821 9.0123 8.14483 8.83859 8.14166 8.65911C8.1385 8.47962 8.06579 8.30837 7.93885 8.18144C7.81192 8.0545 7.64067 7.98179 7.46118 7.97862C7.2817 7.97546 7.10799 8.04208 6.97665 8.16446L4.2054 10.9357C4.07566 11.0656 4.00279 11.2417 4.00279 11.4253C4.00279 11.6089 4.07566 11.785 4.2054 11.9149L6.97665 14.6861C7.04008 14.7542 7.11657 14.8088 7.20155 14.8467C7.28654 14.8845 7.37828 14.9049 7.4713 14.9065C7.56433 14.9082 7.65673 14.8911 7.74299 14.8562C7.82926 14.8214 7.90763 14.7695 7.97342 14.7037C8.0392 14.6379 8.09107 14.5596 8.12591 14.4733C8.16076 14.387 8.17787 14.2946 8.17623 14.2016C8.17459 14.1086 8.15423 14.0168 8.11636 13.9319C8.07849 13.8469 8.0239 13.7704 7.95583 13.707L6.36698 12.1181H13.9325C14.1162 12.1181 14.2925 12.0451 14.4224 11.9152C14.5523 11.7853 14.6253 11.609 14.6253 11.4253C14.6253 11.2416 14.5523 11.0653 14.4224 10.9354C14.2925 10.8055 14.1162 10.7325 13.9325 10.7325H6.36698L7.95583 9.14363Z" />
      </SideNavIcon>
    </div>
  </aside>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth/auth-store'
import SideNavIcon from '@/components/navigation/SideNavIcon.vue'
import { onMounted, ref } from 'vue';
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
const { isDark } = storeToRefs(useThemeStore())

const props = defineProps({
  isDevicesManagementActive: {
    type: Boolean,
    default: false
  },
  isMasterDataActive: {
    type: Boolean,
    default: false
  }
})

const authStore = useAuthStore();
async function signOut() {
  await authStore.signOut();
}
const goBack = () => {
  router.go(-1);
}

const isExpanded = useLocalStorage('sideNavExpanded',false)

function expandSideNav() {
  isExpanded.value = !isExpanded.value
}


</script>

<style scoped>
.sidebar {
  @apply sticky h-screen w-[60px] py-[16px] items-center z-20 gap-10 top-0 left-0 border-r-2 flex flex-col justify-between transition-all ease-in-out duration-200 bg-bkg-primary border-label-tertiary
}


.sideBarExpanded {
  @apply w-[240px]
}

.sidebar-head {
  @apply flex flex-col justify-center items-start gap-5 w-full
}

.sidebar-body {
  @apply flex flex-col justify-center items-start gap-10 w-full overflow-x-hidden
}

.sidebar-body img {
  @apply h-8
}

.sidebar-foot {
  @apply flex justify-center items-start w-full flex-col gap-10 overflow-x-hidden
}

/* .expandButton {
  @apply w-6 h-6 cursor-pointer absolute z-20 left-[45px] top-[16px] transition-all duration-200 ease-in-out
} */
.expandButton {
  @apply w-6 h-6 cursor-pointer z-20 transition-all duration-200 ease-in-out flex items-center
}

.expandButtonExpanded {
  @apply rotate-180 left-[200px]
}</style>