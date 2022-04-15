

export default class APIPostingHelper {
  static async makeCarSale(content) {
    const options = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: content
    }
    let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/sale/car", options);
    let returnData = await data.json();

    return returnData;

  }
  static async makeCarBounty(content) {
    const options = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: content
    }
    let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/bounty/car", options);

    let returnData = await data.json();
    return returnData;

  }
  static async makePartSale(content) {
    const options = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: content
    }
    
    let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/sale/car", options);
    let returnData = await data.json();

    return returnData;

  }
  static async makePartBounty(content) {
    const options = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: content
    }
    let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/bounty/part", options);
    let returnData = await data.json();

    return returnData;

  }
}