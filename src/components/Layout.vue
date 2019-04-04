<template>
    <div id="app-layout">
        <sidebar class="sidebar"/>
        <router-view class="contentView"></router-view>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import {authStatus} from '../../helper/authHeader'
export default {
    mounted: function(){
        if(!authStatus()){
            this.$router.push('/login')
        }
    },
    components:{
        'sidebar': Sidebar
    }
}
</script>

<style>
#app-layout{
    display: flex;
    align-items: stretch;
}

/* #app-layout .sidebar{
    position: fixed;
    left: 0;
    height: 100%;
}

#app-layout .contentView{

} */
</style>
