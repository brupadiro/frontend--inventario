import {
    getField,
    updateField
  } from 'vuex-map-fields';
  var qs = require('qs');
  
  export const state = () => ({
    CAM_FECH:false,
    errorFechaVenc:false,
    errorfechaVencText:'',
    product: {
        COD_BARRAS: '',
        sku: '',
        DESCRIP_ARTI: '',
        COD_ARTICULO:'',
        DEPO: '',
        UBICACION_ARTI: '',
        fechavenc: '',
        cuenta:0,
        CANTIDAD: 0,
        UNI_X_BULTO: 0,
        CANT_CONTEO: 0,
        COD_BARRAS: '',
        UBICACION_PARTIDA:'',

    },
  })
  export const getters = {
    getField,
    get(state) {
      return state.product;
    },
  
  }
  export const actions = {
    set({
      commit
    }, data) {
      commit('set', data)
    },
    clear({
      commit
    }) {
      commit('set', {
        codigobarras: '',
        sku: '',
        descripcion: '',
        deposito: '',
        UBICACION_ARTI: '',
        fechavenc: '',
        cuenta:0,
        CANTIDAD: 0,
        UNI_X_BULTO: 0,
        CANT_CONTEO: 0,

    })
    },
  
  }
  export const mutations = {
    updateField,
    set(state, data) {
      state.product = data
    },
  }
  