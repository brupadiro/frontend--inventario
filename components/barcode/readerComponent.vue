<template>
  <v-dialog v-model="value" width="100%" class="ma-0">
    <v-card outlined width="100%" class="rounded-lg">
      <v-card-title>
        Escanea el Codigo
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('input',false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider class="py-2"></v-divider>
      <v-card-text class="d-flex justify-center">
        <StreamBarcodeReader class="rounded-lg" @decode="onDecode"></StreamBarcodeReader>
      </v-card-text>
      <v-card-text>

        <v-btn-toggle class="elevation-3 rounded-lg" color="primary white--text" style="width:100%">
          <v-btn width="33%" active-class="primary" @click="onDecode(123456)" class="font-weight-bold" value="1">
            BAR 1
          </v-btn>
          <v-btn width="33%" active-class="primary" @click="onDecode(987654)" class="font-weight-bold" value="2">
            BAR 2
          </v-btn>
          <v-btn width="33%" active-class="primary" @click="onDecode(456789)" class="font-weight-bold" value="3">
            BAR 3
          </v-btn>
        </v-btn-toggle>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import {
    StreamBarcodeReader
  } from "vue-barcode-reader";

  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    components: {
      StreamBarcodeReader
    },
    methods: {
      onDecode(result) {
        console.log(result)
        this.$emit('decode', result)
        this.$emit('input', false)
      }
    }

  }

</script>

<style>

</style>
