export default {
  methods: {
    validateForm() {
      if (!this.$refs.form.validate()) {
        this.$toast.error('Rellene todos los campos', {
          duration: 2000,
          containerClass: 'toast-container',
        });
        return false;
      }

      if (this.user.USUARIO === '') {
        this.$toast.error('Debe ingresar un usuario', {
          duration: 2000,
          containerClass: 'toast-container',
        });
        return false;
      }

      return true;
    },

    async handleUpdateSobrante() {
      await this.$store.dispatch('articles/saveSobrante', {
        ...this.product,
        CANT_CONTEO: this.cantFinal,
        CAM_FECH: this.CAM_FECH,
      });
      this.updatePendingProducts();
      this.funcSaveLog('Si');
      this.clearProduct();
      this.product.cuenta = 0;
      this.focus();
    },

    handleDifferentPendingAmount() {
      this.countList.push(this.cantFinal);
      if (this.countList.length > 1) {
        for (let i = 1; i < this.countList.length; i++) {
          if (this.countList[i] === this.countList[i - 1]) {
            this.handleEqualCounts();
            return;
          }
        }
      }

      this.errorConteo = true;
      this.focus();
      if (this.product.cuenta === 4) {
        this.handleFourCounts();
      }
    },

    async handleEqualCounts() {
      await this.$store.dispatch('articles/saveAjuste', {
        ...this.product,
        CANT_CONTEO: this.cantFinal,
      });
      this.updatePendingProducts();
      this.funcSaveLog('Si');
      this.clearProduct();
      this.product.cuenta = 0;
      this.countList = [];
    },

    async handleFourCounts() {
      if (this.cantFinal > this.product.CANT_PEND) {
        await this.$store.dispatch('articles/saveSobrante', {
          ...this.product,
          CANT_CONTEO: this.cantFinal - this.product.CANT_PEND,
          CAM_FECH: this.CAM_FECH,
        });
      } else {
        await this.$store.dispatch('articles/saveAjuste', {
          ...this.product,
          CANT_CONTEO: this.cantFinal,
        });
      }
      this.updatePendingProducts();
      this.funcSaveLog('Si');
      this.clearProduct();
      this.product.cuenta = 0;
    },


    openModalAndIncrementCount() {
      this.openModalConteo = true;
      this.errorConteo = false;
      this.product.cuenta = parseInt(this.product.cuenta) + 1;
    },

    funcSaveLog(ULTIMO_REG) {
      this.$store.dispatch('articles/saveLog', {
        ...this.product,
        ...this.user,
        CANT_CONTEO: this.cantFinal,
        UBICACION_PARTIDA: this.UBICACION_ARTI,
        ULTIMO_REG: ULTIMO_REG,
        CAM_FECH: this.CAM_FECH,
      });
    },

    updatePendingProducts() {
      const index = this.pendingProducts.findIndex(
        (item) => item.COD_ARTICULO === this.product.COD_ARTICULO
      );
      this.$delete(this.pendingProducts, index);
    },

    clearProduct() {
      this.product = {
        CANT_CONTEO: 0,
        UNI_X_BULTO: 0,
        CANTIDAD: 0,
        cuenta: this.product.cuenta,
      };
      this.cantExtra = 0;
      this.focus();
    },

    async updateConteo() {
      if (!this.validateForm()) {
        return;
      }

      this.blockAddAccount = false;
      this.openModalAndIncrementCount();

      if (this.updateSobrante) {
        await this.handleUpdateSobrante();
        return;
      }

      if (this.cantFinal !== this.product.CANT_PEND) {
        this.handleDifferentPendingAmount();
      } else {
        this.updatePendingProducts();
        this.funcSaveLog('Si');
        this.clearProduct();
        this.product.cuenta = 0;
      }
    }


  }
}
