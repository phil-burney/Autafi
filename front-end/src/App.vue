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
        <h1 class="col header text-left d-flex justify-content-left">
          <router-link to="/">
            <img
              src="./assets/inspired_logo_1.svg"
              class="img-fluid m-2 ps-3"
              id="logo"
            />
          </router-link>
        </h1>

        <div
          class="
            col-md-4
            d-sm-inline-flex
            flex-row
            align-items-end
            justify-content-end
          "
        >
          <div
            v-if="this.$store.state.user == null"
            class="d-flex flex-row p-2"
          >

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
          >
            <div class="p-1">
            </div>
            <div class="p-1">Welcome, {{ this.$store.state.user }}</div>
            <bounty-button
              class="m-1"
              label="Logout"
              v-on:buttonClick="logout"
            />
          </div>
          <nav-drop-down
            :links="[
              { title: 'Car Bounties', link: '/cars/bounty/list' },
              { title: 'Car Sale Posts', link: '/cars/sale/list' },
              { title: 'Part Bounties', link: '/parts/bounty/list' },
              { title: 'Part Sale Posts', link: '/parts/sale/list' },
            ]"
          />
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
import APIUserHelper from "./APIHelpers/APIUserHelper";
import NavDropDown from "./components/UI/NavDropdown.vue";

@Component({
  name: "CarsSalePage",
  components: {
    BountyButton,
    Dropdown,
    NavDropDown,
  },
  store,
})
export default class App extends Vue {
  beforeMount() {
    this.$store.commit("setUser", this.$cookie.get("name"));

    APIUserHelper.fetchTokenConf().then((response) => {
      if (!response.ok) {
        this.logout();
      }
    });
  }
  logout() {
    APIUserHelper.fetchUserLogout().then(() => {
      this.$store.commit("setUser", this.$cookie.get("name"));
    });
  }
}
</script>

<style>
#headline {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
#swapTitle {
  color: grey;
  display: inline;
}
#headline {
  border: solid grey 1px;
}
* {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
a:link {
  text-decoration: none;
}
#logo {
  max-height: 100px;
}
</style>