<template>
  <div>
      aaaaaaaaaaa
      <div>
          aaaaaaaaaaaaa
      </div>
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
const NavDropdownProps = Vue.extend({

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
          active: false
      }
  }
}
</script>


<style scoped>


</style>