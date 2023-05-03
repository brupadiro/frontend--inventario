<template>
      <v-dialog v-model="value" persistent>
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
          {{ errorConteo }}
          {{ this.product.cuenta }}
          La cantidad final no coincide con la cantidad previamente registrada, Realizando ajuste en sistema
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions v-if="false">
          <v-btn block color="primary" @click="updateCount()">Enviar nuevo conteo</v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-btn block color="primary" @click="closeModal()">Aceptar</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

</template>

<script>
export default {
    props:{
      value:false,
        errorConteo:false,
        product: {
            type: Object,
            default: () => {
              cuenta:0
            }
        }
    },
    methods:{
        updateCount() {
            this.$emit('updateCount', true)
            this.$emit('input', false)
        }, 
        closeModal() {
            this.$emit('input', false)
        }, 
    },
    computed:{
        product() {
            return this.$store.getters['products/get']
        }
    }
}
</script>

<style>

</style>