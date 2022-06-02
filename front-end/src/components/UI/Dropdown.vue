<template>
  <div>
    <div >
      <select class="dropdown p-2" id="select" v-model="selectionData" @change="changeHandler">
        <option class="option" disabled value="">{{this.label}}</option>
        <option class="option" :key="item"  v-for="item in content" >{{ item }}</option>
      </select>
    </div>
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
const DropdownProps = Vue.extend({
  props: {
    content: undefined,
    label: String,
    selection:undefined
  },
  watch: {
    selection: function(val){
      this.selectionData = val;
    }
  }
  
  
})

@Component({
  name: "dropdown",
})
export default class Dropdown extends DropdownProps{
  constructor() {
    super();
  }
  data() {
    return {contents:this.content, selectionData: ""}
  }
  changeHandler() {
    this.$emit('contentSelected', this.selectionData);
  }
}
</script>


<style scoped>
 select[class*="dropdown"]{
   width: 140px;
   background: rgb(10, 118, 248);
   border: black solid 2px;
 }
 .option {
   background: rgb(10, 118, 248);
 }

</style>