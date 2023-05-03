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

</template>

<script>
export default {
    props:{
        pendingProducts: {
            type: Array,
            default: []
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        cleanStorage() {
            this.$emit('cleanStorage', true)
            this.$emit('input', false)
        },
        closeModal() {
            this.$emit('focus', true)
            this.$emit('input', false)
        }
    }
}
</script>

<style>

</style>