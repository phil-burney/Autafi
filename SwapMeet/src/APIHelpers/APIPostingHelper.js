export default class APIPostingHelper {
  static async makeCarSale(content) {
    let carSales;
    const options = {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': "POST"
      },
      cache: "default",
      body: content 
    };
    let data = await fetch("http://localhost:3030/api/carsale", options);
    console.log(data)
    let returnData = await data.json();

    return returnData;

  }
  static async makeCarBounty(content) {
    let carSales;
    const options = {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': "POST"
      },
      cache: "default",
      body: content 
    };
    let data = await fetch("http://localhost:3030/api/carsale", options);
    console.log(data)
    let returnData = await data.json();

    return returnData;

  }
  static async makePartSale(content) {
    let carSales;
    const options = {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': "POST"
      },
      cache: "default",
      body: content 
    };
    let data = await fetch("http://localhost:3030/api/carsale", options);
    console.log(data)
    let returnData = await data.json();

    return returnData;

  }
  static async makePartBounty(content) {
    let carSales;
    const options = {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': "POST"
      },
      cache: "default",
      body: content 
    };
    let data = await fetch("http://localhost:3030/api/carsale", options);
    console.log(data)
    let returnData = await data.json();

    return returnData;

  }
}