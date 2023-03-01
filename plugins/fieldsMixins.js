import moment from 'moment'
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
        cuenta:0,
        CANTIDAD: 0,
        UNI_X_BULTO: 0,
        CANT_CONTEO: 0,
      },
      productCounted:false,
      UBICACION_ARTI: '',
      user: {
        USUARIO: '',
        DEP: ''
      },
      ubicacionError: false
    }
  },
  methods: {
    async setCodigobarras(valor) {
        this.product = {
          cuenta:this.product.cuenta
        }
      this.checkProduct(valor)
      this.$forceUpdate()
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.input.focus()
        }, 0);
      })
  

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
    async setUbicacionArti(valor) {
      this.UBICACION_ARTI = valor
      this.pendingProducts = await this.$store.dispatch('articles/findPendingProducts',valor)
      this.focus()
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
      this.product = {
        CANT_CONTEO: 0,
        UNI_X_BULTO: 0,
        CANTIDAD:null,
      }
},
    setFechaVenc(){
      return moment(this.product.FECHA_VENCI).add(1,'day').format('DD/MM/YYYY')
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
        if(this.locationList.length == 0) return
        const checkLocation = this.locationList.find(item=>item == val)
        if(checkLocation == undefined) {
          this.ubicacionError = true
          this.$toast.error('Ubicación no válida',{
            duration: 2000,
            containerClass: 'toast-container',
          })
        } else {
          localStorage.setItem('ubicacion', JSON.stringify(val))
          this.ubicacionError = false
        }
      }
    }
  },
  computed:{
  }
}
