<template>
  <div id="carbountylistpage">
    <listing-page
      :isCar="true"
      title="Car Bounty Posts"
      v-on:newYear="setYear"
      v-on:newMake="setMake"
      v-on:newModel="setModel"
    />
    <div class="p-2" v-for="listing in listings" :key="listing._id">
      <listing-box
        class="p-2"
        :listing="listing"
        :isBountyListing="true"
        v-if="
          (listing.year == packet.year &&
            listing.make == packet.make &&
            listing.model == packet.model) ||
          (listing.year == packet.year &&
            '' == packet.make &&
            '' == packet.model) ||
          (listing.year == packet.year &&
            listing.make == packet.make &&
            '' == packet.model) ||
          packet.year == undefined
        "
      />
    </div>
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import ListingPage from "./ListingPageHeader.vue";
import ListingBox from "../../UI/ListingBox.vue";
import APIListingHelper from "../../../APIHelpers/APIListingHelper";

@Component({
  name: "PartsBountyPage",
  components: {
    ListingPage,
    ListingBox,
  },
})
export default class CarBountyListPage extends Vue {
  constructor() {
    super();
  }
  async created() {
    await APIListingHelper.fetchCarBounties().then((result) => {
      this.listings = result;
      console.log(this.listings)
    });
  }
  data() {
    return {
      listings: [],
      packet: {
        year: undefined,
        make: undefined,
        model: undefined,
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
}
</script>

<style scoped>
#title {
  width: 400;
  border: black solid 3px;
}
</style>