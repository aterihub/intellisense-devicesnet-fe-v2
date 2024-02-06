<template>
  <div>
    <!-- <alert 
  :message ="status.message"
    :modalActive="modalActive"
    :isError="status.isError"
     @close="closeNotification" /> -->
    <transition name="fade" >
      <div class="modal" v-show="isOpen">
        <transition name="drop-in">
          <div class="modal-inner" v-show="isOpen" ref="target">
            <div class="modal-content">
              <h1 class="title">{{ title }}</h1>
              <VeeForm :validation-schema="schema" v-slot="{ handleSubmit }" as="div" ref="form">
                <form @submit="handleSubmit($event, onSubmit)" class="form-wrapper">
                  <BaseInput name="name" type="text" placeholder="Device ID" label="Device ID" />
                  <BaseDropdown name="deviceType" placeholder="Device Type" label="Device Type" :options="types" />
                  <div class="flex justify-between gap-10">
                    <BaseButton type="button" class="secondary" :label="cancelLabel" @click="cancelForm" />
                    <BaseButton type="submit" class="primary" :label="registerLabel" />
                  </div>
                </form>
              </VeeForm>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

  
<script setup>
import BaseInput from '@/components/input/BaseInput.vue'
import BaseDropdown from '@/components/input/BaseDropdown.vue'
import BaseButton from '@/components/input/BaseButton.vue'
import { Form as VeeForm } from 'vee-validate'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import * as yup from 'yup'
import { useTypesStore } from '@/stores/master-data/types-store'

const typesOption = [{ label: "Gateway", value: "gateway" }, { label: "Node", value: "node" }]
const schema = yup.object({
  name: yup.string().required().label(' '),
  deviceType: yup.string().required().label(' '),
})
const props = defineProps({
  isOpen: Boolean,
  title: String
})

//dropdown var
const brandName = ref('')
const type = ref('')
const hullNumber = ref('')
const contractorId = ref('')
const siteId = ref('')


//stores
const typesStore = useTypesStore()
const { types, status, isLoading } = storeToRefs(useTypesStore())

onMounted(() => {
 typesStore.getTypes()
})

function fillSitesList(item) {
  contractorsStore.getSites(item)
}

const modalActive = ref(false)
const cancelLabel = ref('CANCEL')
const registerLabel = ref('REGISTER')
const regButtonClick = ref(0)
const cancelButtonClick = ref(0)
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

const onSubmit = async (values, { resetForm }) => {
  console.log(values)
  // values.name = values.name.toUpperCase()
  // values.fabricationYear = values.fabricationYear.toString()
  // values.purchaseYear = values.purchaseYear.toString()
  // values.registrationNumber = values.registrationNumber.replace(/\s/g, '').toUpperCase()
  // let newValues = values
  // newValues.brandName = brandName.value
  // newValues.type = type.value
  // newValues.hullNumber = hullNumber.value
  // newValues.contractorId = contractorId.value
  // newValues.siteId = siteId.value

  // console.log(newValues)
  // regButtonClick.value = ++regButtonClick.value
  // if (regButtonClick.value == 1) {
  //   registerLabel.value = 'the data entered is correct?'
  // }

  // if (regButtonClick.value == 2) {

  //   await vehiclesStore.createVehicle(newValues)
  //   modalActive.value = true
  //   if (status.value.isError) {
  //     setTimeout(closeNotification, 3000)
  //   } else {
  //     setTimeout(closeNotification, 3000)
  //     resetForm()
  //   }
  //   registerLabel.value = 'REGISTER'
  //   regButtonClick.value = 0
  //   emits('close')
  //   await delay(1000)
  //   vehiclesStore.getVehicles()
  // }
}

const closeNotification = () => {
  modalActive.value = false
}
// Define custom events
const emits = defineEmits(['close'])

const form = ref(null)
const target = ref(null)

onClickOutside(target, () => {
  if (props.isOpen) {
    emits('close')
  }
})

function cancelForm() {
  cancelButtonClick.value = ++cancelButtonClick.value
  switch (cancelButtonClick.value) {
    case 1:
      cancelLabel.value = 'The entered data will be lost!'
      break;
    case 2:
      form.value.resetForm()
      emits('close')
      cancelButtonClick.value = 0
      cancelLabel.value = 'CANCEL'
      break;
  }
}


</script>
  
<style scoped>
.title {
  @apply text-left border-b-[1px] border-b-bkg-secondary pb-[18px] text-[20px] font-semibold text-label-primary mb-6
}


.message-wrapper {
  @apply flex items-center gap-2
}

.form-wrapper {
  @apply flex flex-col gap-6
}


.modal {
  @apply fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto bg-[#ABADAF]/20 z-20
}

.modal-inner {
  @apply max-w-[500px] my-[100px] mx-auto
}

.modal-content {
  @apply relative w-[600px] p-[40px] bg-bkg-primary gap-[30px] rounded-xl
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active {
  transition: all 0.3s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.select-option {
  @apply px-6 py-3 rounded-[5px] border border-[#CFCFCF] bg-[#F2F2F2]
}
</style>