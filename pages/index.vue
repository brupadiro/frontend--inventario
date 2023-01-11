<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12">
        <v-form v-model="valid">
          <v-card class="d-flex flex-column rounded-lg">
            <v-card-title>
              Stock
              <v-spacer></v-spacer>
              <v-btn outlined @click="cleanStorage()">Terminar cuenta</v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-form ref="form">
                <v-row>
                  <v-col class="col-md-2 col-12">
                    <formsFieldsTextComponent background-color="white" label-color="white--text" enterActive :editable="user.USUARI" :value="user.USUARIO"
                      @enter="setUser($event)" label="Usuario" required>
                      <img src="/icons/account.png" width="30">
                      <template v-slot:enterbutton="props">
                        <v-btn x-small height="54" color="primary" class="ml-2 d-sm-none" @click="props.enter()">
                          <img src="/icons/enter.png" width="30">
                        </v-btn>
                      </template>
                    </formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-md-2 col-12">
                    <formsFieldsSelectComponent
                      :items="['DEP','DUM','FUL','MAL','MAY','MEL','NDT','PAT','PRE','RUP','VEN']"
                      @enter="setDepo($event)" background-color="white" label-color="white--text" v-model="user.DEP"
                      label="Depósito" required>
                      <img src="/icons/barcode-scanner.png" width="30">

                    </formsFieldsSelectComponent>
                  </v-col>
                  <v-col class="col-md-4 col-12">
                    <formsFieldsTextComponent background-color="white" label-color="white--text" enterActive :value="UBICACION_ARTI"
                      @enter="setUbicacionArti" :editable="ubicacionError" label="Ubicacion" required>
                      <img src="/icons/pin.png" width="30">
                      <template v-slot:enterbutton="props">
                        <v-btn x-small height="54" color="primary" class="ml-2 d-sm-none" @click="props.enter()">
                          <img src="/icons/enter.png" width="30">
                        </v-btn>
                      </template>
                    </formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-12 col-md-5">
                    <formsFieldsTextButtonComponent :disabled="UBICACION_ARTI == ''" :value="product.COD_BARRAS"
                      :handler="updateBarcodeProduct" background-color="white" label-color="white--text"
                      @enter="setCodigobarras($event)" label="Código de barras" required>
                      <img src="/icons/barcode.png" width="30">
                      <template v-slot:buttonicon>
                        <img src="/icons/barcode-scanner.png" width="30">
                      </template>
                      <template v-slot:enterbutton>
                        <v-btn x-small height="54" color="primary" class="ml-2 d-sm-none">
                          <img src="/icons/enter.png" width="30">
                        </v-btn>
                      </template>
                    </formsFieldsTextButtonComponent>
                  </v-col>

                  <v-col class="col-12 col-md-2">
                    <formsFieldsTextComponent background-color="white" readonly label-color="white--text"
                      v-model="product.COD_ARTICULO" label="Cod. del producto" required>
                      <img src="/icons/code.png" width="30">
                    </formsFieldsTextComponent>
                  </v-col>

                  <v-col class="col-12 col-md-5">
                    <formsFieldsTextComponent background-color="white" readonly label-color="white--text"
                      v-model="product.DESCRIP_ARTI" :counter="100" label="Descripcion del producto" required>
                      <img src="/icons/product.png" width="30">
                    </formsFieldsTextComponent>
                  </v-col>

                  <v-col class="col-12 col-md-5">
                    <formsFieldsTextComponent background-color="white" label-color="white--text" :value="setFechaVenc()"
                      label="Fecha de vencimiento" readonly>
                      <img src="/icons/calendar.png" width="30">
                    </formsFieldsTextComponent>
                    <div v-if="errorFechaVenc" class="red--text">
                      {{ errorfechaVencText }}
                      <v-btn color="info" @click="modalUpdateDate=true" class="fonti-weight-regular black--text">
                        Actualizar fecha de vencimiento</v-btn>
                    </div>
                  </v-col>

                  <v-col class="col-12 py-4">
                    <label class="font-weight-regular mb-2 text-uppercase text-subtitle-2 white--text">TIPO DE
                      CUENTA</label>

                    <v-btn-toggle class="elevation-3 rounded-lg" color="primary white--text" style="width:100%">
                      <v-btn width="25%" active-class="primary" disabled class="font-weight-bold btn-count"
                        :class="(product.cuenta == 0)?'primary':''">
                        <img src="/icons/0.png" width="30">
                      </v-btn>
                      <v-btn width="25%" active-class="primary" disabled class="font-weight-bold btn-count"
                        :class="(product.cuenta == 1)?'primary':''">
                        <img src="/icons/1.png" width="30">
                      </v-btn>
                      <v-btn width="25%" active-class="primary" disabled class="font-weight-bold btn-count"
                        :class="(product.cuenta == 2)?'primary':''">
                        <img src="/icons/2.png" width="30">
                      </v-btn>
                      <v-btn width="25%" active-class="primary" disabled class="font-weight-bold btn-count"
                        :class="(product.cuenta == 3)?'primary':''">
                        <img src="/icons/3.png" width="30">
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>

                  <v-col class="col-12 col-md-3">
                    <formsFieldsTextComponent background-color="white" label-color="white--text"
                      v-model="product.CANTIDAD" label="Cantidad de bultos" required>
                      <img src="/icons/staging.png" width="30">
                    </formsFieldsTextComponent>
                  </v-col>

                  <v-col class="col-12 col-md-3">
                    <formsFieldsTextComponent background-color="white" type="number" label-color="white--text"
                      v-model="product.UNI_X_BULTO" label="Cantidad por bulto" required>
                      <img src="/icons/products.png" width="30">
                    </formsFieldsTextComponent>
                  </v-col>

                  <v-col class="col-12 col-md-3">
                    <formsFieldsTextComponent background-color="white" readonly label-color="white--text"
                      v-model="product.CANT_CONTEO" label="Cantidad Cuenta" required>
                      <img src="/icons/equal.png" width="30">
                    </formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-md-3 col-12">
                    <v-btn block color="success darken-1" class="font-weight-bold rounded-lg mt-7" height="55"
                      @click="setCantExtra();">
                      Agregar cuenta</v-btn>
                  </v-col>
                  <v-col class="col-md-3 col-12"></v-col>
                  <v-col class="col-md-3 col-12"></v-col>
                  <v-col class="col-12 col-md-3">
                    <formsFieldsTextComponent background-color="white" readonly label-color="white--text"
                      :value="cantFinal" label="Cantidad Final" required>
                      <img src="/icons/equal.png" width="30">
                    </formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-md-3 col-12">
                    <v-btn block color="primary font-weight-bold rounded-lg mt-7" height="55" @click="updateConteo();">
                      Enviar</v-btn>
                  </v-col>


                </v-row>

              </v-form>

            </v-card-text>
            <v-card-actions>
            </v-card-actions>
          </v-card>
        </v-form>

      </v-col>
    </v-row>
    <barcodeReaderComponent @decode="setCodigobarras" v-model="openModalBarcodeProduct"></barcodeReaderComponent>
    <barcodeReaderComponent @decode="product.deposit = $event" v-model="openModalBarcodeDeposit">
    </barcodeReaderComponent>

    <v-dialog v-model="modalUpdateDate" persistent>
      <v-card>
        <v-card-title class="font-weight-bold">
          Actualice la fecha
          <v-spacer></v-spacer>
          <img src="/icons/alert.png" width="30">
        </v-card-title>
        <v-divider></v-divider>
        <v-card-subtitle>Seleccione una</v-card-subtitle>
        <v-card-text class="py-2">
          <v-list>
            <v-list-item v-for="fechavenc in this.fechavencs" :key="id">
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">
                  {{formatDate(fechavenc)}}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn color="primary" fab small @click="product.FECHA_VENCI = fechavenc">
                  <img src="/icons/question.png" width="30" v-if="product.FECHA_VENCI != fechavenc">
                  <img src="/icons/check.png" width="30" v-else>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <formsFieldsTextComponent background-color="white" type="date" label-color="white--text"
            v-model="newFechaVenc" label="Fecha" required>
            <img src="/icons/calendar.png" width="30">
          </formsFieldsTextComponent>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn outlined @click="modalUpdateDate = false">Salir</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="updateDate()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="openModalConfirmacion" persistent>
      <v-card>
        <v-card-title class="font-weight-bold">
          Confirmar el conteo
          <v-spacer></v-spacer>
          <img src="/icons/alert.png" width="30">
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-2">
          <v-row class="py-3">
            <v-col class="col-6">
              <span class="text-subtitle-1 font-weight-regular">Producto</span>
            </v-col>
            <v-col class="col-6 d-flex justify-end">
              <span class="text-subtitle-1 font-weight-regular">{{ product.DESCRIP_ARTI }}</span>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="py-3">
            <v-col class="col-6">
              <span class="text-subtitle-1 font-weight-regular">Vencimiento</span>
            </v-col>
            <v-col class="col-6 d-flex justify-end">
              <span class="text-subtitle-1 font-weight-regular">{{ product.FECHA_VENCI }}</span>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="py-3">
            <v-col class="col-6">
              <span class="text-subtitle-1 font-weight-regular">Conteo</span>
            </v-col>
            <v-col class="col-6 d-flex justify-end">
              <span class="text-subtitle-1 font-weight-regular">{{ product.CANT_CONTEO }}</span>
            </v-col>
          </v-row>



          <v-divider></v-divider>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn outlined @click="openModalConfirmacion = false;focus()">Salir</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="updateConteo()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



    <v-dialog v-model="openModalUbication" persistent>
      <v-card>
        <v-card-title class="font-weight-bold">
          Aviso&nbsp;
          <v-spacer></v-spacer>
          <img src="/icons/alert.png" width="30">
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-2">
          El producto no se encuentra en la ubicacion selecciona, desea guardar el sobrante?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn outlined @click="()=>{
            this.openModalUbication = false;
            this.clearFields();
            this.focus();
          }">Salir</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="()=>{
            openModalUbication = false;
            updateSobrante = true
          }">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openNoArticlesModal" persistent>
      <v-card>
        <v-card-title class="font-weight-bold">
          Aviso&nbsp;
          <v-spacer></v-spacer>
          <img src="/icons/alert.png" width="30">
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-2">
          El producto pertenece a la ubicacion pero no tiene cantidades pendientes, desea guardar el sobrante?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn outlined @click="()=>{
            this.openNoArticlesModal = false;
            this.focus();
          }">Salir</v-btn>
          <v-spacer></v-spacer>

          <v-btn color="primary" @click="()=>{
            openNoArticlesModal = false;
            updateSobrante = true
          }">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="openModalConteo" persistent>
      <v-card>
        <v-card-title class="font-weight-bold">
          Aviso&nbsp;
          <v-spacer></v-spacer>
          <img src="/icons/alert.png" width="30">
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-2" v-if="!errorConteo">
          Conteo realizado con exito, guardando en sistema...
        </v-card-text>
        <v-card-text class="py-2" v-else-if="errorConteo && this.product.cuenta <4">
          La cantidad final no coincide con la cantidad previamente registrada, realice nuevamente el conteo
          <!--
          <v-row>
            <v-col class="col-12">
              <formsFieldsTextComponent background-color="white" label-color="white--text" v-model="product.CANTIDAD"
                label="Cantidad de bultos" required>
                <img src="/icons/staging.png" width="30">
              </formsFieldsTextComponent>
            </v-col>
          </v-row>


          -->
        </v-card-text>
        <v-card-text class="py-2" v-else>
          La cantidad final no coincide con la cantidad previamente registrada, Realizando ajuste en sistema
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions v-if="false">
          <v-btn block color="primary" @click="()=>{
            this.openModalConteo = false;
            this.updateConteo()
          }">Enviar nuevo conteo</v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-btn block color="primary" @click="openModalConteo = false;">Aceptar</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>


  </v-container>

</template>

<script>
  import products from '~/assets/products.json'
  import fieldsMixins from '~/plugins/fieldsMixins.js'
  import moment from 'moment'
  export default {
    name: 'IndexPage',
    mixins: [fieldsMixins],
    data: () => ({
      openModalBarcodeProduct: false,
      openModalBarcodeDeposit: false,
      openModalConfirmacion: false,
      openModalUbication: false,
      openModalConteo: false,
      openNoArticlesModal: false,
      updateSobrante: false,
      cantExtra: 0,
      fechavencs: [],
      date: null,
      menu: false,
      valid: false,
      usuario: '',
      errorFechaVenc: false,
      errorfechaVencText: '',
      modalUpdateDate: false,
      newFechaVenc: false,
      activePicker: null,
      errorConteo: false,
    }),
    mounted() {
      this.$store.dispatch('articles/findAllLocations')
      this.checkUser()
    },
    methods: {
      checkUser() {
        if (localStorage.getItem('user') != null) {
          this.user = JSON.parse(localStorage.getItem('user'))
        }
        if (localStorage.getItem('ubicacion') != null) {
          this.UBICACION_ARTI = JSON.parse(localStorage.getItem('ubicacion'))
        }


      },
      setCantExtra() {
        this.cantExtra += this.product.CANT_CONTEO
        this.product = {
          CANT_CONTEO: 0,
          UNI_X_BULTO: 0,
          CANTIDAD: 0,
        }
        this.focus()
      },
      cleanStorage() {
        localStorage.removeItem('user')
        localStorage.removeItem('ubicacion')
        this.user = {}
        this.product = {
          cuenta: 0
        }
        this.UBICACION_ARTI = ""
      },
      focus() {
        this.$root.$emit('focus')
      },
      formatDate(date) {
        if (this.product.FECHA_VENCI) {
          return moment(date).add(1, 'days').format('DD/MM/YYYY')
        }
        return moment(date).format('DD/MM/YYYY')
      },
      async checkProduct(barcode) {
        await this.$store.dispatch('articles/find', barcode)
        let fechaVencs = this.articlesList.filter((item) => item.FECHA_VENCI != null).map((item) => item.FECHA_VENCI)
        fechaVencs = [...new Set(fechaVencs)]
        let product = null
        if (this.articlesList.length > 0)
          product = JSON.parse(JSON.stringify(this.articlesList[0]))
        if (product) {
          const extraInfo = await this.$store.dispatch('articles/findExtraInfo', barcode)
          product.UNI_X_BULTO = product.UNI_X_BULTO ?? 1
          product.FECHA_VENCI = fechaVencs[0]
          console.log(this.product.cuenta)
          this.product = {
            ...product,
            cuenta:this.product.cuenta ?? 0
          }
          this.product.COD_BARRAS = barcode
          if (this.product.UBICACION_PARTIDA != this.UBICACION_ARTI) {
            this.openModalUbication = true
          }
          var fechavenc = fechaVencs[0]
          const fechaVencBefore = moment(fechavenc, 'DD/MM/YYYY').isBefore(moment())
          if (fechaVencs.length > 1) {
            this.fechavencs = [...new Set(fechaVencs)]
            this.errorFechaVenc = true
            this.errorfechaVencText = 'Hay mas de una fecha de vencimiento'
            return
          } else if (fechaVencBefore) {
            this.errorFechaVenc = true
            this.errorfechaVencText = 'El producto esta vencido'
            return
          } else if (product.VALIDAR_VENCI == "S") {
            this.errorFechaVenc = true
            this.errorfechaVencText = 'Es necesario validar la fecha de vencimiento'
          } else {
            this.errorFechaVenc = false
            this.errorfechaVencText = ''
          }
        } else {
          console.log(product)
        }
      },
      checkReadonly() {
        if (this.UBICACION_ARTI == '') {
          return true
        } else {
          return false
        }
      },
      updateDate() {
        this.modalUpdateDate = false;
        this.product.fechavenc = this.newFechaVenc
        this.errorFechaVenc = false;
        this.errorfechaVencText = ''
      },
      updateBarcodeProduct() {
        this.openModalBarcodeProduct = true
      },
      updateBarcodeDeposit() {
        this.openModalBarcodeDeposit = true
      },
      updateConteo() {
        if (!this.$refs.form.validate()) {
          this.$toast.error('Rellene todos los campos', {
            duration: 2000,
            containerClass: 'toast-container',
          })
          return
        }


        this.openModalConteo = true
        this.errorConteo = false
        this.product.cuenta = parseInt(this.product.cuenta) + 1

        const funcSaveLog = function (ULTIMO_REG, VM) {
          VM.$store.dispatch('articles/saveLog', {
            ...VM.product,
            ...VM.user,
            CANT_CONTEO: VM.cantFinal,
            UBICACION_PARTIDA: VM.UBICACION_ARTI,
            ULTIMO_REG: ULTIMO_REG,
          })
        }

        if (this.updateSobrante) {
          this.$store.dispatch('articles/saveSobrante', {
            ...this.product,
            CANT_CONTEO: this.cantFinal
          })
          funcSaveLog('Si', this)
          this.cantExtra = 0
         return
        }
        if (this.cantFinal != this.product.CANT_PEND) {
          this.errorConteo = true

          this.focus()
          if (this.product.cuenta == 3) {
            this.$store.dispatch('articles/saveAjuste', {
              ...this.product,
              CANT_CONTEO: this.cantFinal
            })
            funcSaveLog('Si', this)
            this.product = {
              CANT_CONTEO: 0,
              UNI_X_BULTO: 0,
              CANTIDAD: 0,
            }

            this.cantExtra = 0
            return
          }
        } else {
          funcSaveLog('Si', this)
          this.product = {
            CANT_CONTEO: 0,
            UNI_X_BULTO: 0,
            CANTIDAD: 0,
          }
          this.cantExtra = 0
          return
        }
        funcSaveLog('No', this)
        this.product = {
              CANT_CONTEO: 0,
              UNI_X_BULTO: 0,
              CANTIDAD: 0,
              cuenta: this.product.cuenta
            }
            this.cantExtra = 0
     },
      save(date) {
        this.$refs.menu.save(date)
      },
    },
    computed: {
      articlesList() {
        return this.$store.getters['articles/getList']
      },
      locationList() {
        return this.$store.getters['articles/getLocationList']
      },
      cantFinal() {
        return this.product.UNI_X_BULTO * this.product.CANTIDAD + this.cantExtra ?? 0
      }
    },
    watch: {
      articlesList: {
        handler(val) {
          if (val.length == 0) {
            this.openNoArticlesModal = true
          }
        },
        deep: true
      },
      product: {
        handler(val) {
          if (val.CANTIDAD) {
            this.product.CANT_CONTEO = val.UNI_X_BULTO * val.CANTIDAD
          } else {
            this.product.CANT_CONTEO = 0
          }
        },
        deep: true
      },
      newFechaVenc(val) {
        this.product.FECHA_VENCI = val
      }
    }
  }

</script>
