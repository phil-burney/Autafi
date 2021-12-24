<template>
  <div id="app">
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
      crossorigin="anonymous"
    />

    <title>SwapMeet</title>

    <body class="d-flex flex-column align-items-md-center">
      <div class="d-flex flex-column">
        <div>
          <div class="p-3">
            <h3>{{prompt}}</h3>
          </div>
        </div>

        <div
          class="d-flex flex-row align-items-baseline flex-wrap p-3"
          id="car-select"
        >
          <div>
            <input
              v-model="packet.title"
              placeholder="Put subject of post here"
              class="p-2"
              type="text"
              id="title"
            />
          </div>

          <car-select-cluster v-on:newYear="setYear"
           v-on:newMake="setMake"
            v-on:newModel="setModel"/>

        </div>
        <div class="d-flex flex-row flex-wrap">
          <div id="imageholder">
            <image-selection
              class="m-3"
              v-on:newPhoto="setPhotos"
            ></image-selection>
          </div>
          <div id="descriptionholder" class="d-flex flex-column flex-wrap m-3">
            <textarea class="p-2"
              v-model="packet.description"
              id="description"
              rows="19"
              placeholder="Describe part here..."
            ></textarea>
          </div>
        </div>
        <div class="m-3">
          <span v-if="isBounty" class ="mb-2"> Bounty: </span>
          <span v-else class ="mb-2"> Sale Price: </span>
          <div class="d-flex flex-row flex-wrap">
            <div class="pt-2 mb-2 flex-grow-1">
              <input
                v-model="packet.bounty"
                class="p-2"
                type="text"
                id="bounty"
              />
            </div>
            <bounty-button v-if="isBounty" label = "Place Bounty" class="align-self-end mt-1 p-2" v-on:buttonClick="submitPacket">
            </bounty-button>
            <bounty-button v-else label = "Place Sale" class="align-self-end mt-1 p-2" v-on:buttonClick="submitPacket">
            </bounty-button>
          </div>
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
import ImageSelection from "../../UI/ImageSelection.vue";
import carCatalog from "../../../assets/CarCatalog.json";
import BountyButton from "../../UI/BountyButton.vue"
import CarSelectCluster from "../../UI/CarSelectCluster.vue"

@Component({
  name: "CarsBountyPage",
  components: {
    Dropdown,
    ImageSelection,
    BountyButton,
    CarSelectCluster
  },
  props: {
      prompt: String,
      isBounty: Boolean
  }
})
export default class CarsBountyPage extends Vue {
  constructor() {
    super();
  }

  chooseImage() {
    this.$refs.fileInput.click();
  }
  data() {
    return {
      carCatalogAsset: carCatalog.carCatalog,
      yearOptions: carCatalog.Years,
      makeOptions: [],
      modelOptions: [],
      parts: carCatalog.Parts,
      packet: {
        title: undefined,
        year: undefined,
        make: undefined,
        model: undefined,
        photos: [],
        description: undefined,
        bounty: undefined,
      },
    };
  }

  setYear(year) {
    this.packet.year = year;
  }
  setMake(make) {
    this.packet.make = make;
  }
  setModel(model) {
    this.packet.model = model;
  }
  setPhotos(newPhotos) {
    this.packet.photos = newPhotos;
  }


  submitPacket() {

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      cache: "default",
      body: JSON.stringify(this.packet)
    };
    fetch("http://localhost:3030/api/carbounty", options).then((response) => {
    }).then(() => { location.href = '/'});
  }
}
</script>

<style scoped>
#title {
  width: 400;
  border: black solid 3px;
}
textarea {
  min-height: 425;
  resize: none;
}
#imageholder {
  width: 500px;
}
#descriptionholder{
  width: 330px;
  height: 425px;
}
#bounty {
  border: black solid 3px;
}


</style>