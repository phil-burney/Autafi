<template>
  <div class="bountybutton p-2" @mouseover="hover" v-on:click="buttonClick">
    {{ label }}
    {{this.$children[0]}}
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";

const Button = Vue.extend({
  props: {
    label: String,
  },
});

@Component({
  name: "bountybutton",
})
export default class BountyButton extends Button {
  constructor() {
    super();
  }
  buttonClick() {
    this.$emit("buttonClick");
  }
  hover(event) {
    let btn = event.target;
    btn.onmousemove = function (e) {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      btn.style.setProperty("--x", x + "px");
      btn.style.setProperty("--y", y + "px");
    };
  }
}
</script>

<style scoped>
:root {
  --x: 0%;
  --y: 0%;
}
.bountybutton {
  color: black;
  background-color: rgb(10, 118, 248);
  border: black solid 1px;
  border-radius: 10px;

  width: fit-content;
  white-space: nowrap;

}

.bountybutton:hover {
  background: radial-gradient(
    circle at var(--x) var(--y), rgb(48, 159, 187) 2px, rgb(10, 118, 248)
  );

}
.bountybutton:active {
  background: radial-gradient(
    circle at var(--x) var(--y), rgb(3, 39, 83) 2px, rgb(10, 118, 248)
  );
  color:white

}


</style>