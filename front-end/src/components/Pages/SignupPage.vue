<template>
  <div id="bg">
    <div class="p-5 d-flex justify-content-center">
      <div id="signupbox" class="p-5 d-flex flex-column justify-content-center">
        <h1 class="align-self-center">Sign Up</h1>

        <div>
          <input
            class="p-2"
            id="n-email"
            v-model="sentEmail"
            type="text"
            placeholder="Email"
          />

          <div class="errormsg">
            {{ error.email }}
          </div>
        </div>

        <div>
          <input
            class="p-2"
            id="n-username"
            v-model="sentUsername"
            type="text"
            placeholder="Username"
          />

          <div class="errormsg">
            {{ error.username }}
          </div>
        </div>

        <div>
          <input
            class="p-2"
            id="n-password"
            v-model="sentPassword"
            type="password"
            placeholder="Password"
          />

          <div class="errormsg mb-5 text-wrap">
            {{ error.password }}
          </div>
        </div>

        <div>
          <input
            class="p-2"
            id="n-password2"
            v-model="sentPassword2"
            type="password"
            placeholder="Retype Password"
          />

          <div class="errormsg">
            {{ error.password2 }}
          </div>
        </div>

        <bounty-button
          label="Sign Up!"
          class="align-self-center p-2"
          v-on:buttonClick="submitForm"
        >
        </bounty-button>
        <div class="errormsg text-wrap">
          {{ error.signup }}
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
  name: "SignupPage",
  components: {
    BountyButton,
  },
})
export default class SignUpPage extends Vue {
  data() {
    return {
      sentEmail: "",
      sentUsername: "",
      sentPassword: "",
      sentPassword2: "",
      error: {
        email: "",
        username: "",
        password: "",
        password2: "",
        signup: "",
      },
    };
  }
  submitForm() {
    if (this.validateForm() == false) {
      return;
    }
    console.log("register account");

    //   APIUserHelper.fetchUserSignup(
    //     this.sentEmail,
    //     this.sentUsername,
    //     this.sentPassword
    //   )
    //     .catch((err) => {
    //       this.error.signup = err.message;
    //     })
    //     .then((response) => {
    //       if (response.ok) {
    //         this.$router.push("signup/success");
    //       } else {
    //         return response.json()
    //       }
    //     }).then(data => this.error.signup = data.message)
  }
  clearErrors() {
    var elements = document.getElementsByClassName("error");
    while (elements.length > 0) {
      elements[0].classList.remove("error");
    }
    this.error = {
      email: "",
      username: "",
      password: "",
      password2: "",
      signup: "",
    };
  }
  validateForm() {
    this.clearErrors();
    let validform = true;
    if (this.sentEmail == "") {
      let x = document.getElementById("n-email");
      x.classList.add("error");
      this.error.email = "Email required!";
      validform = false;
    }
    //W3C Email regex
    //eslint-disable-next-line
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //eslint-disable-next-line
    if (!this.sentEmail.match(emailRegex)) {
       let x = document.getElementById("n-email");
      x.classList.add("error");
      this.error.email = "Invalid email format!";
      validform = false;
    }
    if (this.sentUsername == "") {
      let y = document.getElementById("n-username");
      y.classList.add("error");
      this.error.username = "Username required!";
      validform = false;
    }
    if (this.sentPassword == "") {
      let z = document.getElementById("n-password");
      z.classList.add("error");
      this.error.password = "Password required!";
      validform = false;
    }

    if (!this.sentPassword.match("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]){8,}")) {
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

  padding: 10px;
}

input {
  width: 300px;
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
  width: 300px;
  height: 40px;
}
</style>