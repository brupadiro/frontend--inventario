<template>
  <v-dialog v-model="value" persistent>
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
              <v-btn color="primary" fab small @click="FECHA_VENCI = fechavenc">
                <img src="/icons/question.png" width="30" v-if="FECHA_VENCI != fechavenc">
                <img src="/icons/check.png" width="30" v-else>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <formsFieldsTextComponent background-color="white" type="date" label-color="white--text" 
        v-model="newFechaVenc"
          label="Fecha" required>
          <img src="/icons/calendar.png" width="30">
        </formsFieldsTextComponent>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn outlined @click="$emit('input', false)">Salir</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="updateDate()">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
    import dateMixin from '~/plugins/dateMixin'
    import {getField} from 'vuex-map-fields';
  export default {
    mixins: [dateMixin],
    props: {
      value: {
        type: Boolean,
        default: false
      },
      fechavencs: {
        type: Array,
        default: []
      }
    },

    data() {
      return {
        newFechaVenc: '',
      }
    },
    methods: {
      updateDate() {
        this.fechavenc = this.newFechaVenc
        this.errorFechaVenc = false;
        this.errorfechaVencText = ''
        this.CAM_FECH = true
        this.$emit('input', false)
      },
    },
    computed:{
        ...getField([
            'CAM_FECH',
            'errorFechaVenc',
            'errorfechaVencText',
            'fechaVenc',
            'product.FECHA_VENCI'
        ])
    }
  }

</script>
