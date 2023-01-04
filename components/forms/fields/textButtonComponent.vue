<template>
  <div class="fill-width">
    <label class="font-weight-regular mb-2 text-uppercase text-subtitle-2" :class="labelColor">{{label}}</label>
    <v-input v-bind="$attrs['class']" class="fill-width d-flex flex-column fill-width mt-2" hide-details>
      <v-text-field height="55" solo  @keyup.enter="enterEvent()" :readonly="disabled"  class="elevation-2  rounded-lg rounded-r-0 font-weight-regular input-width" ref="input"
        hide-details v-model="fieldValue" v-bind="$attrs">
        <template v-slot:prepend-inner>
        <slot></slot>
      </template>

      </v-text-field>
      <v-btn class="button-width rounded-l-0 black--text rounded-lg font-weight-regular" :disabled="disabled" :color="buttonColor"
        height="55" x-large @click="handler">
        <slot name="buttonicon">
          {{$data["button-label"]}}&nbsp;<v-icon color="white">{{icon}}</v-icon>
        </slot>
        
      </v-btn>
      <slot name="enterbutton"></slot>
    </v-input>
  </div>
</template>

<script>
  import enterMixin from '~/plugins/enterMixin.js'
  export default {
    mixins:[enterMixin],
    inheritAttrs: false,
    props: {
      disabled:{
        type: Boolean,
        default: false
      },
      "notification-text": {
        type: String,
        default: '',
      },
      handler: {
        type: Function,
        default: () => {}
      },
      value: null,
      "button-label": {
        type: String,
        default: 'Guardar'
      },
      icon: {
        type: String,
        default: 'mdi-content-save'
      },
      buttonColor: {
        type: String,
        default: 'primary'
      },
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
        fieldValue: this.value,
        isValid: null,
        focused: false,
        actionSuccess: false
      }
    },
    updated() {
      this.isValid = this.$refs.input.validate()
    },
    mounted(){
      this.$root.$on('focus', () => {
        this.$refs.input.focus()
      })
    },
    methods: {
      checkFocus() {
        if (!this.focused) {
          this.focused = true
        }
        this.$forceUpdate()
      }
    },
    watch: {
      value(newValue) {
        this.fieldValue = newValue
      },
      fieldValue(newValue) {
        this.$emit('input', newValue);
      },
    },
    computed: {
      props() {
        const props = JSON.parse(JSON.stringify(this.$props))
        delete props.value
        delete props.label
        return {
          ...props,
          ...this.$attrs
        }
      }
    }
  }

</script>

<style scoped lang="scss">
  .input-width {
    width: 90%;
  }

  .button-width {
    width: 10%;
  }

</style>
