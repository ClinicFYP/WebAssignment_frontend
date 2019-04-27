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
  margin-top: 0.25rem;
  text-align: left;
  padding-left: 10px;
  font-size: 80%;
  color: #dc3545;
}

.container {
  margin: 40px auto;
  width: 50%;
}

.header{
  margin: 10px;
}

table tr{
  text-align: center;
}

table td{
  text-align: center;
}
</style>
