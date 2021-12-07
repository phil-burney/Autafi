<template>
  <div id="bg">
    <div class="p-5 d-flex justify-content-center">
      <div id="signupbox" class="p-5">
        <h1>Sign Up</h1>

        <div>
          <input
            class="p-2"
            id="n-email"
            v-model="sentEmail"
            type="text"
            placeholder="Email"
            style="margin-top: 42px"
          />
          <br />
          <div class="errormsg">
            {{ error.email }}
          </div>
        </div>

        <br />

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
          label="Sign Up!"
          class="align-self-end mt-5 p-2"
          v-on:buttonClick="submitForm"
        >
        </bounty-button>
        <div class="errormsg">
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
      error: {
        email: "",
        username: "",
        password: "",
        signup: "",
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
        email: this.sentEmail,
        username: this.sentUsername,
        password: this.sentPassword,
      }),
    };
    const response = fetch("/api/user/signup", options)
      .catch((err) => {
        this.error.signup = err.message;
      })
      .then((response) => {
        if (response.ok) {
          this.$router.push("signup/success");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if(data.message != undefined){
          this.error.signup = data.message;
        }
      });
  }
  validateForm() {
    let validform = true;
    if (this.sentEmail == "") {
      let x = document.getElementById("n-email");
      x.classList.add("error");
      this.error.email = "Email required!";
      validform = false;
    }
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