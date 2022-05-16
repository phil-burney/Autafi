<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center"
    id="bg"
  >
    <div class="d-flex flex-column justify-content-center align-items-center p-5" id="success-box">
      <h1>SUCCESS!</h1>
      <h4>Your Post is Now Visible To All</h4>
      <router-link to="/">
        <bounty-button label="Return to the home page" />
      </router-link>
    </div>
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import BountyButton from "../UI/BountyButton.vue";
@Component({
  name: "SuccessRegisterPage",
  components: {
    BountyButton,
  },
})
export default class SuccessListingPage extends Vue {}
</script>

<style scoped>
#bg {
  /* The image used */
  background-image: url("../../assets/bronco2.jpg");

  /* Full height */
  height: 100vh;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.error {
  border: red solid 2px;
}
.errormsg {
  color: red;
}
#success-box {
  background-color: rgba(255,255,255, 0.5);
  border-radius: 40px;
}
</style>