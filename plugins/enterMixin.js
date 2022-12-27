export default{
    data() {
        return {
            disabled:false
        }
    },
    methods:{
        enterEvent(){
            this.disabled = true
            this.$emit('enter',this.fieldValue)
        }
    }
}