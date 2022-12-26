<template>
  <v-container>
    <v-row>
      <v-col class="col-12">
        <v-form v-model="valid">
          <v-card class="d-flex flex-column rounded-lg">
            <v-card-title>
              Stock
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" label-color="white--text" v-model="product.USUARIO"
                    label="Usuario" required>
                    <img src="/icons/account.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>
                <v-col class="col-12">
                  <label class="font-weight-regular mb-4 text-uppercase text-subtitle-2 white--text">
                    Ubicación
                  </label>
                  <v-autocomplete hide-details height="56" v-model="UBICACION_ARTI" :items="locationList" class="rounded-lg"
                    chips small-chips label="Outlined" solo background-color="white">
                    <template v-slot:prepend-inner>
                      <img src="/icons/pin.png" width="30">
                    </template>
                  </v-autocomplete>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextButtonComponent :disabled="UBICACION_ARTI == ''" :handler="updateBarcodeProduct"
                    background-color="white" label-color="white--text" v-model="product.COD_BARRAS"
                    label="Código de barras" required>
                    <img src="/icons/barcode.png" width="30">
                    <template v-slot:buttonicon>
                      <img src="/icons/barcode-scanner.png" width="30">
                    </template>
                  </formsFieldsTextButtonComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" readonly label-color="white--text"
                    v-model="product.COD_ARTICULO" label="Codigo del producto" required>
                    <img src="/icons/code.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" readonly label-color="white--text"
                    v-model="product.DESCRIP_ARTI" :counter="100" label="Descripcion del producto" required>
                    <img src="/icons/product.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>
                <v-col class="col-12">
                  <formsFieldsSelectComponent
                    :items="['DEP','DUM','FUL','MAL','MAY','MEL','NDT','PAT','PRE','RUP','VEN']"
                    background-color="white" label-color="white--text" v-model="product.COD_DEPO" label="Depósito"
                    required>
                    <img src="/icons/barcode-scanner.png" width="30">
                  </formsFieldsSelectComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" label-color="white--text"
                    v-model="product.FECHA_VENCI" label="Fecha de vencimiento" readonly>
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

                  <v-btn-toggle class="elevation-3 rounded-lg" color="primary white--text" v-model="product.cuenta"
                    style="width:100%">
                    <v-btn width="33%" active-class="primary" class="font-weight-bold" :value="1">
                      <img src="/icons/1.png" width="30">
                    </v-btn>
                    <v-btn width="33%" active-class="primary" class="font-weight-bold" :value="2">
                      <img src="/icons/2.png" width="30">
                    </v-btn>
                    <v-btn width="33%" active-class="primary" class="font-weight-bold" :value="3">
                      <img src="/icons/3.png" width="30">
                    </v-btn>
                  </v-btn-toggle>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" label-color="white--text" v-model="product.CANTIDAD"
                    label="Cantidad de bultos" required>
                    <img src="/icons/staging.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" label-color="white--text"
                    v-model="product.UNI_X_BULTO" label="Cantidad en bulto" required>
                    <img src="/icons/products.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" readonly label-color="white--text"
                    v-model="product.CANT_CONTEO" label="Cantidad Final" required>
                    <img src="/icons/equal.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>
              </v-row>

            </v-card-text>
            <v-card-actions>
              <v-btn block color="primary font-weight-bold rounded-lg" @click="openModalConfirmacion= true;">Enviar</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>

      </v-col>
    </v-row>
    <barcodeReaderComponent @decode="checkProduct($event)" v-model="openModalBarcodeProduct"></barcodeReaderComponent>
    <barcodeReaderComponent @decode="product.deposit = $event" v-model="openModalBarcodeDeposit">
    </barcodeReaderComponent>

    <v-dialog v-model="modalUpdateDate">
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
            <v-list-item v-for="fechavenc in this.product.fechavenc" :key="id">
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">
                  {{fechavenc}}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn color="primary" fab small @click="newFechaVenc = fechavenc">
                  <img src="/icons/question.png" width="30" v-if="newFechaVenc != fechavenc">
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

    <v-dialog v-model="openModalConfirmacion">
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
          <v-btn outlined @click="openModalConfirmacion = false">Salir</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="updateConteo()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



    <v-dialog v-model="openModalUbication">
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
          <v-btn outlined @click="openModalUbication = false">Salir</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="()=>{
            openModalUbication = false;
            updateSobrante = true
          }">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="openModalConteo">
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
        <v-card-text class="py-2" v-else-if="errorConteo && this.product.cuenta <3">
          La cantidad final no coincide con la cantidad previamente registrada, realice nuevamente el conteo
        </v-card-text>
        <v-card-text class="py-2" v-else>
          La cantidad final no coincide con la cantidad previamente registrada, Realizando ajuste en sistema
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="openModalConteo = false">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>

</template>

<script>
  import products from '~/assets/products.json'
  import moment from 'moment'
  export default {
    name: 'IndexPage',
    data: () => ({
      openModalBarcodeProduct: false,
      openModalBarcodeDeposit: false,
      openModalConfirmacion: false,
      openModalUbication: false,
      openModalConteo: false,
      updateSobrante: false,
      date: null,
      menu: false,
      valid: false,
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
      UBICACION_ARTI: '',
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
    },
    methods: {
      async checkProduct(barcode) {
        await this.$store.dispatch('articles/find', barcode)
        let fechaVencs = this.articlesList.filter((item) => item.FECHA_VENCI != null).map((item) => item.FECHA_VENCI)
        let product = JSON.parse(JSON.stringify(this.articlesList[0]))
        if (product) {

          const extraInfo = await this.$store.dispatch('articles/findExtraInfo', product.COD_ARTICULO)
          console.log(extraInfo)
          product.UNI_X_BULTO = extraInfo.data.UNI_X_BULTO
          product.FECHA_VENCI = fechaVencs[0]
          this.product = product
          this.product.cuenta = 1

          if (this.product.UBICACION_PARTIDA != this.UBICACION_ARTI) {
            this.openModalUbication = true
          }
          var fechavenc = fechaVencs[0]
          const fechaVencBefore = moment(fechavenc, 'DD/MM/YYYY').isBefore(moment())
          if (fechaVencs.length > 1) {
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
        this.$store.dispatch('articles/saveLog', this.product)
        return
        this.openModalConteo = true
        if (this.product.cant_final != this.product.CANT_PEND) {
          this.errorConteo = true
          this.product.cuenta = parseInt(this.product.cuenta) + 1
          if (this.product.cuenta > 3) {
            console.log(this.product.cuenta)
            this.product = {}
          }
        } else {
          this.product = {}
          this.$store.dispatch('articles/saveLog', this.product)
        }
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
      }
    },
    watch: {
      "product.COD_BARRAS": function (val) {
        this.checkProduct(val)
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
      }
    }
  }

</script>
