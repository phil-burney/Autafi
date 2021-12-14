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
import ImageSelection from "../UI/ImageSelection.vue";
import carCatalog from "../../assets/CarCatalog.js";
import { findByYear, findByMake } from "../../assets/CarCatalogQuery";
import BountyButton from "../UI/BountyButton.vue";

@Component({
  name: "PartsSelectCluster",
  components: {
    Dropdown,

    BountyButton,
  },
})
export default class CarSelectCluster extends Vue {
  constructor() {
    super();
  }

  data() {
    return {
      carCatalogAsset: carCatalog.carCatalog,
      yearOptions: carCatalog.Years,
      makeOptions: [],
      modelOptions: [],
      parts: carCatalog.Parts,
      packet: {
        year: undefined,
        make: undefined,
        model: undefined,
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

  updateYear(year){
    this.setYear(year)
    this.setMake("");
    this.setModel("");
    this.setMakeOptions(year);
  }
  updateMake(make){
    this.setMake(make);
    this.setModel("");
    this.setModelOptions(this.packet.year, make);
  }
  updateModel(model){
    this.setModel(model);
  }
  setMakeOptions(year) {
    let makes = findByYear(year);
    this.makeOptions.length = 0;
    for (const [key] of Object.entries(makes.Make)) {
      this.makeOptions.push(key);
    }
  }
  setModelOptions(year, make) {
    let models = findByMake(year, make);
    this.modelOptions.length = 0;
    for (let model of models) {
      this.modelOptions.push(model);
    }
  }
  submitPacket() {
    console.log(this.packet);
  }
}
</script>

<style scoped>
#title {
  width: 400;
  border: black solid 3px;
}


</style>