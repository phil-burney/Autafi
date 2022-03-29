<template>
  <div
    id="navdropdown"
    @mouseover="listOne = true"
    @mouseleave="listOne = false"
  >
    <div class="me-2">
      <div id="listingtitle" :class="{hoveringListTitle: listOne}">{{title}}</div>
      <div v-if="listOne" id="underlineShow"></div>
      <div v-else id="underlineHidden"></div>
      
      <div v-if="listOne" @click="listOne = false" id="listing-div">
        <div class="listings m-2 p-2" v-for="link in links" :key="link.link">
          <router-link class="links" :to="link.link">
            {{ link.title }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
const NavDropdownProps = Vue.extend({
  props: {
    links: [],
    title: String
  },
});

@Component({
  name: "navdropdown",
})
export default class Dropdown extends NavDropdownProps {
  constructor() {
    super();
  }
  toggle() {
    this.active = !this.active;
  }
  data() {
    return {
      listOne: false,
    };
  }
}
</script>


<style scoped>
#listingtitle {
  display: block;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  color: rgb(0, 0, 0);
  text-decoration: none;
  text-align: center;
  z-index: 2;
  white-space: nowrap;
  border-radius: 10px;
}
.hoveringListTitle {
  background-color: rgb(56, 143, 250);
}
#underlineShow {
  height: 4px;
  border-radius: 5px;
  position: relative;
  background-color: rgb(10, 118, 248);
  top: -2px;
  z-index: 4;
}
#underlineHidden {
  height: 4px;
  border-radius: 5px;
  position: relative;

  top: 15px;
  z-index: 4;
}
.listings:hover {
  background-color: rgb(140, 192, 255);
  border-radius: 10px;
}
#listing-div {
  position: absolute;
  z-index: 3;
  text-decoration: none;
  color: #000;
  background-color: rgb(10, 118, 248);
  border-end-start-radius: 5px;
  border-end-end-radius: 5px;
  animation-name: growDown;
  animation-duration: .2s;
  transform-origin: top center
}
.links {
  text-decoration: none;
  color: #000;
  white-space: nowrap;
}
@keyframes growDown {
  0% {
    transform: scaleY(0)
  }
  100% {
    transform: scaleY(1)
  }
}
</style>