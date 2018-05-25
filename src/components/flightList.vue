<template>
  <div id="main">
    <div  v-for="udata in sortedArray">
        <div class="flightCard">
          <ul>
            <li>altitude: {{ udata.Alt }}</li>
            <li>Flight Code: {{ udata.Icao}}</li>
            <li>Operater: {{ udata.Op}}</li>
            <li>Track: {{ udata.Trak}}</li>
            <li>From: {{ udata.From}}</li>
            <li>To: {{ udata.To}}</li>
            <li>
              <span v-show="udata.west">west
               <img class="rotateImg" src="../assets/airplane.svg" alt="">
              </span>
              <span v-show="!udata.west">
                east
              <img src="../assets/airplane.svg" alt="">
              </span>
              <!--{{udata.west}}-->
            </li>
          </ul>
        </div>
    </div>
    {{userData}}
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
          direction:false

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
            // console.log(response.data)
            this.userData = response.data.acList;
            var i;
            for (i = 0; i < this.userData.length; i++) {
              console.log( this.userData[i].Trak);
              if (this.userData[i].Trak < 180){
                this.userData[i].west = false;
              }else{
                this.userData[i].west = true;
              }
            }
            console.log(this.userData);
          })
        },
        showPosition(position) {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          this.getFlightData();
        },
      },
      mounted(){
        setInterval(this.getFlightData,300);  //60000
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
    /*max-width: 15%;*/
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

  }
  ul{
    display: flex;
    flex-direction: column;
    list-style: none;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  ul li{

    /*text-align: left;*/
    /*width: 100%;*/
  }
  .rotateImg{
    transform: rotate(260deg);
  }
</style>
// this.axios.get(`http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${this.lat}5&lng=${this.long}&fDstL=0&fDstU=50`).then((response) => {
//   console.log(response.data)
//   this.userData = response.data;
//   console.log(this.userData);
// })
