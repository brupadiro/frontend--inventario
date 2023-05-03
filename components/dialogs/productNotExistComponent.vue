<template>
      <v-dialog v-model="value" persistent>
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

</template>

<script>
export default {
  props:{
    value: {
      type: Boolean,
      default: false
    }
  },
    methods:{
        closeModal() {
            this.$emit('clearAndFocus', false)
            this.$emit('input', false)
        }
    }
}
</script>

<style>

</style>