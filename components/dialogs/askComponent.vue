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
          <slot></slot>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn outlined @click="closeModal()">Salir</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="updateSobrante()">Guardar</v-btn>
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
        },
        updateSobrante() {
            this.$emit('updateSobrante', true)
            this.$emit('input', false)
        }
    }
}
</script>

<style>

</style>