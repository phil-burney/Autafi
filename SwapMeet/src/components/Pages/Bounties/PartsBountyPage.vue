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
            <h3>What part are you looking for?</h3>
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
          <parts-select-cluster
            id="parts-select"
            v-on:newYear="setYear"
            v-on:newMake="setMake"
            v-on:newModel="setModel"
            v-on:newPart="setPart"
          />
        </div>
        <div class="d-flex flex-row flex-wrap">
          <div id="imageholder">
            <image-selection
              class="m-3"
              v-on:newPhoto="setPhotos"
            ></image-selection>
          </div>
          <div id="descriptionholder" class="d-flex flex-column flex-wrap m-3">
            <textarea
              class="p-2"
              v-model="packet.description"
              id="description"
              rows="19"
              placeholder="Describe part here..."
            ></textarea>
          </div>
        </div>
        <div class="m-3">
          <span class="mb-2"> Bounty: </span>
          <div class="d-flex flex-row flex-wrap">
            <div class="pt-2 mb-2 flex-grow-1">
              <input
                v-model="packet.bounty"
                class="p-2"
                type="text"
                id="bounty"
              />
            </div>
            <bounty-button
              label="Place Bounty"
              class="align-self-end mt-1 p-2"
              v-on:buttonClick="submitPacket"
            >
              Place Bounty
            </bounty-button>
          </div>
        </div>
         <div class = "error">
        {{ errorMsg }}
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
import carCatalog from "../../../assets/CarCatalog";
import { findByYear, findByMake } from "../../../assets/CarCatalogQuery";
import BountyButton from "../../UI/BountyButton.vue";
import PartsSelectCluster from "../../UI/PartsSelectCluster.vue";
import axios from "axios";

@Component({
  name: "PartsPage",
  components: {
    Dropdown,
    ImageSelection,
    BountyButton,
    PartsSelectCluster,
  },
})
export default class PartsPage extends Vue {
  constructor() {
    super();
  }

  chooseImage() {
    this.$refs.fileInput.click();
  }
  data() {
    return {
      errorMsg: "",
      packet: {
        title: undefined,
        year: undefined,
        make: undefined,
        model: undefined,
        part: undefined,
        photos: [],
        description: undefined,
        bounty: undefined,

      },
    };
  }

  // Set year
  setYear(year) {
    this.packet.year = year;
  }
  setMake(make) {
    this.packet.make = make;
  }
  setModel(model) {
    this.packet.model = model;
  }
  setPart(part) {
    this.packet.part = part;
  }
  setPhotos(newPhotos) {
    this.packet.photos = newPhotos;
  }
  validateForm() {
    let validform = true;
    console.log(parseInt(this.packet.salePrice));
    if (this.packet.title == undefined || this.packet.title == "") {
      console.log(this.packet.title);
      this.errorMsg = "Ensure that your post has a title!";
      return false;
    }
    if (
      this.packet.year == undefined ||
      this.packet.make == undefined ||
      this.packet.model == undefined ||
      this.packet.part == undefined
    ) {
      this.errorMsg =
        "Ensure that the part has a year, make, model, and part type!";
      return false;
    }
    if (this.packet.description == undefined || this.packet.description == "") {
      this.errorMsg = "Ensure that you add a description!";
      return false;
    }
    if (this.packet.bounty == undefined) {
      this.errorMsg = "Ensure that you have a stated bounty!";
      return false;
    }
    if (isNaN(this.packet.bounty)) {
      this.errorMsg = "Ensure that your bounty is a number!";
      return false;
    }

    return validform;
  }
  submitPacket() {
    if (!this.validateForm()) {
      return;
    }
    this.packet.bounty = parseInt(this.packet.bounty);
    console.log(this.packet)
    this.packet.email = this.$store.state.user.email
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST",
      },
      cache: "default",
      body: JSON.stringify(this.packet),
    };
    fetch("/api/partbounty", options).then((response) => {
    }).then(() => { this.$router.push("/listing/success")});
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
#descriptionholder {
  width: 330px;
  height: 425px;
}
#bounty {
  border: black solid 3px;
}
</style>