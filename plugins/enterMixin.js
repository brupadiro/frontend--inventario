export default {
  props: {
    enterActive: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      disabled: false,
    }
  },
  methods: {
    enterEvent() {
      if (!this.enterActive) return
      this.disabled = true
      this.$emit('enter', this.fieldValue)
    }
  }
}
