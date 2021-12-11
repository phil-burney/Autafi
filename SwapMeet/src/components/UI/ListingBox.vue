<template>
  <div class="sale-box container p-3" v-on:click="seeMore">
    <div class="row">
      <h2 class="p-2 text-center title">{{ listing.title }}</h2>
    </div>
    <div class="row ">
      <div class="col-md-4 col-lg-4 d-flex justify-content-center">
      <div class="" id="imgcontainer">
        <img
          v-if="listing.images[0]"
          id="image"
          class="p-2 img-fluid"
          :src="currentPhoto"
        />
        
        <img v-else id="image" src="../../assets/part.svg" class="img-fluid" />
        </div>
      </div>
      <div class="col-md-4 col-lg-3 p-3" id="basicinfo">
        <h2 class="text-nowrap" v-if="isBountyListing">Bounty: ${{ listing.bounty }}</h2>
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
          <div class=" descriptionbox d-flex flex-column">
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
    console.log("boo");
  }
  created() {
    if (this.listing.images[0]) {
      this.currentPhoto = this.listing.images[0].photo;
    }
  }
  data() {
    return {
      photoArray: [],
      currentPhoto: undefined,
    };
  }
}
</script>

<style scoped>
div [class*="sale-box"] {
  border: grey solid 1px;
  border-radius: 10px;
}
div [class*="title"] {
  border: black solid 2px;
  background: orange;
  border-radius: 5px;
}
div [class*="descriptionbox"] {
  border: black solid 2px;
  background: orange;
  border-radius: 5px;
  height: 250px;
  min-width: 200px;
}
#imgcontainer {
  height: 300px;
  width: 350px;
  border: solid grey 1px;
}
</style>