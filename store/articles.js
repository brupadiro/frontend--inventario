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
  find(context,{barcode, ubicacion}) {
    return this.$axios.get(`/articulos/`,{
      params:{
        barcode:barcode,
        ubicacion:ubicacion
      }
    })
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
  async findPendingProducts(context,loc) {
    const {
      data: data
    } = await this.$axios.get(`/articulos/findPartidasWithPendCant/${loc}`)
    return data
  },
  async saveLog(context,article) {
    console.log(article)
    const {
      data: data
    } = await this.$axios.post(`/articulos/saveLog/`,{
      data:article
    })
    return data
  },
  async savePendings(context,pendings) {
    const {
      data: data
    } = await this.$axios.post(`/articulos/savePendings/`,{
      data:pendings
    })
    return data
  },

  async saveAjuste(context,article) {
    const {
      data: data
    } = await this.$axios.post(`/articulos/saveAjuste/`,{
      data:article
    })
    return data
  },
  async saveSobrante(context,article) {
    const {
      data: data
    } = await this.$axios.post(`/articulos/saveSobrante/`,{
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
