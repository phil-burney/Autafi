<template>
  <div>
    <listing-page class = "p-5" :isCar="false" title="Part Sale MarketPlace"
    v-on:newYear="setYear"
      v-on:newMake="setMake"
      v-on:newModel="setModel"
      v-on:newPart="setPart"
     />
    <div class="p-2" v-for="listing in listings" :key="listing._id">
      <listing-box class = "p-2" :listing="listing" :isPartListing="true"
      v-if="
          (listing.year == packet.year && listing.make == packet.make && listing.model == packet.model && listing.part== packet.part) ||
          (listing.year == packet.year && '' == packet.make && '' == packet.model && ''== packet.part) || 
          (listing.year == packet.year && listing.make == packet.make && '' == packet.model && ''== packet.part) ||
          (listing.year == packet.year && listing.make == packet.make && listing.model == packet.model && ''== packet.part) ||
          (packet.year == undefined)
        
        "
      />
    </div>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
    crossorigin="anonymous"></script>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import Dropdown from "../../UI/Dropdown.vue";
import carCatalog from "../../../assets/CarCatalog";
import BountyButton from "../../UI/BountyButton.vue";
import ListingBox from "../../UI/ListingBox.vue";
import ListingPage from "./ListingPageHeader.vue";
import APIListingHelper from "../../../APIHelpers/APIListingHelper";

@Component({
  name: "PartsBountyPage",
  components: {
    Dropdown,
    BountyButton,
    ListingPage,
    ListingBox,
  },
})
export default class PartsSaleListPage extends Vue {
  constructor() {
    super();
  }

  async created() {
    await APIListingHelper.fetchPartSales().then(
      (result) => (this.listings = result)
    );
    console.log(this.listings);
  }

  data() {
    return {
      listings: [],
      packet: {
        year: undefined,
        make: undefined,
        model: undefined,
        part: undefined,
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
  setPart(part) {
    this.packet.part = part;
    console.log(this.packet)
  }
}
</script>

<style scoped>
#title {
  width: 400;
  border: black solid 3px;
}

</style>