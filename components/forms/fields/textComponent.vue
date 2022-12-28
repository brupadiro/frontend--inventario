<template>
  <div class="d-flex flex-column">
    <label class="font-weight-regular mb-2 text-uppercase text-subtitle-2" :class="labelColor">{{label}}</label>
    <v-text-field height="55" class="rounded-lg font-weight-regular" solo ref="input" @keyup.enter="enterEvent()" :rules="rules.required" :filled="disabled" :readonly="(disabled && !editable) || readonly" hide-details v-model="fieldValue" @focus="checkFocus()" v-bind="props">
      <template v-slot:prepend-inner>
        <slot></slot>
      </template>
      <template v-slot:append>
        <img v-if="disabled && !editable" src="/icons/check.png" width="30">
      </template>

    </v-text-field>
  </div>
</template>

<script>
  import enterMixin from '~/plugins/enterMixin.js'
  export default {
    mixins:[enterMixin],
    inheritAttrs: false,
    props: {
      editable:{
        type: Boolean,
        default: false
      },
      readonly:{
        type: Boolean,
        default: false
      },
      value: null,
      "label-color":{
        type: String,
        default: "grey--text text--darken-4"
      },
      label: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        rules:{
          required: [v => !!v || 'Campo requerido'],
        },
        focused:false,
        fieldValue:this.value,
      }
    },
    updated() {
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
      isValid(){
        if(this.$refs.input) {
          return this.$refs.input.validate()
        }
      },
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
