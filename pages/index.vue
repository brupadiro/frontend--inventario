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
                    :rules="userRules" label="Usuario" required>
                    <img src="/icons/account.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>
                <v-col class="col-12">
                  <formsFieldsTextButtonComponent background-color="white" label-color="white--text" v-model="deposito"
                    label="Depósito" required>
                    <img src="/icons/storage.png" width="30">
                    <template v-slot:buttonicon>
                      <img src="/icons/barcode-scanner.png" width="30">
                    </template>

                  </formsFieldsTextButtonComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" label-color="white--text" v-model="ubicacion"
                    :rules="ubicacionRules" label="Ubicación" required>
                    <img src="/icons/pin.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextButtonComponent background-color="white" label-color="white--text"
                    v-model="codigoBarras" :rules="codigoRules" label="Código de barras" required>
                    <img src="/icons/barcode.png" width="30">
                    <template v-slot:buttonicon>
                      <img src="/icons/barcode-scanner.png" width="30">
                    </template>
                  </formsFieldsTextButtonComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" label-color="white--text" v-model="codigoProducto"
                    :rules="codigoRules" label="Codigo del producto" required>
                    <img src="/icons/code.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" label-color="white--text" v-model="descripcion"
                    :counter="100" :rules="descripcionRules" label="Descripcion del producto" required>
                    <img src="/icons/product.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>
                <v-col>
                  <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition"
                    offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <formsFieldsTextComponent background-color="white" label-color="white--text" v-model="date"
                        label="Fecha de vencimiento" readonly v-bind="attrs" v-on="on">
                        <img src="/icons/calendar.png" width="30">
                      </formsFieldsTextComponent>
                    </template>
                    <v-date-picker v-model="date" :active-picker.sync="activePicker" min="1950-01-01" @change="save">
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" label-color="white--text" v-model="cuenta"
                    :rules="cuentaRules" label="Tipo de cuenta" required>
                    <img src="/icons/numbers.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" label-color="white--text" v-model="bultos"
                    :rules="bultosRules" label="Cantidad de bultos" required>
                    <img src="/icons/staging.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" label-color="white--text" v-model="cantidadBulto"
                    :rules="cantidadBultoRules" label="Cantidad en bulto" required>
                    <img src="/icons/products.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>

                <v-col class="col-12">
                  <formsFieldsTextComponent background-color="white" label-color="white--text" v-model="cantidadFinal"
                    :rules="cantidadFinalRules" label="Cantidad Final" required>
                    <img src="/icons/equal.png" width="30">
                  </formsFieldsTextComponent>
                </v-col>
              </v-row>

            </v-card-text>
            <v-card-actions>
              <v-btn color="primary rounded-pill">Enviar</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>

      </v-col>
    </v-row>
  </v-container>

</template>

<script>
  export default {
    name: 'IndexPage',
    data: () => ({
      date: null,
      menu: false,
      valid: false,
      usuario: '',
      userRules: [
        v => !!v || 'Usuario requerido'
      ],
      deposito: '',
      depositoRules: [
        v => !!v || 'Depósito es requerido'
      ],
      ubicacion: '',
      ubicacionRules: [
        v => !!v || 'Ubicación es requerida'
      ],
      codigoBarras: '',
      codigoBarrasRules: [
        v => !!v || 'Código de barras requerido'
      ],
      codigoProducto: '',
      descripcion: '',
      fechaVencimiento: '',
      cuenta: '',
      bultos: '',
      cantidadBulto: '',
      cantidadFinal: '',
      cuentaRules: [
        v => !!v || 'Cuenta es requerida'
      ],
      bultosRules: [
        v => !!v || 'La cantidad de bultos es requerida'
      ],
    }),
    watch: {
      menu(val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    methods: {
      save(date) {
        this.$refs.menu.save(date)
      },
    },
  }

</script>
