<template>
  <div id="main">
    <div class="showError" v-show="Error"><h3>You must allow Location Access in orderd to get application running please</h3></div>
    <div  v-for="udata in sortedArray" :id="udata.Id">
    <div v-if="!udata">
      No Airoplanes around you.
    </div>
      <router-link :to="{ name: 'flight', params: {
           id: udata.Id,
           from: udata.From,
           to:udata.To,
           man:udata.Man,
           mod:udata.Mdl,
           op:udata.Op
           }}">
        <transition name="fade">


      <div class="flightCard">
          <ul>
            <li>altitude: {{ udata.Alt }}</li>
            <li>Flight Code: {{ udata.Icao}}</li>
            <li>
              <span v-show="udata.west">
                flying westbound
               <img class="rotateImg" src="../assets/airplane.svg" alt="">
              </span>
              <span v-show="!udata.west">
               flying eastbound
              <img src="../assets/airplane.svg" alt="">
              </span>
            </li>
          </ul>
        </div>
        </transition>
      </router-link>
    </div>
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
          search: "",
          direction:false,
          Error:false

        }
      },
      methods: {
        error() {
         this.Error = true
        },
        getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition,this.error);
          } else {
          }
        },
        getFlightData(){
          this.axios.get(`http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${this.lat}5&lng=${this.long}&fDstL=0&fDstU=50`).then((response) => {
            this.userData = response.data.acList;
            var i;
            for (i = 0; i < this.userData.length; i++) {
              if (this.userData[i].Trak < 180){
                this.userData[i].west = false;
              }else{
                this.userData[i].west = true;
              }
            }
          })
        },
        showPosition(position) {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          this.getFlightData();
        },
      },
      mounted(){
        // setInterval(this.getFlightData,60000);
        setInterval(this.getFlightData,300);
      },
      beforeMount() {
        this.getLocation();
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
        },
      }
    }

</script>

<style scoped>
  img{
    margin-left: 1em;
    max-width:2%;
    min-width: 30px;
  }
  ul{
    flex:1;
    margin: 0 auto;
    width: 100%;
    max-height: 100px;
  }
  .rotateImg{
    transform: rotate(260deg);
  }
  a{
    text-decoration: none;
    color:black;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

