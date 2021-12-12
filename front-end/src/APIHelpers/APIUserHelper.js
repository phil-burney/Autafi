import config from "../config.json"

export default class APIUserHelper {
  static async fetchTokenConf() {
    const options = {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    console.log(config.BASE_URL)
    let data = await fetch(config.BASE_URL + "/api/user/validatetoken", options)
    let returnData = await data.json();
    return returnData;

  }

  static async fetchUserLogout() {
    const options = {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };

    let data = await fetch(config.BASE_URL +"/api/logout", options)
    let returnData = await data.json();
    return returnData;
  }

  static async fetchUserLogin(username, password) {
    const options = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': 'http://localhost:8080' },
      //cache:"default",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    let data = await fetch(config.BASE_URL +"/api/login", options)
    return data;
  }

  static async fetchUserSignup(email, username, password) {
    const options = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      //cache:"default",
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    };
    let data = await fetch(config.BASE_URL +"/api/user/signup", options)
    return data;

  }
}