import axios from 'axios'
const PROCEDURE_URL = `${process.env.API}/procedures`

export default {
  getAll () {
    const url = `${PROCEDURE_URL}`
    return axios.get(url)
  },
  getAllUnsigned (userId) {
    const url = `${PROCEDURE_URL}/unsigned/${userId}`
    return axios.get(url)
  },
  getById (id) {
    const url = `${PROCEDURE_URL}/${id}`
    return axios.get(url)
  },
  save (procedure) {
    const url = `${PROCEDURE_URL}/${procedure.id ? procedure.id : ''}`
    return procedure.id ? axios.put(url, procedure) : axios.post(url, procedure)
  }
}
