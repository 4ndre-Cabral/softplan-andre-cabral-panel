import axios from 'axios'
const USER_URL = `${process.env.API}/users`

export default {
  getAll () {
    const url = `${USER_URL}`
    return axios.get(url)
  },
  getById (id) {
    const url = `${USER_URL}/${id}`
    return axios.get(url)
  },
  save (user) {
    const url = `${USER_URL}/${user.id ? user.id : 'signup'}`
    return user.id ? axios.put(url, user) : axios.post(url, user)
  },
  update (user) {
    const url = `${USER_URL}/${user.id}`
    return axios.patch(url, user)
  },
  delete (ids) {
    const url = `${USER_URL}/${ids}`
    return axios.delete(url)
  },
  add (user) {
    const url = `${USER_URL}/signup`
    return axios.post(url, user)
  },
  deleteUser (id) {
    const url = `${USER_URL}/${id}`
    return axios.delete(url)
  },
  login (credentials, auth) {
    window.Auth = auth
    return this.onlineLogin(credentials)
  },
  onlineLogin (credentials) {
    // Define login params
    var params = {
      data: credentials,
      rememberMe: false,
      fetchUser: false
    }
    // Try login
    return new Promise((resolve, reject) => {
      window.Auth.login(params).then((response) => {
        // If ok, set this for future database save
        if (response.response && response.response.data.error) {
          reject(response.response.data)
        }
        resolve(response.data)
      }, (error) => {
        reject(error)
      })
    })
  }
}
