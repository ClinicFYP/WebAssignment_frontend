<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
export default {
  name: 'App',
  components: {
    'navbar': Navbar,
    'sidebar': Sidebar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* background-color: red; */
}

.error-input{
  text-align: left;
  padding-left: 5px;
  font-size: 15px;
  color: red;
}

.container {
  margin: 40px auto;
  width: 50%;
}

.header{
  margin: 10px;
}

</style>
