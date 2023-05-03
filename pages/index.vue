<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12">
        <v-form v-model="valid">
          <v-card class="d-flex flex-column rounded-lg">
            <v-card-title>
              Stock
              <v-spacer></v-spacer>
              <v-btn outlined @click="confirmCleanStorage()">Terminar cuenta</v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-form ref="form">
                <v-row>
                  <v-col class="col-md-2 col-12">
                    <formsFieldsTextComponent background-color="white" label-color="white--text" enterActive
                      :editable="user.USUARIO ==''" :value="user.USUARIO" @enter="setUser($event)" label="Usuario"
                      required>
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
                      background-color="white" label-color="white--text" v-model="user.DEPO" label="Depósito" required>
                      <img src="/icons/barcode-scanner.png" width="30">

                    </formsFieldsSelectComponent>
                  </v-col>
                  <v-col class="col-md-4 col-12">
                    <formsFieldsTextComponent background-color="white" label-color="white--text" enterActive
                      :value="UBICACION_ARTI" @enter="setUbicacionArti" :editable="ubicacionError" label="Ubicacion"
                      required>
                      <img src="/icons/pin.png" width="30">
                      <template v-slot:enterbutton="props">
                        <v-btn x-small height="54" color="primary" class="ml-2 d-sm-none" @click="props.enter()">
                          <img src="/icons/enter.png" width="30">
                        </v-btn>
                      </template>
                    </formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-12 col-md-5">
                    <formsFieldsTextButtonComponent :disabled="UBICACION_ARTI == ''" enterActive
                      :value="product.COD_BARRAS" :handler="updateBarcodeProduct" background-color="white"
                      label-color="white--text" @enter="setCodigobarras($event)" label="Código de barras" required>
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
                      <v-btn color="info" block @click="modalUpdateDate=true"
                        class="mt-2 fonti-weight-regular black--text">
                        Actualizar fecha de vencimiento</v-btn>
                    </div>
                  </v-col>

                  <v-col class="col-12 py-4">
                    <label class="font-weight-regular mb-2 text-uppercase text-subtitle-2 white--text">TIPO DE
                      CUENTA</label>

                    <v-btn-toggle class="elevation-3 rounded-lg" color="primary white--text" style="width:100%">
                      <v-btn width="20%" active-class="primary" disabled class="font-weight-bold btn-count"
                        :class="(product.cuenta == 0)?'primary':''">
                        <img src="/icons/0.png" width="30">
                      </v-btn>
                      <v-btn width="20%" active-class="primary" disabled class="font-weight-bold btn-count"
                        :class="(product.cuenta == 1)?'primary':''">
                        <img src="/icons/1.png" width="30">
                      </v-btn>
                      <v-btn width="20%" active-class="primary" disabled class="font-weight-bold btn-count"
                        :class="(product.cuenta == 2)?'primary':''">
                        <img src="/icons/2.png" width="30">
                      </v-btn>
                      <v-btn width="20%" active-class="primary" disabled class="font-weight-bold btn-count"
                        :class="(product.cuenta == 3)?'primary':''">
                        <img src="/icons/3.png" width="30">
                      </v-btn>
                      <v-btn width="20%" active-class="primary" disabled class="font-weight-bold btn-count"
                        :class="(product.cuenta == 4)?'primary':''">
                        <img src="/icons/4.png" width="30">
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>

                  <v-col class="col-12 col-md-3">
                    <label class="font-weight-regular text-uppercase text-subtitle-2 white--text">Cantidad de
                      bultos</label>
                    <v-input hide-details class="mt-2">
                      <v-text-field height="55" class="rounded-lg font-weight-regular" background-color="white" solo
                        ref="input" hide-details v-model="product.CANTIDAD">
                        <template v-slot:prepend-inner>
                          <img src="/icons/staging.png" width="30">
                        </template>
                      </v-text-field>
                    </v-input>
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
                    <v-btn block color="success darken-1" class="font-weight-bold rounded-lg mt-7"
                      :disabled="blockAddAccount" height="55" @click="setCantExtra();">
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
    <dialogsUpdateDateComponent v-model="modalUpdateDate" :fechavencs="fechavencs"></dialogsUpdateDateComponent>

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

    <dialogsAskComponent v-model="openModalDep" @updateSobrante="updateSobrante = $event" @clearAndFocus="()=>{
      this.clearFields();
      this.focus();
    }">
      El producto no se encuentra en el deposito seleccionado, desea guardar el sobrante?
    </dialogsAskComponent>

    <dialogsAskComponent v-model="openModalUbication" @updateSobrante="updateSobrante = $event" @clearAndFocus="()=>{
      this.clearFields();
      this.focus();
    }">
      El producto no se encuentra en la ubicacion seleccionada, desea guardar el sobrante?
    </dialogsAskComponent>


    <dialogsAskComponent v-model="productCounted" @updateSobrante="updateSobrante = $event" @clearAndFocus="()=>{
      this.clearFields();
      this.focus();
    }">
      El producto ya se conto hoy, deseas actualizarlo?
    </dialogsAskComponent>

    <dialogsCountComponent :product="product" v-model="openModalConteo" :errorConteo="errorConteo" @clearAndFocus="()=>{
      this.clearFields();
      this.focus();
    }">
      El producto ya se conto hoy, deseas actualizarlo?
    </dialogsCountComponent>


    <dialogsProductNotExistComponent v-model="productCounted" @clearAndFocus="()=>{
      this.clearFields();
      this.focus();
    }">
      El producto no existe en la base de datos
    </dialogsProductNotExistComponent>



    <dialogsAskComponent v-model="openNoArticlesModal" @updateSobrante="updateSobrante = $event" @clearAndFocus="()=>{
      this.clearFields();
      this.focus();
    }">
      El producto pertenece a la ubicacion pero no tiene cantidades pendientes, desea guardar el sobrante?
    </dialogsAskComponent>
    <dialogsConfirmCountComponent @cleanStorage="cleanStorage()" @focus="focus()" :pendingProducts="pendingProducts" v-model="openConfirmFinishCount">
    </dialogsConfirmCountComponent>

    <dialogsCountConfirmedComponent v-model="openConfirmCount"></dialogsCountConfirmedComponent>



  </v-container>

</template>

<script>
  import fieldsMixins from '~/plugins/fieldsMixins.js'
  import updateConteoMixin from '~/plugins/updateConteoMixin.js'
  import getAndFormatProductMixin from '~/plugins/getAndFormatProductMixin.js'
  import moment from 'moment'
  export default {
    name: 'IndexPage',
    mixins: [fieldsMixins,updateConteoMixin,getAndFormatProductMixin],
    data: () => ({
      openModalBarcodeProduct: false,
      openModalBarcodeDeposit: false,
      openModalConfirmacion: false,
      openModalUbication: false,
      openModalDep: false,
      openConfirmFinishCount: false,
      openConfirmCount: false,
      openModalConteo: true,
      openNoArticlesModal: false,
      updateSobrante: false,
      cantExtra: 0,
      cuenta: 0,
      pendingProducts: [],
      countList: [],
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
      CAM_FECH: false,
      focusQuantity: false,
      blockAddAccount: false,
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
          cuenta: this.product.cuenta
        }
        this.blockAddAccount = true
        this.focus()
      },
      confirmCleanStorage() {
        if (this.pendingProducts.length != 0) {
          console.log('no se puede limpiar')
          this.openConfirmFinishCount = true
          return
        } else {
          this.openConfirmCount = true
          this.cleanStorage()
        }

      },
      cleanStorage() {
        this.$store.dispatch('articles/savePendings', {
          articles: this.pendingProducts,
          UBICACION_PARTIDA: this.UBICACION_ARTI,
          USUARIO: this.user.USUARIO
        })
        localStorage.removeItem('user')
        localStorage.removeItem('ubicacion')
        this.user = {
          USUARIO: ''
        }
        this.product = {
          cuenta: 0
        }
        this.UBICACION_ARTI = ""
        this.openConfirmCount = true
      },
      checkReadonly() {
        if (this.UBICACION_ARTI == '') {
          return true
        } else {
          return false
        }
      },
      updateBarcodeProduct() {
        this.openModalBarcodeProduct = true
      },
      updateBarcodeDeposit() {
        this.openModalBarcodeDeposit = true
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
            this.productNotExists = true
          }
        },
        deep: true
      },
      product: {
        handler(val) {
          if (val.CANTIDAD) {
            this.product.CANT_CONTEO = val.UNI_X_BULTO * val.CANTIDAD
            console.log(this.product.CANT_CONTEO)
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
