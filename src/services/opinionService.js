import axios from 'axios'
const OPINION_URL = `${process.env.API}/opinions`

export default {
  save (opinion) {
    const url = OPINION_URL
    return axios.post(url, opinion)
  }
}
