import axios from 'axios'
export const state = () => ({
  articles: {},
  articlesList: [],
  locationList:[],
  articleExtraInfo: {},
})
export const getters = {
  get(state) {
    return state.articles
  },
  getList(state) {
    return state.articlesList
  },
  getLocationList(state) {
    return state.locationList
  },

}

export const actions = {
  async findAllLocations(context, id) {
    return await this.$axios.get(`/articulos/findlocations/`)
      .then(response => {
        context.commit('setLocationList', response.data)
      })
  },
  find(context,id) {
    return this.$axios.get(`/articulos/${id}`)
      .then(response => {
        context.commit('setList', response.data)
      })
  },
  async findExtraInfo(context,id) {
    const {
      data: data
    } = await this.$axios.get(`/articulos/extrainfo/${id}`)
    return data
  },
  async saveLog(context,article) {
    const {
      data: data
    } = await this.$axios.post(`/articulos/saveLog/`,{
      data:article
    })
    return data
  },


}

export const mutations = {
  set(state, data) {
    state.articles = data.data
  },
  setExtraInfo(state, data) {
    state.articleExtraInfo = data.data
  },

  setList(state, data) {
    state.articlesList = data.data
  },
  setLocationList(state, data) {
    state.locationList = data.data
  },

}
