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
        DEP: ''
      },
      ubicacionError: false
    }
  },
  methods: {
    setCodigobarras(valor) {
        this.product = {}
      this.product.COD_BARRAS = valor
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
      this.UBICACION_ARTI = valor
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
    },
    "UBICACION_ARTI":{
      handler(val){
        const checkLocation = this.locationList.find(item=>item == val)
        if(checkLocation == undefined) {
          this.ubicacionError = true
          this.$toast.error('Ubicación no válida',{
            duration: 2000,
            containerClass: 'toast-container',
          })
        } else {
          this.ubicacionError = false
        }
      }
    }
  },
  computed:{
  }
}
