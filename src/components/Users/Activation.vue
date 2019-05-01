<template>
    <div class="container">
    </div>
</template>

<script>
import { UserServices } from '@/services/UserServices'
import { EventBus } from '@/helper/eventBus'
export default {
/* eslint-disable */
    data: function () {
    return {
      loader: null
    }
  },
    created () {
        this.loader = this.$loading.show()
        console.log(this.$route.query)
        UserServices.userActivation (this.$route.query.token)
            .then(response => {
                this.loader.hide()
                EventBus.$emit('login', true)
                this.$router.push({ name: 'Home' })
            })
            .catch(error => {
                this.$msg({text: error})
                this.loader.hide()
                console.log(error)
                this.$router.push({ name: 'Login' })
                //this.error = true
                //this.message = error
            })
    }
}
</script>
