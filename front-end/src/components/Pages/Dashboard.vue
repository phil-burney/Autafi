<template>
    <div class="p-5 d-box">
        <h1>Dashboard</h1>
        <br>
        <div>
          <h4>Number of Users: {{ userCount }}</h4>
          <h4>Number of Car Bounties: {{ carBounties }}</h4>
          <h4>Number of Part Bounties: {{ partBounties }}</h4>
          <h4>Number of Car Sales: {{ carSales }}</h4>
          <h4>Number of Part Sales: {{ partSales }}</h4>
          <br>
          <h6>Last updated at: {{ updated }}</h6>
        </div>
    </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import BountyButton from "../UI/BountyButton.vue";

@Component({
  name: "Dashboard",
  components: {
    BountyButton
  },
})
export default class Dashboard extends Vue {

  beforeMount() {
    this.getData();
  }
  
  data() {
    return {
      userCount: Number,
      carBounties: Number,
      partBounties: Number,
      carSales: Number,
      partSales: Number,
      updated: Date
    };
  }

  getData() {
    const options = {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    }
    fetch('/api/appstatus', options)
    .then(response => response.json())
    .then((data) => {
      this.userCount = data.users;
      this.carBounties = data.carBounties;
      this.partBounties = data.partBounties;
      this.carSales = data.carSales;
      this.partSales = data.partSales;
      this.updated = data.updated;
    })
  }
}
</script>
