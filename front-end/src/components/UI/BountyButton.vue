<template>
  <div class="bountybutton p-2" v-on:click = "buttonClick">
    {{label}}
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";

const Button = Vue.extend({
  props: {
    label: String,
  },  
})

@Component({
  name: "bountybutton",
})
export default class BountyButton extends Button{
  constructor() {
    super();
  }
  buttonClick(){
      this.$emit("buttonClick")
  }
  
}
</script>

<style scoped>
 div [class*="bountybutton"] {
  color: black;
  background-color: rgb(10, 118, 248);
  border: black solid 3px;
  border-radius: 10px;

  width: fit-content;
  white-space: nowrap;

}
div [class*="bountybutton"]:hover {
  color: white;
  background-color: black;
}
div [class*="bountybutton"]:active {
  background-color: white;
  color:black;
  border: black solid 3px;
}
</style>