<template>
  <div class="pe-2">
    <div class="screen-tint" v-if="active"></div>
    <div
      class="menu d-md-none"
      @click="toggle()"
      @mouseover="listOne = true"
      @mouseleave="listOne = false"
    >
      Menu
    </div>
    
    <div v-if="listOne" id="underlineShow"></div>
    <div v-else id="underlineHidden"></div>
    <div v-if="active">
     
      <div id="vert-menu" class="p-3">
        <div class="d-flex flex-row justify-content-center p-3">
         <img
            src="../../../assets/exit_sign.svg"
            id="logo"
            @click="resetMenu()"
          />
        </div>
        <div v-if="this.$store.state.user == null">
          <router-link class="select" to="/signup">
            <div @click="resetMenu()" class="navbutton hoverable p-2">
              Sign Up
            </div>
          </router-link>

          <router-link class="select" to="/login">
            <div @click="resetMenu()" class="navbutton hoverable p-2">
              Login
            </div>
          </router-link>
        </div>
        <div v-else class="d-flex flex-row">
          <router-link class="select" to="/">
            <div
              @click="
                resetMenu()
                logout();
              "
              class="navbutton hoverable p-2"
            >
              Logout
            </div>
          </router-link>
        </div>
        <div :class="{ activeElement: activeMenu1 }">
          <div class="select hoverable p-2" @click="activeMenu1 = !activeMenu1">
            View Listings
          </div>
          <div v-if="activeMenu1" class="mb-2">
            <div
              @click="
                resetMenu()
              "
              class="listings hoverable p-1"
              v-for="link in viewLinks"
              :key="link.link"
            >
              <router-link class="links sublink ps-2" :to="link.link">
                {{ link.title }}
              </router-link>
            </div>
          </div>
        </div>

        <div
          v-if="this.$store.state.user != null"
          :class="{ activeElement: activeMenu2 }"
        >
          <div class="select p-2 hoverable" @click="activeMenu2 = !activeMenu2">
            Create Listings
          </div>
          <div v-if="activeMenu2">
            <div
              @click="
                resetMenu()
              "
              class="listings hoverable p-1"
              v-for="link in makeLinks"
              :key="link.link"
            >
              <router-link class="links sublink ps-2" :to="link.link">
                {{ link.title }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import NavButton from "./NavButton.vue";
import APIUserHelper from "../../../APIHelpers/APIUserHelper";
const NavDropdownProps = Vue.extend({
  props: {
    viewLinks: [],
    makeLinks: [],
    title: String,
  },
  components: {},
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
      activeMenu1: false,
      activeMenu2: false,
      active: false,
      listOne: false,
    };
  }
  resetMenu() {
    this.activeMenu1 = false;
    this.activeMenu2 = false;
    this.active = false;
    this.listOne = false;
  }
  logout() {
    APIUserHelper.fetchUserLogout().then(() => {
      this.$store.commit("setUser", this.$cookie.get("name"));
    });
  }
}
</script>


<style scoped>
@media only screen and (max-width: 300px) {
  #vert-menu {
    position: absolute;
    left: 0%;
    z-index: 1;
    background: rgb(56, 143, 250);
    width: 250px;
  }
}
.activeElement {
  background-color: white;
  border-radius: 10px;
}
#vert-menu {
  position: fixed;
  right: 0%;
  top: 0%;
  z-index: 2;
  background: rgb(56, 143, 250);
  width: 250px;
  animation-duration: 0.75s;
  animation-name: slidein;
  height: 100vh;
}
.select {
  text-decoration: none;
  color: black;
}
.sublink {
  font-size: 18px;
  text-decoration: none;
  color: black;
}
.hoverable:hover {
  background-color: rgb(161, 203, 253);
  border-radius: 5px;
}
#underlineShow {
  height: 4px;
  border-radius: 10px;
  position: relative;
  background-color: rgb(10, 118, 248);
  top: -2px;
  z-index: 1;
}
#underlineHidden {
  height: 4px;
  border-radius: 10px;
  position: relative;

  top: 15px;
  z-index: 1;
}
.menu {
  display: block;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  color: rgb(0, 0, 0);
  text-decoration: none;
  text-align: center;
  z-index: 1;
  white-space: nowrap;
}
.menu:hover {
  background-color: rgb(10, 118, 248);
  border-radius: 10px;
}
.screen-tint {
  position: fixed;
  top: 0%;
  right: 0%;
  z-index: 2;
  height: 100vh;
  width: 100%;
  animation-name: fadein;
  animation-duration: 0.75s;
  animation-fill-mode: forwards;
}
@keyframes slidein {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0%);
  }
}
@keyframes fadein {
  from {
    background-color: rgba(10, 10, 10, 0);
  }

  to {
    background-color: rgba(10, 118, 248, 0.5);
  }
}
</style>