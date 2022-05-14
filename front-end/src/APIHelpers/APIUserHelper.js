

export default class APIUserHelper {
  static async fetchTokenConf() {
    const options = {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    let data = await fetch(process.env.VUE_APP_SERVER_URL + "/api/user/validatetoken", options)
    let returnData = await data.json();
    console.log(returnData)
    return returnData;

  }

  static async fetchUserLogout() {
    const options = {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };

    let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/user/logout", options)
    let returnData = await data.json();
    return returnData;
  }

  static async fetchEmailtoChangePassword(email) {
    const options = {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    options.body = JSON.stringify({email: email})

    let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/user/email/resetpassword", options)
    return data;
  }

  static async fetchPasswordReset(token, id, sentPassword) {
    const options = {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    options.body = JSON.stringify({token: token, id: id, password: sentPassword})

    let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/user/resetpassword", options)
    return data;
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
    
    let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/user/login", options)
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
    let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/user/signup", options)
    return data;

  }
}