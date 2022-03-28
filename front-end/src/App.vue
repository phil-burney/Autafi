<template>
  <div id="app">
    <div id="headline" class="d-flex align-items-end justify-content-end">
      <div class="col header text-left d-flex justify-content-left">
        <router-link to="/">
          <img
            src="./assets/inspired_logo_2.svg"
            class="img-fluid m-2 ps-3 pe-3"
            id="logo"
          />
        </router-link>
      </div>

      <div class="d-none d-md-flex flex-row">
        <div v-if="this.$store.state.user == null" class="d-flex flex-row">
          <nav-button label="Login" link="/login" />

          <nav-button label="Sign Up" link="/signup" />
        </div>
        <div v-else class="d-flex flex-row">
          <nav-button label="Logout" v-on:buttonClick="logout" link="/" />

          <nav-drop-down title="Create Listing" :links="createListingLinks" />
        </div>
        <nav-drop-down title="View Listings" :links="viewListingLinks" />
      </div>
      <div>
        <nav-vert-menu
          :makeLinks="createListingLinks"
          :viewLinks="viewListingLinks"
        />
      </div>
      <div
        v-if="this.$store.state.user != null"
        class="p-2 me-2 mb-2 username text-wrap text-center"
      >
        Welcome, {{ this.$store.state.user }}
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import NavButton from "./components/UI/Nav/NavButton.vue";
import NavDropDown from "./components/UI/Nav/NavDropdown.vue";
import NavVertMenu from "./components/UI/Nav/NavVertMenu.vue";
import store from "./Store";
import APIUserHelper from "./APIHelpers/APIUserHelper";

@Component({
  name: "App",
  components: {
    NavButton,
    NavDropDown,
    NavVertMenu,
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
  data() {
    return {
      viewListingLinks: [
        { title: "Car Bounties", link: "/bounty/car/list" },
        { title: "Car Sale Posts", link: "/sale/car/list" },
        { title: "Part Bounties", link: "/bounty/part/list" },
        { title: "Part Sale Posts", link: "/sale/part/list" },
      ],
      createListingLinks: [
        { title: "Create Car Bounty Post", link: "/bounty/car/create" },
        { title: "Create Car Sale Post", link: "/sale/car/create" },
        { title: "Create Part Bounty Post", link: "/bounty/part/create" },
        { title: "Create Part Sale Post", link: "/sale/part/create" },
      ],
    };
  }
}
</script>

<style>
#swapTitle {
  color: grey;
  display: inline;
}
#headline {
  border: solid grey 1px;
}
* {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
}
a:link {
  text-decoration: none;
}
#logo {
  max-height: 100px;
  min-width: 100px;
}
.username {
  background-color: rgb(56, 143, 250);
  border-radius: 5px;
}
</style>