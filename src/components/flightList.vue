<template>
  <div id="main">
    <div class="showError" v-show="Error"><h3>You must allow Location Access in orderd to get application running please</h3></div>
    <div  v-for="udata in sortedArray" :id="udata.Id">
      <router-link :to="{ name: 'flight', params: {
           id: udata.Id,
           from: udata.From,
           to:udata.To,
           man:udata.Man,
           mod:udata.Mdl,
           op:udata.Op
           }}">
      <div class="flightCard">
          <ul>
            <li>altitude: {{ udata.Alt }}</li>
            <li>Flight Code: {{ udata.Icao}}</li>
            {{udata.Id}}
            <li>
              <span v-show="udata.west">
                flying westbound
               <img class="rotateImg" src="../assets/airplane.svg" alt="">
              </span>
              <span v-show="!udata.west">
               flying eastbound
              <img src="../assets/airplane.svg" alt="">
              </span>
              <!--{{udata.west}}-->
            </li>
          </ul>
        </div>
      </router-link>
    </div>
    <!--{{userData}}-->
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
            console.log('lebi se');
          } else {
           console.log('lebi se');
          }
        },
        getFlightData(){
          this.axios.get(`http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${this.lat}5&lng=${this.long}&fDstL=0&fDstU=50`).then((response) => {
            // console.log(response.data)
            this.userData = response.data.acList;
            var i;
            for (i = 0; i < this.userData.length; i++) {
              // console.log( this.userData[i].Trak);
              if (this.userData[i].Trak < 180){
                this.userData[i].west = false;
              }else{
                this.userData[i].west = true;
              }
            }
            // console.log(this.userData);
          })
        },
        showPosition(position) {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          this.getFlightData();
        },
      },
      mounted(){
        setInterval(this.getFlightData,60000);  //60000
        // this.getLocation();
       // this.setDirection();
      },
      beforeMount() {
        this.getLocation();
        // this.getFlightData();
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
  }
  ul{
    flex:1;
    margin: 0 auto;
    /*width: 60%;*/
    width: 100%;
    max-height: 100px;
  }
  .flightCard{
    padding: 1em 0;
    display: flex;
    margin: 1em auto;
    flex-direction: column;
    border: 1px solid black;
    font-size: 16px;
    max-width: 80%;
    box-shadow: 1px 1px 1px black;
    background:#181A19;
    background:#F4F7F6;
    background:#1B2C34;

    color:#42AB9E;
    color:#181A19;
    color:#F4F7F6;
    font-size: 20px;
    text-transform: capitalize;

  }
  ul{
    display: flex;
    flex-direction: column;
    list-style: none;
    justify-content: flex-start;
    /*align-items: flex-start;*/
    flex-wrap: wrap;
    text-align: left;
  }
  ul li{

    /*text-align: left;*/
    /*width: 100%;*/
  }
  .rotateImg{
    transform: rotate(260deg);
  }
  a{
    text-decoration: none;
    color:black;
  }
</style>
// this.axios.get(`http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${this.lat}5&lng=${this.long}&fDstL=0&fDstU=50`).then((response) => {
//   console.log(response.data)
//   this.userData = response.data;
//   console.log(this.userData);
// })
