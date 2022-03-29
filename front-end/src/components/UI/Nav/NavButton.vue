<template>
  <div id="" @mouseover="listOne = true" @mouseleave="listOne = false">
    <div class="me-2">
      <router-link class="links" :to="link">
        <div
          class="navbutton"
          :class="{ navbuttonhover: listOne }"
          v-on:click="buttonClick"
        >
          {{ label }}
        </div>
      </router-link>

      <div v-if="listOne" id="underlineShow"></div>
      <div v-else id="underlineHidden"></div>
    </div>
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";

const Button = Vue.extend({
  props: {
    label: String,
    link: String,
  },
});

@Component({
  name: "navbutton",
})
export default class BountyButton extends Button {
  constructor() {
    super();
  }
  buttonClick() {
    this.$emit("buttonClick");
  }
  data() {
    return {
      listOne: false,
    };
  }
}
</script>

<style scoped>
.navbutton {
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
}
.navbuttonhover {
  background-color: rgb(10, 118, 248);
  border-radius: 10px;
}
.navbutton:active {
  background-color: rgb(1, 56, 124);
  border-radius: 10px;
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
#links {
  text-decoration: none;
  color: black;
}
</style>