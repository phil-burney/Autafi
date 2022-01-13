<template>
  <div class="sale-box container p-3" v-on:click="seeMore">
    <div class="row">
      <h2 class="p-2 text-center title">{{ listing.title }}</h2>
    </div>
    <div class="row">
      <div class="col-md-4 col-lg-4 d-flex flex-row justify-content-center">
        <div v-if="listing.images.length > 0" class="d-flex flex-column justify-content-center" id="imgcontainer" :style = "{ backgroundImage: 'url(' + listing.images[imgIdx] + ')' }">
          <div class="d-flex flex-grow-1 align-items-end">
          <div >
          <img
            id="leftarrow"
            src="../../assets/arrow.svg"
            class="img-fluid m-2 p-1"
            v-on:click="decrementIdx"
          />
          </div>
          <div class="w-100 d-flex justify-content-end">
          <img
            id="rightarrow"
            src="../../assets/arrow.svg"
            class="img-fluid m-2 p-1"
            v-on:click="incrementIdx"
          />
          </div>
          </div>
          <div  class = "flex-grow-1 d-flex align-items-end justify-content-center">

            <div id= "imgcounter" class = "p-1">
            Image {{imgIdx + 1}} of {{ listing.images.length }}
            </div>
          </div>
        </div>
        <div v-else-if="isPartListing" id="imgcontainer" >
          <img class = "img-fluid" src="../../assets/part.svg" id="defaultimg">
        </div>
        <div v-else-if="isCarListing" id="imgcontainer">
          <img src="../../assets/car.svg" id="defaultimg">
        </div>

      </div>
      <div class="col-md-4 col-lg-3 p-3" id="basicinfo">
        <h2 class="text-nowrap" v-if="isBountyListing">
          Bounty: ${{ listing.bounty }}
        </h2>
        <h2 v-else>Sale Price: ${{ listing.salePrice }}</h2>

        <table>
          <tr>
            <td>Year:</td>
            <td>{{ listing.year }}</td>
          </tr>
          <tr>
            <td>Make:</td>
            <td>{{ listing.make }}</td>
          </tr>
          <tr>
            <td class="pe-2">Model:</td>
            <td>{{ listing.model }}</td>
          </tr>
          <tr v-if="isPartListing">
            <td>Part:</td>
            <td>{{ listing.part }}</td>
          </tr>
        </table>
      </div>
      <div class="col-md-4 col-lg-5 p-2" id="advinfo">
        <div class="descriptionbox d-flex flex-column">
          <h4 class="text-center">Description</h4>
          <div class="p-2">{{ listing.description }}</div>
        </div>
        <h5 class="pt-3">Email: {{ listing.email }}</h5>
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";

const ListingProps = Vue.extend({
  props: {
    saleInformation: {},
  },
});

@Component({
  name: "listingbox",
  props: {
    listing: Object,
    isPartListing: Boolean,
    isBountyListing: Boolean,
  },
})
export default class ListingBox extends ListingProps {
  constructor() {
    super();
  }
  seeMore() {
    console.log("");
  }
  data() {
    return {
      photoArray: [],
      currentPhoto: undefined,
      imgIdx: 0
    };
  }
  incrementIdx() {
    if(this.imgIdx < this.listing.images.length - 1) {
      this.imgIdx++
    }
  }
  decrementIdx() {
    if(this.imgIdx >= 1) {
      this.imgIdx--
    }
  }
}
</script>

<style scoped>
div {
  color: black;
}
div [class*="sale-box"] {
  border: grey solid 1px;
  border-radius: 10px;
}
div [class*="title"] {
  border: black solid 2px;
  background: rgb(10, 118, 248);
  border-radius: 5px;
}
div [class*="descriptionbox"] {
  border: black solid 2px;
  background: rgb(10, 118, 248);
  border-radius: 5px;
  height: 250px;
  min-width: 200px;
}
#imgcontainer {
  height: 300px;
  width: 350px;
  border: solid grey 1px;
  background-size: cover;
  background-position: center;
}
#image {
  width: inherit;
  height: inherit;

}
#leftarrow {
  height: 50px;
  fill:white;
  background: rgba(255,255,255,0.5);
   border-radius: 5px;
}
#rightarrow {
  height: 50px;
  transform: scaleX(-1);
  background: rgba(255,255,255,0.5);
   border-radius: 5px;
}
#imgcounter {
  background: rgba(255,255,255,0.5);
   border-radius: 5px;
}
#defaultimg {
  object-fit: cover;
  height: 300px;
  width: 350px;
}
</style>