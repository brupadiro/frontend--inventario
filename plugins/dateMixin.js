import moment from 'moment'
export default {
  methods: {
    formatDate(date) {
      if (this.product.FECHA_VENCI) {
        return moment(date).add(1, 'days').format('DD/MM/YYYY')
      }
      return moment(date).format('DD/MM/YYYY')
    },
  }
}
