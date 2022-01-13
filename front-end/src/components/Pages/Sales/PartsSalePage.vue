<template>
  <div id="app">


    <title>SwapMeet</title>

    <body class="d-flex flex-column align-items-md-center">
      <div class="d-flex flex-column">
        <div>
          <div class="p-3">
            <h3>What part are you selling?</h3>
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
         <part-select-cluster v-on:newYear="setYear"
           v-on:newMake="setMake"
            v-on:newModel="setModel"
            v-on:newPart="setPart"/>
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
          <span class="mb-2"> Sale Price: </span>
          <div class="d-flex flex-row flex-wrap">
            <div class="pt-2 mb-2 flex-grow-1">
              <input
                v-model="packet.salePrice"
                class="p-2"
                type="text"
                id="saleprice"
              />
            </div>
            <bounty-button label = "Place Sale" class="align-self-end mt-1 p-2" v-on:buttonClick="submitPacket">
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
import BountyButton from "../../UI/BountyButton.vue"
import PartSelectCluster from "../../UI/PartsSelectCluster.vue"
import APIPostingHelper from "../../../APIHelpers/APIPostingHelper"

@Component({
  name: "CarsSalePage",
  components: {
    Dropdown,
    ImageSelection,
    BountyButton,
    PartSelectCluster
  },
})
export default class CarsSalePage extends Vue {
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
        salePrice: undefined,
        email: this.$cookie.get("email")
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
  setPart(part){
    this.packet.part = part;
  }
  setPhotos(newPhotos) {
    this.packet.photos = newPhotos;
  }

  validateForm() {
    let validform = true;
    if(this.packet.title == undefined || this.packet.title ==""){
 
      this.errorMsg = "Ensure that your post has a title!"
      return false
    }
    if (this.packet.year == undefined || this.packet.make == undefined || this.packet.model == undefined || this.packet.part == undefined) {
      this.errorMsg = "Ensure that the part has a year, make, model, and part type!"
      return false
    }
    if(this.packet.description == undefined || this.packet.description ==""){
      this.errorMsg = "Ensure that you add a description!"
      return false
    }
    if(this.packet.salePrice == undefined) {
      this.errorMsg = "Ensure that you have a sale price!"
      return false
    }
    if(isNaN(this.packet.salePrice)){
      this.errorMsg = "Ensure that your sale price is a number!"
      return false
    }


    return validform;
  }
  async submitPacket() {
    if(!this.validateForm()) {
      return;
    }


    // Set packet sale price to a number
    this.packet.salePrice = parseInt(this.packet.salePrice)
    let formPacket = new FormData()

    formPacket.append("title", this.packet.title)
    formPacket.append("year", this.packet.year)
    formPacket.append("make", this.packet.make)
    formPacket.append("model", this.packet.model)
    formPacket.append("part", this.packet.part)
    formPacket.append("description", this.packet.description)
    formPacket.append("salePrice", this.packet.salePrice)
    formPacket.append("email", this.packet.email)
    this.packet.photos.forEach((photo) => {
      formPacket.append("photo", photo)
    })
    APIPostingHelper.makePartSale(formPacket).then((response) => {
    }).then(() => { this.$router.push("/listing/success")});
  }
}
</script>

<style scoped>
.error {
  color: red
}
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
#saleprice {
  border: black solid 3px;
}

</style>