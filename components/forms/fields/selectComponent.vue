<template>
  <div class="d-flex flex-column">
    <label class="font-weight-regular mb-2 text-uppercase text-subtitle-2" :class="labelColor">{{label}}</label>
    <v-select chips class="rounded-lg" solo ref="input" hide-details v-model="fieldValue" @focus="checkFocus()" v-bind="props">
      <template v-slot:prepend-inner>
        <slot></slot>
      </template>
    </v-select>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      value: null,
      label: {
        type: String,
        default: ''
      },
      "label-color":{
        type: String,
        default: "grey--text text--darken-4"
      },


    },
    data() {
      return {
        fieldValue: this.value,
        isValid: null,
        focused:false
      }
    },
    updated() {
      this.isValid = this.$refs.input.validate()
    },
    methods: {
      checkFocus() {
        if(!this.focused) {
          this.focused = true
        }
        this.$forceUpdate()
      }
    },
    watch: {
      fieldValue(newValue) {
        this.$emit('input', newValue);
      },
      value(value) {
        this.fieldValue = value
      },
      "$refs": {
        deep: true,
        handler(newValue) {
          console.log(console.log('isValid', this.$refs.input.validate()))
        }
      },
    },
    computed: {
      props() {
        const props = JSON.parse(JSON.stringify(this.$props))
        delete props.value
        delete props.label
        return {...props,...this.$attrs}
      }
    }
  }

</script>

<style>

</style>
