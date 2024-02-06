import apiClient from "../api";
 
export default {
  getGateways() {
    return apiClient.get('gateways')
  },
  getGateway(id) {
    return apiClient.get(`gateways/${id}`)
  },
  createGateway(data) {
    return apiClient.post('gateways',data)
  },
  editGateway(id) {
    return apiClient.patch(`gateways/${id}`)
  },
  deleteGateway(id) {
    return apiClient.delete(`gateways/${id}`)
  },
}