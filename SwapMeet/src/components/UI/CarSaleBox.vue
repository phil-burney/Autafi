<template>
  <div class="sale-box container" v-on:click="seeMore">
    <div class="row">
      <h5 class="p-2">Part:</h5>
    </div>
    <div class="row">
      <div class="col-lg-3 col-sm-6 m-2" id="imgcontainer">
        <img id="image" class="image-fluid"  src="../../assets/car.svg" />
      </div>
      <div class="col-lg-2 col-sm-6 p-4" id="basicinfo">
        <table>
          <tr>
            <td>Year:</td>
            <td></td>
          </tr>
          <tr>
            <td>Make:</td>
            <td></td>
          </tr>
          <tr>
            <td class="pe-2">Model:</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="col-lg-6 col-sm-12 p-4" id="advinfo">
        <table>
          <tr >
            <td>Bounty:</td>
            <td></td>
          </tr>
          <tr>
            <td class="pe-2">Description:</td>
            <td></td>
          </tr>
          <tr>
            <td>Email:</td>
            <td></td>
          </tr>

        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";

const PartsSaleProps = Vue.extend({
  props: {
    saleInformation: {},
  },
});

@Component({
  name: "partssalebox",
  props: {
    car: String,
    year: String,
    make: String,
    model: String,
    price: String,
    description: String,
    email: String,
    images: Array
  }
})
export default class PartsSaleBox extends PartsSaleProps {
  constructor() {
    super();
  }
  seeMore() {
    console.log("boo");
  }
}
</script>

<style scoped>
div [class*="sale-box"] {
  border: grey solid 2px;
}
#imgcontainer {
  border: solid grey 1px;
}
</style>