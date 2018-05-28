<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Varela+Round|Space+Mono');
  body{
    background: #C1BDBE;
    background: #131313;
    background: #F5F5F5;
    background: url("./assets/1920x1080-airplane-in-the-sky.jpg");
    background: url("./assets/white_airplane-wallpaper-1920x1080.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: 'Space Mono', Helvetica, Arial, sans-serif;
  /*font-family: 'Varela Round', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  ul{
    display: flex;
    flex-direction: column;
    list-style: none;
    justify-content: flex-start;
    flex-wrap: wrap;
    text-align: left;
  }
  .flightCard{
    padding: 1em 2em;
    display: flex;
    margin: 1em auto;
    flex-direction: column;
    border: 1px solid black;
    font-size: 16px;
    max-width: 80%;
    box-shadow: 1px 1px 1px rgb(27, 44, 52);
    background:#181A19;
    background:#F4F7F6;
    background:rgba(27, 44, 52,0.5    );

    color:#42AB9E;
    color:#181A19;
    color:#F4F7F6;
    font-size: 20px;
    text-transform: capitalize;

  }
</style>
