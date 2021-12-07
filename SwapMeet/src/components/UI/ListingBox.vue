<template>
  <div class="sale-box container p-3" v-on:click="seeMore">
    <div class="row">
      <h2 class="ps-5">{{ listing.title }}</h2>
    </div>
    <div class="row">
      <div class="col-lg-3" id="imgcontainer">

        <img v-if="listing.images[0]" id="image" class = "p-2 img-fluid" :src="currentPhoto" />
        <img v-else id="image" src="../../assets/part.svg" class = "img-fluid"/>
      </div>
      <div class="col-lg-2 col-sm-6 p-5" id="basicinfo">
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
      <div class="col-lg-6 col-sm-12 p-5" id="advinfo">
        <table>
          <tr v-if="isBountyListing">
            <td>Bounty:</td>
            <td>{{ listing.bounty }}</td>
          </tr>
          <tr v-else>
            <td>Sale Price:</td>
            <td>{{ listing.salePrice }}</td>
          </tr>
          <tr>
            <td class="pe-2">Description:</td>
            <td>{{ listing.description }}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{{ listing.email }}</td>
          </tr>
        </table>
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
    if(this.listing.images[0]){
      this.currentPhoto = this.listing.images[0].photo
    }
  }
  data() {
    return {
      photoArray: [],
      currentPhoto: undefined
    };
  }

}
</script>

<style scoped>
div [class*="sale-box"] {
  border: grey solid 2px;
}
#imgcontainer {
  height:300px;
  width:300px;
  border: solid grey 1px;
}
</style>