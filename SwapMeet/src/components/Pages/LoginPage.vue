<template>
  <div id="bg">
    <div class="p-5 d-flex justify-content-center">
      <div id="signupbox" class="p-5">
        <h1>Login</h1>

        <div>
          <input
            class="p-2"
            id="n-username"
            v-model="sentUsername"
            type="text"
            placeholder="Username"
            style="margin-top: 42px"
          />
          <br />
          <div class="errormsg">
            {{ error.username }}
          </div>
        </div>

        <br />

        <div>
          <input
            class="p-2"
            id="n-password2"
            v-model="sentPassword"
            type="password"
            placeholder="Password"
            style="margin-top: 42px"
          />
          <br />
          <div class="errormsg">
            {{ error.password }}
          </div>
        </div>
        <br />
        <bounty-button
          label="Log In!"
          class="align-self-end mt-5 p-2"
          v-on:buttonClick="submitForm"
        >
        </bounty-button>
        <div class="errormsg p-2">
          {{ error.login }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import authHeader from './authHeader';
import { Component, Prop, Vue } from "vue-property-decorator";
import BountyButton from "../UI/BountyButton.vue";
import config from "../../config";
import axios from "axios";
@Component({
  name: "SignupPage",
  components: {
    BountyButton,
  },
})
export default class LoginPage extends Vue {
  data() {
    return {
      sentUsername: "",
      sentPassword: "",
      error: {
        username: "",
        password: "",
        login: "",
      },
    };
  }
  submitForm() {
    if (this.validateForm() == false) {
      return;
    }
    console.log("register account");
    const options = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      //cache:"default",
      body: JSON.stringify({
        username: this.sentUsername,
        password: this.sentPassword,
      }),
    };

    fetch("/api/login", options)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) =>{
          // Update user and token
          this.$store.commit("setUser", data.user);
          this.$store.commit("setToken", data.token);
          localStorage.setItem(config.TOKEN, data.token);
          localStorage.setItem(config.NAME, data.user);

          axios.defaults.headers.common["Authorization"] = data.token;
          this.$router.push("/");
          })
        } else {
          return response.json();
        }
      }).then((data) => {
        if(data.message != undefined){
          this.error.login = data.message;
        }
      })
      .catch((err) => {
        this.$store.commit("setUser", null);
        this.$store.commit("setToken", null);
        localStorage.removeItem(config.TOKEN);
        localStorage.removeItem(config.NAME);
        this.error.login = err.message;
        delete axios.defaults.headers.common["Authorization"];
      });
  }

  validateForm() {
    let validform = true;
    if (this.sentUsername == "") {
      let y = document.getElementById("n-username");
      y.classList.add("error");
      this.error.username = "Username required!";
      validform = false;
    }
    if (this.sentPassword == "") {
      let z = document.getElementById("n-password2");
      z.classList.add("error");
      this.error.password = "Password required!";
      validform = false;
    }
    return validform;
  }
}
</script>
<style scoped>
.box {
  text-align: center;
  display: block;
  padding: 10px;
}

.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
#signupbox {
  background-color: rgba(109, 109, 109, 0.9);
}
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
</style>