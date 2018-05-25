<template>
  <div id="main">
    <ul  v-for="udata in sortedArray">
      <li>
        altitude: {{ udata.Alt }}
      </li>
      <li>
        Flight Code: {{ udata.Icao}}
      </li>
    </ul>
    {{userData}}
    <p>{{lat}}</p>
    <p>{{long}}</p>
  </div>
</template>


<script>

    export default {
      name: "flightList",
      data() {
        return {
          userData: [], // initialize empty array
          lat: '',
          long: '',
          search: ""
        }
      },
      methods: {
        getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
          } else {
          }
        },
        getFlightData(){
          this.axios.get(`http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${this.lat}5&lng=${this.long}&fDstL=0&fDstU=50`).then((response) => {
            console.log(response.data)
            this.userData = response.data.acList;
            console.log(this.userData);
          })
        },
        showPosition(position) {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          this.getFlightData();
        }
      },
      mounted(){
        setInterval(this.getFlightData, 60000);
      },
      beforeMount() {
        this.getLocation()
        console.log(this.getLocation)
      },
      computed:{
        sortedArray: function() {
          function compare(a, b) {
            if (a.Alt < b.Alt)
              return 1;
            if (a.Alt > b.Alt)
              return -1;
            return 0;
          }

          return this.userData.sort(compare);
        }
      }
    }

</script>

<style scoped>

</style>
// this.axios.get(`http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${this.lat}5&lng=${this.long}&fDstL=0&fDstU=50`).then((response) => {
//   console.log(response.data)
//   this.userData = response.data;
//   console.log(this.userData);
// })
