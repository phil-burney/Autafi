<template>
  <div id="bg">
    <div class="p-5 d-flex justify-content-center">
      <div id="signupbox" class="m-5 p-5 d-flex flex-column justify-content-center">
        <h1 class = "align-self-center p-3">Login</h1>

        <div class = "align-self-center">
          <input
            class="p-2 "
            id="n-username"
            v-model="sentUsername"
            type="text"
            placeholder="Username"
          />
          <br />
          <div class="errormsg">
            {{ error.username }}
          </div>
        </div>

        <br />

        <div class = "align-self-center">
          <input
            class="p-2"
            id="n-password2"
            v-model="sentPassword"
            type="password"
            placeholder="Password"
          />
          <br />
          <div class="errormsg">
            {{ error.password }}
          </div>
        </div>
        <div class="d-flex align-content-center pt-5">
        <bounty-button
          label="Log In!"
          class = "m-2"
          v-on:buttonClick="submitForm"
        />
        <bounty-button
          label="Forgot Password?"
          class = "m-2"
          v-on:buttonClick="resetPassword"
        />
        </div>
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
import APIUserHelper from "../../APIHelpers/APIUserHelper"
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
    
      APIUserHelper.fetchUserLogin(this.sentUsername, this.sentPassword)
      .then((response) => {
        if(response.ok){
        this.$store.commit("setUser", this.$cookie.get("name"));
        this.$router.push("/");
        } else {
          return response.json()
        }
      }).then((data) => {
        this.error.login = data.message
      })
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
  resetPassword() {
    this.$router.push("/resetpassword/request")

  }
}
</script>
<style scoped>
.box {
  text-align: center;
  display: block;
  padding: 10px;
}

#signupbox {
  background-color: rgba(109, 109, 109, 0.9);
  border-radius: 40px;
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
  height: 20px
}
</style>