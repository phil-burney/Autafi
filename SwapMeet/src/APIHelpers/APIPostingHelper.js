import config from "../config.json"

export default class APIPostingHelper {
  static async makeCarSale(content) {
    let carSales;
    const options = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify(content)
    }
    let data = await fetch(config.BASE_URL +"/api/carsale", options);
    console.log(data)
    let returnData = await data.json();

    return returnData;

  }
  static async makeCarBounty(content) {
    let carSales;
    const options = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify(content)
    }
    let data = await fetch(config.BASE_URL +"/api/carbounty", options);

    let returnData = await data.json();
    console.log(returnData)
    return returnData;

  }
  static async makePartSale(content) {
    let carSales;
    const options = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify(content)
    }
    let data = await fetch(config.BASE_URL +"/api/partsale", options);
    console.log(data)
    let returnData = await data.json();

    return returnData;

  }
  static async makePartBounty(content) {
    let carSales;
    const options = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify(content)
    }
    let data = await fetch(config.BASE_URL +"/api/partbounty", options);
    console.log(data)
    let returnData = await data.json();

    return returnData;

  }
}