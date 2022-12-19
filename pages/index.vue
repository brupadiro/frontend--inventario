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
                  <formsFieldsTextComponent background-color="white" label-color="white--text" v-model="usuario"
                    label="Usuario" required>
                    <img src="/icons/account.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>
                <v-col class="col-12">
                  <formsFieldsTextButtonComponent :handler="updateBarcodeDeposit" background-color="white"
                    label-color="white--text" :value="product.deposit" label="Depósito" required>
                    <img src="/icons/storage.png" width="30">
                    <template v-slot:buttonicon>
                      <img src="/icons/barcode-scanner.png" width="30">
                    </template>
                  </formsFieldsTextButtonComponent>
                </v-col>
                <v-col class="col-12">
                  <FormsFieldsSelectComponent :items="['Ubicacion 1','Ubicacion 2','Ubicacion 3']"
                    background-color="white" label-color="white--text" v-model="ubicacion" label="Ubicación" required>
                    <img src="/icons/pin.png" width="30">
                  </FormsFieldsSelectComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextButtonComponent :buttondisabled="ubicacion == ''" :handler="updateBarcodeProduct"
                    background-color="white" label-color="white--text" :value="product.codigobarras"
                    label="Código de barras" required>
                    <img src="/icons/barcode.png" width="30">
                    <template v-slot:buttonicon>
                      <img src="/icons/barcode-scanner.png" width="30">
                    </template>
                  </formsFieldsTextButtonComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" readonly label-color="white--text"
                    v-model="product.sku" label="Codigo del producto" required>
                    <img src="/icons/code.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" readonly label-color="white--text"
                    v-model="product.descripcion" :counter="100" label="Descripcion del producto" required>
                    <img src="/icons/product.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>
                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" label-color="white--text"
                    v-model="product.fechavenc" label="Fecha de vencimiento" readonly>
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
                  <formsFieldsTextComponent background-color="white" label-color="white--text" v-model="product.bultos"
                    label="Cantidad de bultos" required>
                    <img src="/icons/staging.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" label-color="white--text"
                    v-model="product.cant_bultos" label="Cantidad en bulto" required>
                    <img src="/icons/products.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" readonly label-color="white--text"
                    v-model="product.cant_final" label="Cantidad Final" required>
                    <img src="/icons/equal.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>
              </v-row>

            </v-card-text>
            <v-card-actions>
              <v-btn block color="primary font-weight-bold rounded-lg" @click="updateConteo()">Enviar</v-btn>
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
          <v-btn color="primary" @click="openModalUbication = false">Guardar</v-btn>
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
      openModalUbication: false,
      openModalConteo: false,
      date: null,
      menu: false,
      valid: false,
      product: {
        codigobarras: '',
        sku: '',
        descripcion: '',
        deposito: '',
        ubicacion: '',
        fechavenc: '',
        cuenta: '1',
        bultos: 0,
        cant_bultos: 0,
        cant_final: 0,
      },
      ubicacion: '',
      usuario: '',
      errorFechaVenc: false,
      errorfechaVencText: '',
      modalUpdateDate: false,
      newFechaVenc: false,
      activePicker: null,
      errorConteo: false,
    }),
    watch: {
      menu(val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    methods: {
      checkProduct(barcode) {
        console.log(products)
        let product = products.find(product => product.codigobarras === barcode.toString())
        if (product) {
          this.product = product

          if (this.product.ubicacion != this.ubicacion) {
            this.openModalUbication = true
          }
          const length = this.product.fechavenc.lenqth
          var fechavenc = this.product.fechavenc[this.product.fechavenc.lenqth - 1]
          const fechaVencBefore = moment(fechavenc, 'DD/MM/YYYY').isBefore(moment())
          if (this.product.fechavenc.length > 1) {
            this.errorFechaVenc = true
            this.errorfechaVencText = 'Hay mas de una fecha de vencimiento'
            return
          }
          if (fechaVencBefore) {
            this.errorFechaVenc = true
            this.errorfechaVencText = 'El producto esta vencido'
            return
          } else {
            this.errorFechaVenc = false
            this.errorfechaVencText = ''
          }
        } else {
          console.log(product)
        }
      },
      checkReadonly() {
        if (this.ubicacion == '') {
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
        this.openModalConteo = true
        if (this.product.sku == 'GHI789') {
          this.errorConteo = true
          this.product.cuenta = parseInt(this.product.cuenta) + 1
          if (this.product.cuenta > 3) {
            console.log(this.product.cuenta)
            this.product = {}
          }
        } else {
          console.log(2)
          this.product = {}
        }
        console.log(this.product.sku)
      },
      save(date) {
        this.$refs.menu.save(date)
      },
    },
    watch: {
      product: {
        handler(val) {
          this.product.cant_final = val.cant_bultos * val.bultos
        },
        deep: true
      }
    }
  }

</script>
