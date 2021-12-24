

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
    let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/carsale", options);
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
    let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/carbounty", options);

    let returnData = await data.json();
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
    let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/partsale", options);
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
    let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/partbounty", options);
    let returnData = await data.json();

    return returnData;

  }
}