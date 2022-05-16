<template>
  <div id="landingpage">
    <title>SwapMeet</title>

    <body>
      <!-- Bootstrap JS -->

      <!-- your content here... -->

      <div id="body" target="target">
        <div id="heroimg" class="p-6 d-flex justify-content-center">
          <img src="../../assets/bronco.jpg" class="img-fluid" />
          <h3 class="d-flex text-center p-3" id="supportingtext">
            The marketplace for classic cars and hard to find parts
          </h3>
        </div>

        <div class="body">
          <div class="container px-4">
            <div class="row">
              <div class="col-md p-4 text-center" id="benefits">
                <h2>
                  Autafi is the new way to connect buyers and sellers who are
                  looking for any auto part.
                </h2>
              </div>
            </div>
            <div class="row">
              <div class="row">
                <div class="col-md p-3" id="benefits">
                  <div class="image-holder text-center p-2">
                    <img src="../../assets/bounty.svg" class="sale-img"/>
                  </div>
                  <h3 class="text-center">Use Autafi's Bounty System&trade;</h3>
                  <span class="p-1">
                    Autafi's Bounty System&trade; allows potential buyers to put
                    a bounty on the parts that they need, letting sellers look
                    for buyers for their parts.
                  </span>
                </div>
                <div class="col-md p-3" id="benefits">
                  <div class="image-holder text-center p-2">
                    <img src="../../assets/sale.svg" class="sale-img" />
                  </div>
                  <h3 class="text-center">Create Sales Posts</h3>
                  <span class="p-1">
                    All users have the ability to create sales pages for the
                    cars and parts that they are selling, allowing potential
                    buyers to view parts.
                  </span>
                </div>
                <div class="col-md p-3" id="benefits">
                  <div class="image-holder"></div>
                  <div class="image-holder text-center p-2">
                    <img src="../../assets/interface.svg" class="sale-img"/>
                  </div>
                  <h3 class="text-center">Enjoy Autafi's Elegant Interface</h3>
                  
                  <span class="p-1">
                    Autafi was designed with the user experience in mind. As a
                    result, Autafi is easy to use and navigate while also
                    looking simple and elegant.
                  </span>
                </div>
              </div>
              <div class="row p-5 d-flex justify-content-center">
                <router-link to="/signup" class="d-flex justify-content-center">
                  <bounty-button class="p-4" label="Sign Up Today!" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import BountyButton from "../UI/BountyButton.vue";
@Component({
  name: "CarsBountyPage",
  components: {
    BountyButton,
  },
})
export default class LandingPage extends Vue {}
</script>

<style scoped>
.sale-img{
  height: 200px
}
#supportingtext {
  background: rgba(255, 255, 255, 0.5);
  color: rgb(10, 118, 248);
  position: absolute;
  text-align: center;
  top: 70%;
  font-size: 3.5vw;
  width: fit-content;
  block-size: fit-content;
  border-radius: 10px;
}
#heroimg {
  position: relative;
}

.body {
  background-color: white;
}

</style>