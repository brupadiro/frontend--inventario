export default {
  data() {
    return {
      product: {
        codigobarras: '',
        sku: '',
        descripcion: '',
        deposito: '',
        UBICACION_ARTI: '',
        fechavenc: '',
        cuenta: '1',
        CANTIDAD: 0,
        UNI_X_BULTO: 0,
        CANT_CONTEO: 0,
      },
      user: {
        USUARIO: '',
        DEPOSITO: ''
      },
    }
  },
  methods: {
    setCodigobarras(valor) {
        this.product = {}
      this.product.codigobarras = valor
      this.checkProduct(valor)
    },
    setSku(valor) {
      this.product.sku = valor
    },
    setDescripcion(valor) {
      this.product.descripcion = valor
    },
    setDeposito(valor) {
      this.product.deposito = valor
    },
    setUbicacionArti(valor) {
      this.product.UBICACION_ARTI = valor
    },
    setFechavenc(valor) {
      this.product.fechavenc = valor
    },
    setCuenta(valor) {
      this.product.cuenta = valor
    },
    setCantidad(valor) {
      this.product.CANTIDAD = valor
    },
    setUniXBulto(valor) {
      this.product.UNI_X_BULTO = valor
    },
    setCantConteo(valor) {
      this.product.CANT_CONTEO = valor
    },
    setUser(valor) {
      this.user.USUARIO = valor
    },
    clearFields(){
      this.product = {}
    }
  },
  watch:{
    user:{
      handler(val){
        localStorage.setItem('user', JSON.stringify(val))
      },
      deep:true
    }
  }
}
