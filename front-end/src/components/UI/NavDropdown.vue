<template>
   <div id="navdropdown" @mouseover="listOne = true" @mouseleave="listOne = false">

      <div id="listingtitle">View Listings</div>

        <ul v-if="listOne" @click="listOne = false">
            <li class="listings" v-for="link in links" :key="link.link">
                <router-link class="links" :to="link.link">
                {{link.title}}
            </router-link>
            </li>
        </ul>

    </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
const NavDropdownProps = Vue.extend({
    props: {
    links: [],
  },
})

@Component({
  name: "navdropdown",
})
export default class Dropdown extends NavDropdownProps{
  constructor() {
    super();
  }
  toggle() {
      this.active = !this.active
  }
  data() {
      return {
          listOne: true
      }
  }
}
</script>


<style scoped>
#listingtitle {
  display: block;
  padding: 20px;
  color: #fff;
  text-decoration: none;
  text-align:center;
  z-index: 2
}

#navdropdown:hover {
    background-color: #221;
}
#navdropdown {
  display:block;
  float: left;
  position: relative;
  background: #222;
  color: #fff;
  min-width: 180px;
}

#navdropdown ul {
  position: absolute;
  left: 0;
  top: 61px;
  margin: 0;
  padding: 0px;
  z-index: 1;
  background: #222;
}


.listings {
    min-width: 180px;
    padding:10px;
    padding-left: 40px;
}

.listings:hover {
   background: #122;
}
.links {
    text-decoration: none;
    color: #fff
}

</style>