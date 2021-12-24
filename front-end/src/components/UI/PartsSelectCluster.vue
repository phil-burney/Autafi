<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row flex-wrap">
      <div class="d-flex flex-row">
        <dropdown
          class="p-1"
          label="Year"
          :content="yearOptions"
          :selection.sync="packet.year"
          v-on:contentSelected="updateYear"
        ></dropdown>

        <dropdown
          class="p-1"
          label="Make"
          :content="makeOptions"
          :selection.sync="packet.make"
          v-on:contentSelected="updateMake"
        ></dropdown>
      </div>

      <div class="d-flex flex-row">
        <dropdown
          class="p-1"
          label="Model"
          :content="modelOptions"
          :selection.sync="packet.model"
          v-on:contentSelected="updateModel"
        ></dropdown>

        <dropdown
          class="p-1"
          label="Part"
          :content="parts"
          :selection.sync="packet.part"
          v-on:contentSelected="updatePart"
        ></dropdown>
      </div>
    </div>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
    crossorigin="anonymous"></script>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import Dropdown from "../UI/Dropdown.vue";
import { findByYear, findByMake, getYears, getParts } from "../../assets/CarCatalog/CarCatalogQuery";
import BountyButton from "../UI/BountyButton.vue";

@Component({
  name: "PartsSelectCluster",
  components: {
    Dropdown,

    BountyButton,
  },
})
export default class PartsSelectCluster extends Vue {
  constructor() {
    super();
  }

  data() {
    return {
      yearOptions: getYears(),
      makeOptions: [],
      modelOptions: [],
      parts: getParts(),
      packet: {
        year: undefined,
        make: undefined,
        model: undefined,
        part: undefined,
      },
    };
  }

  // Set year
  setYear(year) {
    this.packet.year = year;
    this.$emit("newYear", year);
  }
  setMake(make) {
    this.packet.make = make;
    this.$emit("newMake", make);
  }
  setModel(model) {
    this.packet.model = model;
    this.$emit("newModel", model);
  }
  setPart(part) {
    this.packet.part = part;
    this.$emit("newPart", part);
  }
  updateYear(year){
    this.setYear(year)
    this.setMake("");
    this.setModel("");
    this.setPart("");
    this.setMakeOptions(year);
  }
  updateMake(make){
    this.setMake(make);
    this.setModel("");
    this.setPart("");
    this.setModelOptions(this.packet.year, make);
  }
  updateModel(model){
    this.setModel(model);
    this.setPart("");
  }
  updatePart(part){
    this.setPart(part);
  }

  setMakeOptions(year) {
    this.makeOptions = findByYear(year);
  }
  setModelOptions(year, make) {
    this.modelOptions = findByMake(year, make);
  }

}
</script>

<style scoped>
#title {
  width: 400;
  border: black solid 3px;
}


</style>