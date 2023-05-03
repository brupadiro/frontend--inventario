import moment from 'moment'
export default {
  methods: {
    async findArticle(barcode) {
        await this.$store.dispatch('articles/find', {
          barcode,
          ubicacion: this.UBICACION_ARTI,
          DEPO: this.user.DEPO,
        });
      },
      
      getUniqueExpirationDates() {
        return [
          ...new Set(
            this.articlesList
              .filter(
                (item) =>
                  item.FECHA_VENCI !== null &&
                  item.UBICACION_PARTIDA === this.UBICACION_ARTI
              )
              .map((item) => item.FECHA_VENCI)
          ),
        ];
      },
      
      getProduct() {
        console.log(this.articlesList)
        return this.articlesList.length > 0
          ? JSON.parse(
              JSON.stringify(
                this.articlesList.find(
                  (item) => item.UBICACION_PARTIDA === this.UBICACION_ARTI
                ) || this.articlesList[0]
              )
            )
          : null;
      },
      
      async countProductsInDay(product) {
        const { data } = await this.$store.dispatch('articles/findByDateAndCod', {
          code: product.COD_ARTICULO,
          loc: this.UBICACION_ARTI,
        });
        this.productCounted = data !== 0;
      },
      
      async setProductDetails(product, fechaVencs) {
        await this.$store.dispatch('articles/findExtraInfo', product.COD_BARRAS);
        this.product = {
          ...product,
          UNI_X_BULTO: product.UNI_X_BULTO ?? 1,
          FECHA_VENCI: fechaVencs[0],
          cuenta: this.product?.cuenta ?? 0,
        };
        this.$store.dispatch('products/set', this.product);
      },
      
      checkModalConditions(product) {
        this.openModalUbication = product.UBICACION_PARTIDA !== this.UBICACION_ARTI;
        this.openModalDep = product.COD_DEPO !== this.user.DEPO;
      },
      
      validateExpirationDate(fechaVencs) {
        const fechavenc = fechaVencs[0];
        const fechaVencBefore = moment(fechavenc, 'DD/MM/YYYY').isBefore(moment());
      
        if (fechaVencs.length > 1) {
          this.errorfechaVencText = 'Hay más de una fecha de vencimiento';
        } else if (fechaVencBefore) {
          this.errorfechaVencText = 'El producto está vencido';
        } else if (this.product.VALIDAR_VENCI === 'S') {
          this.errorfechaVencText = 'Es necesario validar la fecha de vencimiento';
        } else {
          this.errorfechaVencText = '';
        }
      
        this.errorFechaVenc = this.errorfechaVencText !== '';
        return !this.errorFechaVenc;
      },
      
      async checkProduct(barcode) {
        await this.findArticle(barcode);
        const fechaVencs = this.getUniqueExpirationDates();
        const product = this.getProduct();
        console.log(product)
     
        if (product) {
          await this.countProductsInDay(product);
          await this.setProductDetails(product, fechaVencs);
          this.checkModalConditions(product);
      
          if (!this.validateExpirationDate(fechaVencs)) {
            return;
          }
        } else {
          this.productNotExists = true;
        }
      }
      
    }
}
