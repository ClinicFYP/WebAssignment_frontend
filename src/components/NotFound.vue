<template>
    <div class='container'>
        <h2>Page Not Found</h2>      
  </div>
</template>

<script>
import { authStatus } from '@/helper/authHeader'
export default {
  created () {
    if (authStatus()) {
      this.$router.push({ name: 'Home' })
    } else {
      this.$router.push({ name: 'Login' })
    }
  }
}

</script>