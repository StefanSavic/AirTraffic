<template>
  <div>
    <h1>FLIGHT</h1>
    <ul>
      <li>From:{{ $route.params.from }}</li>
      <li>To:{{ $route.params.to }}</li>
      <li>Manufacturer:{{ $route.params.man }}</li>
      <li>Model:{{ $route.params.mod }} </li>
      <li>AirLine:{{ $route.params.op }}</li>
      <img :src="imgPreUrl + manFl" :alt="$route.params.op">
    </ul>

  </div>

</template>

<script>
    export default {
        name: "flight",
      data(){
          return{
            imgPreUrl:"//logo.clearbit.com/",
            manFl:""
          }

      },
      methods:{
          opFlag:function () {
            this.manFl = this.$route.params.op.toLowerCase().replace(/\s/g, "") + ".com";
            console.log(this.manFl);
          }
      },
      beforeMount(){
          this.opFlag();

      }
    }
</script>

<style scoped>

</style>
