<template>
  <div id="main">
    <ul>
      <li v-for="udata in userData">
        Id : {{ udata.id }} Name: {{ udata.name }}
      </li>

    </ul>
  </div>
</template>


<script>
  var dataURL = 'http://tutorialsplane.com/runtest/json/getUsers.php';
    export default {
        name: "landing",
        data(){
          return{
            userData: [], // initialize empty array
            lat:0,
            long:0
           }
        },
        methods:{
          getLocation() {
              if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(this.showPosition);
              } else {
              }
            },
          showPosition(position)   {
                this.lat = position.coords.latitude;
                this.long = position.coords.longitude;
              }
            },
          beforeMount(){
              this.getLocation()
          },
          mounted(){

              fetch('http://tutorialsplane.com/runtest/json/getUsers.php')
                .then(function(response) {
                  return response.json();
                })
                .then(function(myJson) {
                  console.log(myJson);
                });

          }
        }


</script>

<style scoped>

</style>
