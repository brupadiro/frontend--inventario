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
                      :editable="user.USUARIO ==''" :value="user.USUARIO" @enter="setUser($event)" label="Usuario" required>
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
                      :items="['DEP','DUM','FUL','MAL','MAY','MEL','NDT','PAT','PRE','RUP','VEN']" background-color="white" label-color="white--text" v-model="user.DEPO"
                      label="Depósito" required>
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
                      <v-btn color="info" block @click="modalUpdateDate=true" class="mt-2 fonti-weight-regular black--text">
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
                    <label class="font-weight-regular text-uppercase text-subtitle-2 white--text">Cantidad de bultos</label>
                    <v-input hide-details class="mt-2">
                      <v-text-field height="55" class="rounded-lg font-weight-regular" background-color="white" solo ref="input"  hide-details v-model="product.CANTIDAD">
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
                    <v-btn block color="success darken-1" class="font-weight-bold rounded-lg mt-7" :disabled="blockAddAccount" height="55"
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
            <v-list-item v-for="(fechavenc,index) in this.fechavencs" :key="index">
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
          El producto no se encuentra en la ubicacion seleccionada, desea guardar el sobrante?
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



    <v-dialog v-model="productCounted" persistent>
      <v-card>
        <v-card-title class="font-weight-bold">
          Aviso&nbsp;
          <v-spacer></v-spacer>
          <img src="/icons/alert.png" width="30">
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-2">
          El producto ya se conto hoy, deseas actualizarlo?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn outlined @click="()=>{
            this.productCounted = false;
            this.clearFields();
            this.focus();
          }">Salir</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="()=>{
            productCounted = false;
          }">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="productNotExists" persistent>
      <v-card>
        <v-card-title class="font-weight-bold">
          Aviso&nbsp;
          <v-spacer></v-spacer>
          <img src="/icons/alert.png" width="30">
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-2">
          El producto no existe en la base de datos.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn outlined @click="()=>{
            this.productNotExists = false;
            this.clearFields();
            this.focus();
          }">Salir</v-btn>
          <v-spacer></v-spacer>
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
    <v-dialog v-model="openConfirmFinishCount" persistent>
      <v-card>
        <v-card-title class="font-weight-bold">
          Aviso&nbsp;
          <v-spacer></v-spacer>
          <img src="/icons/alert.png" width="30">
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-2">
          Aun tienes productos sin contar en la ubicacion, deseas terminar el conteo?
        </v-card-text>
        <v-card-text class="py-2">
          <v-row class="py-3">
            <v-col class="col-6">
              <span class="text-subtitle-1 font-weight-regular">Productos pendientes</span>
            </v-col>
            <v-col class="col-6 d-flex justify-end">
              <span class="text-subtitle-1 font-weight-regular">{{ pendingProducts.length }}</span>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn outlined @click="()=>{
            this.openConfirmFinishCount = false;
            this.focus();
          }">No</v-btn>
          <v-spacer></v-spacer>

          <v-btn color="primary" @click="()=>{
            this.openConfirmFinishCount = false;
            this.cleanStorage();
          }">Si</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="openConfirmCount" persistent>
      <v-card>
        <v-card-title class="font-weight-bold">
          Aviso&nbsp;
          <v-spacer></v-spacer>
          <img src="/icons/alert.png" width="30">
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-2">
          Todos los articulos fueron contados correctamente
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="()=>{
            this.openConfirmCount = false;
          }">ACEPTAR</v-btn>
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
        <v-card-text class="py-2" v-else-if="errorConteo && this.product.cuenta <3">
          La cantidad final no coincide con la cantidad previamente registrada, realice nuevamente el conteo
        </v-card-text>
        <v-card-text class="py-2" v-else>
          {{ errorConteo && this.product.cuenta <3 }}
          {{ errorConteo }}
          {{ this.product.cuenta }}
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
      openModalDep:false,
      openConfirmFinishCount: false,
      openConfirmCount: false,
      openModalConteo: false,
      openNoArticlesModal: false,
      updateSobrante: false,
      cantExtra: 0,
      cuenta: 0,
      pendingProducts: [],
      countList:[],
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
          cuenta:this.product.cuenta
        }
        this.blockAddAccount = true
        this.focus()
      },
      confirmCleanStorage(){
        if (this.pendingProducts.length != 0) {
          console.log('no se puede limpiar')
          this.openConfirmFinishCount = true
          return
        } else{
          this.openConfirmCount = true
          this.cleanStorage()
        }

      },
      cleanStorage() {
        this.$store.dispatch('articles/savePendings',{
          articles:this.pendingProducts,
          UBICACION_PARTIDA:this.UBICACION_ARTI,
          USUARIO:this.user.USUARIO
        })
        localStorage.removeItem('user')
        localStorage.removeItem('ubicacion')
        this.user = {
          USUARIO:''
        }
        this.product = {
          cuenta: 0
        }
        this.UBICACION_ARTI = ""
        this.openConfirmCount = true
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

        await this.$store.dispatch('articles/find', {
          barcode: barcode,
          ubicacion: this.UBICACION_ARTI,
          DEPO: this.user.DEPO
        })
        let fechaVencs = this.articlesList.filter((item) => item.FECHA_VENCI != null && item.UBICACION_PARTIDA == this.UBICACION_ARTI).map((item) => item.FECHA_VENCI)




        fechaVencs = [...new Set(fechaVencs)]
        let product = null
        this.CAM_FECH = false
        if (this.articlesList.length > 0){
          console.log(this.articlesList.length)
            product = this.articlesList.find((item) => item.UBICACION_PARTIDA == this.UBICACION_ARTI)
          if (product == undefined) {
            product = JSON.parse(JSON.stringify(this.articlesList[0]))
          } else {
            product = JSON.parse(JSON.stringify(product))
          }

        }



        if (product) {





          let cantProductsInDay = (await this.$store.dispatch('articles/findByDateAndCod',{
        code:product.COD_ARTICULO,
        loc:this.UBICACION_ARTI
        })).data
        this.productCounted = cantProductsInDay == 0 ? false : true


          const extraInfo = await this.$store.dispatch('articles/findExtraInfo', barcode)
          product.UNI_X_BULTO = product.UNI_X_BULTO ?? 1
          product.FECHA_VENCI = fechaVencs[0]
          console.log(this.product.cuenta)
          this.product = {
            ...product,
            cuenta: this.product.cuenta ?? 0
          }
          this.product.COD_BARRAS = barcode
          console.log(this.product.UBICACION_PARTIDA, this.UBICACION_ARTI)
          if (this.product.UBICACION_PARTIDA != this.UBICACION_ARTI) {
            this.openModalUbication = true
          }
          if (this.product.COD_DEPO != this.user.DEPO) {
            this.openModalDep = true
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
          this.productNotExists = true
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
        this.CAM_FECH = true
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

        if(this.user.USUARIO == '') {
          this.$toast.error('Debe ingresar un usuario', {
            duration: 2000,
            containerClass: 'toast-container',
          })
          return
        }
        this.blockAddAccount = false


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
            CAM_FECH: VM.CAM_FECH
          })
        }
        const updatePendingProducts = function (VM) {
          const index = VM.pendingProducts.findIndex((item) => item.COD_ARTICULO == VM.product.COD_ARTICULO)
          VM.$delete(VM.pendingProducts, index)
        }

        const clearProduct = function (VM) {
          VM.product = {
            CANT_CONTEO: 0,
            UNI_X_BULTO: 0,
            CANTIDAD: 0,
            cuenta:VM.product.cuenta
          }
          VM.cantExtra = 0
          VM.focus()
        }
        

        if (this.updateSobrante) {
          this.$store.dispatch('articles/saveSobrante', {
            ...this.product,
            CANT_CONTEO: this.cantFinal,
            CAM_FECH: this.CAM_FECH
          })
          updatePendingProducts(this)
          funcSaveLog('Si', this)
          clearProduct(this)            
          this.product.cuenta = 0
          this.countList = []           
          this.focus()

          return
        } 


        if (this.cantFinal != this.product.CANT_PEND) {




          this.countList.push(this.cantFinal)
          
          if(this.countList.length > 1) {
            for (let i = 1; i < this.countList.length; i++) {
              if (this.countList[i] === this.countList[i - 1]) {
                this.$store.dispatch('articles/saveAjuste', {
                  ...this.product,
                  CANT_CONTEO: this.cantFinal,
                })
                updatePendingProducts(this)              
                funcSaveLog('Si', this)
                clearProduct(this) 
                this.product.cuenta = 0
                this.countList = []
                return;
              }
            }
          }



          this.errorConteo = true

          this.focus()
          if (this.product.cuenta == 4) {

            if (this.cantFinal > this.product.CANT_PEND){
          this.$store.dispatch('articles/saveSobrante', {
            ...this.product,
            CANT_CONTEO: this.cantFinal - this.product.CANT_PEND,
            CAM_FECH: this.CAM_FECH
          })
          updatePendingProducts(this)
          funcSaveLog('Si', this)
          clearProduct(this) 
          this.product.cuenta = 0
          this.countList = []           

          return
        }else {
          this.$store.dispatch('articles/saveAjuste', {
              ...this.product,
              CANT_CONTEO: this.cantFinal,
            })
            updatePendingProducts(this)            
            funcSaveLog('Si', this)
            clearProduct(this)
            this.product.cuenta = 0  
            this.countList = []           
            return

        }

          }
        } else {


          updatePendingProducts(this)          
          funcSaveLog('Si', this)
          clearProduct(this) 
          this.product.cuenta = 0 
          this.countList = []                       
          return
        }
        funcSaveLog('No', this)
        clearProduct(this) 
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
