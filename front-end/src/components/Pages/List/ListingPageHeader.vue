

<template>
  <div id="listingpage">
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
      crossorigin="anonymous"
    />

    <title>SwapMeet</title>

    <body>
      <div class="d-flex flex-column">
        <div>
          <div class="p-3">
            <h3>{{title}}</h3>
          </div>
        </div>
        <div v-if="isCar">
          <car-select-cluster
            class="d-flex flex-column align-items-md-center"
            v-on:newYear="setYear"
            v-on:newMake="setMake"
            v-on:newModel="setModel"
          />
        </div>
        <div v-else>
          <parts-select-cluster
            class="d-flex flex-column align-items-md-center"
            id="parts-select"
            v-on:newYear="setYear"
            v-on:newMake="setMake"
            v-on:newModel="setModel"
            v-on:newPart="setPart"
          />
        </div>


      </div>
    </body>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
    crossorigin="anonymous"></script>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import Dropdown from "../../UI/Dropdown.vue";
import BountyButton from "../../UI/BountyButton.vue";
import CarSelectCluster from "../../UI/CarSelectCluster.vue";
import PartsSelectCluster from "../../UI/PartsSelectCluster.vue";


@Component({
  name: "PartsBountyPage",
  components: {
    Dropdown,
    PartsSelectCluster,
    CarSelectCluster,
    BountyButton,
  },
  props: {
      isCar: Boolean,
      title: String
  }
})
export default class ListPage extends Vue {
  constructor() {
    super();
  }

  data() {
    return {
      makeOptions: [],
      modelOptions: [],
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

  submitPacket() {

  }
}
</script>

<style scoped>
#title {
  width: 400;
  border: black solid 3px;
}
</style>