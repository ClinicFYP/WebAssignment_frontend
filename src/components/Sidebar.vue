<template>
  <div>
    <nav class="bg-dark" id="sidebar" v-bind:class="{ active: isActive }">
      <ul class="list-unstyled components">
        <li>
          <a href="#" class="btn btn-info" v-on:click="toggleClass" id="sidebarCollapse">
            Toggle
          </a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="home">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="ballots">Ballot</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/">Pages</router-link>
        </li>
      </ul>
    </nav>

     <main class="LayoutDefault__main">
      <slot/>
    </main>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data: function() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleClass: function() {
      if (this.isActive) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    }
  }
};
</script>


<style scoped>
#sidebar {
  margin-top: -10px;
  min-width: 200px;
  max-width: 200px;
  min-height: 100vh;
  background: #7386d5;
  color: #fff;
  transition: all 0.3s;
}

/* Shrinking the sidebar from 250px to 80px and center aligining its content*/
#sidebar.active {
  min-width: 80px;
  max-width: 80px;
  text-align: center;
  margin-left: 200;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
/* maim */
p {
  font-family: "Poppins", sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid #47748b;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
  text-align: left;
}

#sidebar ul li a:hover {
  color: #7386d5;
  background: #fff;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: #6d7fcc;
}
ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}
/* main */

/* Toggling the sidebar header content, hide the big heading [h3] and showing the small heading [strong] and vice versa*/
#sidebar .sidebar-header strong {
  display: none;
}
#sidebar.active .sidebar-header h3 {
  display: none;
}
#sidebar.active .sidebar-header strong {
  display: block;
}

#sidebar.active ul li a {
  padding: 20px 10px;
  text-align: center;
  font-size: 0.85em;
}

#sidebar.active ul li a i {
  margin-right: 0;
  display: block;
  font-size: 1.8em;
  margin-bottom: 5px;
}

/* Same dropdown links padding*/
#sidebar.active ul ul a {
  padding: 10px !important;
}

/* Changing the arrow position to bottom center position, 
   translateX(50%) works with right: 50% 
   to accurately  center the arrow */
#sidebar.active .dropdown-toggle::after {
  top: auto;
  bottom: 10px;
  right: 50%;
  -webkit-transform: translateX(50%);
  -ms-transform: translateX(50%);
  transform: translateX(50%);
}

/* Toggle Button */
#sidebarCollapse span {
    width: 80%;
    height: 2px;
    margin: 0 auto;
    display: block;
    background: #555;
    transition: all 0.8s cubic-bezier(0.810, -0.330, 0.345, 1.375);
}

#sidebarCollapse span:first-of-type {
    /* rotate first one */
    transform: rotate(45deg) translate(2px, 2px);
}
#sidebarCollapse span:nth-of-type(2) {
    /* second one is not visible */
    opacity: 0;
}
#sidebarCollapse span:last-of-type {
    /* rotate third one */
    transform: rotate(-45deg) translate(1px, -1px);
}

#sidebarCollapse.active span {
    /* no rotation */
    transform: none;
    /* all bars are visible */
    opacity: 1;
    margin: 5px auto;
}
</style>
