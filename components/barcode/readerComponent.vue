<template>
  <v-dialog v-model="value">
    <v-card outlined width="700" class="rounded-lg">
        <v-card-title>
            Escanea el Codigo
            <v-spacer></v-spacer>
            <v-btn icon @click="$emit('input',false)">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider class="py-2"></v-divider>
      <v-card-text>
        <StreamBarcodeReader @decode="onDecode"></StreamBarcodeReader>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import {
    StreamBarcodeReader
  } from "vue-barcode-reader";

  export default {
    props:{
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
        this.$emit('decode',result)
      }
    }

  }

</script>

<style>

</style>
