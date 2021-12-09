<template>
  <div id="app">
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
      crossorigin="anonymous"
    />

    <div id="headline">
      <div class="row">
        <h1 class="col header text-left d-flex justify-content-left p-4">
          <router-link to="/">
            <p id="swapTitle">Swap</p>
            <p id="meetTitle">Meet</p>
          </router-link>
        </h1>
        <div class="col d-flex flex-row align-items-end justify-content-end">

        </div>

        <div class="col d-flex flex-row align-items-end justify-content-end">
          <div class="p-2">
          <router-link to="/listingSelect">
              <bounty-button label="View Listings" />
            </router-link>
          </div>
          <div v-if="true" class="d-flex flex-row p-2">
            <router-link to="/login">
              <bounty-button label="Login" />
            </router-link>
            <div class="p-2 align-self-center">Or</div>
            <router-link to="/signup">
              <bounty-button label="Sign Up" />
            </router-link>

          </div>
          <div
            v-else
            class="p-2 col d-flex flex-row align-items-end justify-content-end"
          >
            <div class="p-2">Welcome, {{  }}</div>
            <bounty-button
              class="ps-2"
              label="Logout"
              v-on:buttonClick="logout"
            />
            <router-link class="ps-2" to="/selectcarsorpartsbounty">
              <bounty-button label="Post Bounty" class="p-2" />
            </router-link>
            <router-link class="ps-2" to="/selectcarsorpartssale">
              <bounty-button label="Post Sale" />
            </router-link>

          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import BountyButton from "./components/UI/BountyButton.vue";
import Dropdown from "./components/UI/Dropdown.vue";
import store from "./Store";
import config from "./config.json";
import axios from "axios";

@Component({
  name: "CarsSalePage",
  components: {
    BountyButton,
    Dropdown,
  },
  store,
})
export default class App extends Vue {
  beforeMount() {
    console.log(localStorage.getItem(config.TOKEN))
    const options = {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem(config.TOKEN),
      }),

    };

    axios("http://localhost:3030/api/user/validatetoken", options)
      .then((response) =>  {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
      })
      


  }

  logout() {
    console.log("register account");
    const options = {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      //cache:"default",
      body: JSON.stringify({
        username: this.$store.state.user.username,
        token: this.$store.state.token,
      }),
    };

    fetch("http://localhost:3030/api/logout", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    // Update user and token
    this.$store.commit("setUser", null);
    this.$store.commit("setToken", null);
    localStorage.removeItem(config.TOKEN);
    localStorage.removeItem(config.NAME);

    delete axios.defaults.headers.common["Authorization"];
    console.log(this.$router.currentRoute.path);
    if (this.$router.currentRoute.path != "/") {
      this.$router.push("/");
    }
  }
  data() {
    return {
      username: localStorage.getItem(config.NAME),
    };
  }
}
</script>

<style>
#headline {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
#swapTitle{
    color:grey;
    display:inline;

}
#meetTitle{
    color:orange;
    display:inline;

}
#headline {
    border: solid grey 1px;
}
 *{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
 }
 a:link{
   text-decoration: none;
 }
</style>