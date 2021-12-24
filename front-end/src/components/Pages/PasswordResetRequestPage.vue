<template>
  <div id="bg">
    <div class="p-5 d-flex justify-content-center">
      <div
        id="signupbox"
        class="m-5 p-5 d-flex flex-column justify-content-center"
      >
        <h1 class="align-self-center p-3">Reset Password Request</h1>

        <div class="align-self-center justify-content-center mb-3">
          <input
            class="p-2"
            id="email"
            v-model="email"
            type="text"
            placeholder="Email"
          />
          <div class="errormsg">
            {{ error.email }}
          </div>
        </div>
        <bounty-button
          label="Reset Password"
          class="align-self-center"
          v-on:buttonClick="submitForm"
        />
      </div>
    </div>
  </div>
</template>
<script>
//import authHeader from './authHeader';
import { Component, Prop, Vue } from "vue-property-decorator";
import BountyButton from "../UI/BountyButton.vue";
import APIUserHelper from "../../APIHelpers/APIUserHelper";
@Component({
  name: "PasswordResetPage",
  components: {
    BountyButton,
  },
})
export default class LoginPage extends Vue {
  data() {
    return {
      email: "",
      error: {
        email: "",
      },
    };
  }
  submitForm() {
    if (this.validateForm() == false) {
      return;
    }

    APIUserHelper.fetchEmailtoChangePassword(this.email)
      .then((response) => {
        if (response.ok) {
           this.$router.push("/resetpassword/request/confirmation");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.error.login = data.message;
      });
  }

  validateForm() {
    let validform = true;
    if (this.email== "") {
      let y = document.getElementById("email");
      y.classList.add("error");
      this.error.email = "Email required!";
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
  height: 20px;
}
</style>