import { defineStore } from 'pinia'
import gatewaysAPI from '@/services/master-data/gateways-api'
import { ref } from 'vue'
import moment from 'moment'

export const useGatewaysStore = defineStore('Gateways', {
  state: () => ({
    gateways: ref([]),
    status: ref({
      isError: null,
      message: null,
      code: null,
    }),
    deleteGatewayLoading: ref(false),
    createGatewayLoading: ref(false),
    editGatewayLoading: ref(false),
    isLoading: ref(false)
  }),
  actions: {
    async getGateways() {
      this.isLoading = true
      try {
        const res = await gatewaysAPI.getGateways()
        this.isLoading = false
        this.gateways = res.data.gateways
        this.gateways.map((item, index) => {
          item.no = index + 1
          item.formattedCreatedAt = moment(item.createdAt).format("YYYY-MM-DD")
          item.formattedUpdatedAt = moment(item.updatedAt).format("YYYY-MM-DD")
        })
        console.log('gateways data', this.gateways)
        this.status.code = res.data.status
      } catch (err) {
        console.error(err)
        this.isLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
    async createGateway(data) {
      this.createGatewayLoading = true
      try {
        const res = await gatewaysAPI.createGateway(data)
        console.log(res)
        this.createGatewayLoading = false
        this.status.isError = false
        this.status.message = 'Data Posted'
        this.status.code = res.data.status
      } catch (err) {
        console.error(err)
        this.createGatewayLoading = false
        this.status.isError = true
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
    async deleteGateway(id) {
      this.deleteGatewayLoading = true
      try {
        const res = await gatewaysAPI.deleteGateway(id)
        console.log(res)
        this.deleteGatewayLoading = false
        this.status.message = 'Data Deleted'
        this.status.code = res.status
      } catch (err) {
        console.error(err)
        this.deleteGatewayLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
    async editGateway(id, data) {
      this.editGatewayLoading = true
      try {
        const res = await gatewaysAPI.editGateway(id, data)
        console.log(res)
        this.editGatewayLoading = false
        this.status.message = 'Data Updated'
        this.status.code = res.data.status
      } catch (err) {
        console.error(err)
        this.editGatewayLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
  }
})