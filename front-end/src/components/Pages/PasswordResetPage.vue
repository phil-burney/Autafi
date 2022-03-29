<template>
  <div id="bg">
    <div class="p-5 d-flex justify-content-center">
      <div
        id="signupbox"
        class="m-5 p-5 d-flex flex-column justify-content-center"
      >
        <h1 class="align-self-center p-3">Reset Password</h1>
        <div class="align-self-center">
          <input
            class="p-2"
            id="n-password"
            v-model="sentPassword"
            type="password"
            placeholder="Password"
          />
          <div class="errormsg mb-5 align-self-center">
            {{ error.password }}
          </div>
        </div>

        <div class="align-self-center">
          <input
            class="p-2 align-self-center"
            id="n-password2"
            v-model="sentPassword2"
            type="password"
            placeholder="Retype Password"
          />
          <div class="errormsg mb-3 align-self-center">
            {{ error.password2 }}
          </div>
        </div>

        <bounty-button
          label="Reset Password!"
          class="align-self-center p-2"
          v-on:buttonClick="submitForm"
        >
        </bounty-button>
        <div class="errormsg text-wrap">
          {{ error.submit }}
        </div>
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
      sentPassword: "",
      sentPassword2: "",
      error: {
        password: "",
        password2: "",
        submit: "",
      },
    };
  }
  submitForm() {
    if (this.validateForm() == false) {
      return;
    }
    let query = this.$route.query;
    APIUserHelper.fetchPasswordReset(query.token, query.id, this.sentPassword)
      .catch((err) => {
        this.error.signup = err.message;
      })
      .then((response) => {
        if (response.ok) {
          this.$router.push("/resetpassword/confirmation");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          this.error.signup = data.message;
        }
      });
  }
  clearErrors() {
    var elements = document.getElementsByClassName("error");
    while (elements.length > 0) {
      elements[0].classList.remove("error");
    }
    this.error = {
      password: "",
      password2: "",
    };
  }
  validateForm() {
    this.clearErrors();
    let validform = true;
    if (this.sentPassword == "") {
      let z = document.getElementById("n-password");
      z.classList.add("error");
      this.error.password = "Password required!";
      validform = false;
    }
    if (
      !this.sentPassword.match(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]){8,}"
      )
    ) {
      let z = document.getElementById("n-password");
      z.classList.add("error");
      this.error.password =
        "Password have at least 8 characters, one lowercase letter, one number and one special character (!,@,#,$,%,&,*)!";
      validform = false;
    }
    if (this.sentPassword2 == "") {
      let z = document.getElementById("n-password2");
      z.classList.add("error");
      this.error.password2 = "Retype password!";
      validform = false;
    }
    if (this.sentPassword2 != this.sentPassword) {
      let z = document.getElementById("n-password2");
      z.classList.add("error");
      this.error.password2 = "Passwords must be the same!";
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
  width: 300px;
  height: 40px;
}
input {
  width: 300px;
}
</style>