<template>
  <v-form v-model="valid">
    <v-container class="d-flex flex-column">
      <v-row>
        <v-col class="d-flex" cols="12" md="12">

          <v-text-field v-model="usuario" :rules="userRules" label="Usuario" required>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex" cols="12" md="12">
          <v-text-field v-model="deposito" label="Depósito" required></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex" cols="12" md="12">
          <v-text-field v-model="ubicacion" :rules="ubicacionRules" label="Ubicación" required>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex align-center" cols="12" md="12">
          <v-text-field v-model="codigoBarras" readonly :rules="codigoRules" label="Código de barras" required></v-text-field>
          <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          v-on="on"
        >
        <v-icon>mdi-barcode-scan</v-icon>
        </v-btn>
      </template>

      <v-card>
        <barcodeReader/>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-col>
        
      </v-row>
      
				
      <v-row>
        <v-col class="d-flex" cols="12" md="12">
          <v-text-field v-model="codigoProducto" :rules="codigoRules" label="Codigo del producto" required>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex" cols="12" md="12">
          <v-text-field v-model="descripcion" :counter="100" :rules="descripcionRules" label="Descripcion del producto"
            required></v-text-field>
        </v-col>
      </v-row>

      <v-row>
				<v-col>
					<v-menu
						ref="menu"
						v-model="menu"
						:close-on-content-click="false"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="date"
								label="Fecha de vencimiento"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							v-model="date"
							:active-picker.sync="activePicker"
							min="1950-01-01"
							@change="save"
						></v-date-picker>
					</v-menu>
				</v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex" cols="12" md="12">
          <v-text-field v-model="cuenta" :rules="cuentaRules" label="Tipo de cuenta" required></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex" cols="12" md="12">
          <v-text-field v-model="bultos" :rules="bultosRules" label="Cantidad de bultos" required></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex" cols="12" md="12">
          <v-text-field v-model="cantidadBulto" :rules="cantidadBultoRules" label="Cantidad en bulto" required>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex" cols="12" md="12">
          <v-text-field v-model="cantidadFinal" :rules="cantidadFinalRules" label="Cantidad Final" required>
          </v-text-field>
        </v-col>
      </v-row>

    </v-container>
    <div class="justify-center d-flex">
      <v-btn color="primary rounded-pill">Enviar</v-btn>
    </div>
  </v-form>
</template>

<script>
import barcodeReader from '../components/barcodeReader.vue'

  export default {
  components: { barcodeReader },
    name: 'IndexPage',
    data: () => ({
      dialog: false,
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
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
    },
  }

</script>
