<template>
  <div id="landingpage">
   

    <title>SwapMeet</title>
    
    <body>
  <!-- Bootstrap JS -->


  <!-- your content here... -->


  <div id="body" target="target">

    
    <div id="heroimg" class="p-6 d-flex justify-content-center">
      <img src = "../../assets/bronco.jpg" class="img-fluid">
        <h3 class="d-flex text-center p-2" id="supportingtext">The marketplace for classic cars and hard to find parts</h3>
    </div>

    <section class="body">
      <div class="container px-4">
        <div class="row">
          <div class="col-md p-4 text-center" id="benefits">

            <h2>SwapMeet has a multitude of ways to faclilitate the matching of buyers and sellers. </h2>

          </div>
          

        </div>
        <div class="row">
        <div class="row">
          <div class="col-md p-4" id="benefits">
            <h3 class = "text-center">Use Our Bounty System&trade;</h3>
            <span class= "p-1 ">    
              Our Bounty System&trade; allows buyers to put a bounty on certain parts that they need, allowing sellers
              to look for buyers for their parts and get the best price.  
            </span>

          </div>
          <div class="col-md p-4" id="benefits">
            <h3 class = "text-center">Create Sales Pages</h3>
            <span class="p-1">
              All users have the ability to create sales pages
              for the cars and parts that they are selling, allowing potential buyers to view parts and then message the
              seller.  Whether you are buying or selling cars or parts, SwapMeet has an option that will suit
              you.
            </span>

          </div>
        </div>
        <div class="row p-5 d-flex justify-content-center">
         <router-link to="/signup" class="d-flex justify-content-center">
              <bounty-button class = "p-4" label="Sign Up Today!" />
          </router-link>
        </div>
          
          </div>
          
        </div>


    </section>
  </div>
</body>

  </div>
</template>
<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import BountyButton from "../UI/BountyButton.vue"
@Component({
  name: "CarsBountyPage",
  components: {
    BountyButton,
  },
})
export default class LandingPage extends Vue {
}
</script>

<style scoped>

#supportingtext{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  background: rgba(63, 63, 63, 0.7);
    color:orange;
    position:absolute;
    text-align: center;
    top: 70%;
    font-size: 3.5vw;
    width: fit-content;
  block-size: fit-content;
  border-radius: 3px
   

}
#heroimg{
    position:relative;
    
}
#calltoaction{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  background-color: #111111;
  width: 500px;
  color: white;
  margin: 0 auto;
  overflow: hidden;
  padding: 10px 0;
  align-items: center;
  justify-content: space-around;
  display: flex;
  float: none;
  border-radius: 15px;
  box-shadow: 0 25px 20px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.19);
  offset: 50px;

}
.body{
  background-color: grey;

}
div [class*="swapbutton"]{
  background-color: orange;
  width: fit-content;
  block-size: fit-content

}
div>img{
  width: 100%;
  height: auto;
}
</style>