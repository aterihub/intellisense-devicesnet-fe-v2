import apiClient from "../api";
 
export default {
  getNodes() {
    return apiClient.get('devices')
  },
  getNode(id) {
    return apiClient.get(`devices/${id}`)
  },
  createNode(data) {
    return apiClient.post('devices',data)
  },
  editNode(id, data) {
    return apiClient.patch(`devices/${id}`, data)
  },
  deleteNode(id) {
    return apiClient.delete(`devices/${id}`)
  },
}