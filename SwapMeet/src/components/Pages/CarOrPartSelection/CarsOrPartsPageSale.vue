<template>
  <div>


    <title>SwapMeet</title>
    <body>
  <!-- Bootstrap JS -->
  <div>
    <div class = "row p-3">
     <h3 class="col text-center">
       I would like to place a sale on:
     </h3>
    </div>
  </div>
  <div class="row p-4">

            <div class="col-sm p-2 m-2 partbutton d-flex flex-column" id="carbutton">
              <router-link to='/cars/createsale'>
              <h3 class = "text-center">A Car</h3>

              <img src="../../../assets/car.svg" class = "img-fluid p-2 d-flex align-self-center" id="carpic">

              </router-link>
            </div>


            <div class="col-sm p-2 m-2 partbutton d-flex  flex-column" id="partbutton">
              <router-link to='/parts/createsale'>
                <h3 class = "text-center">A Part</h3>
                <img src="../../../assets/part.svg" class = "img-fluid p-2 d-flex align-self-center" id="carpic">

              </router-link>
            </div>


  </div>

  <!-- your content here... -->




</body>

  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
    crossorigin="anonymous"></script>
<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class CarsOrPartsSalePage extends Vue {
}
</script>

<style scoped>

div [class*="button"]{

 border: black solid 3px

}
div [class*="partbutton"]:hover{
  filter: invert(60%) sepia(51%) saturate(3000%) hue-rotate(346deg) ;
}
</style>