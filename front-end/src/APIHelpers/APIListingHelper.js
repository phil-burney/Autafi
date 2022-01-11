
export default class APIListingHelper {

    static async fetchPartBounties() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST'
            },
            cache: "default",
        };

        let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/partbounty", options);
        let returnData = await data.json();
        console.log(returnData)
        return returnData;

    }

    static async fetchCarBounties() {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST'
            },
            cache: "default",
        };
        let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/carbounty", options);
        let returnData = await data.json();
        return returnData;

    }

    static async fetchPartSales() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST'
            },
            cache: "default",
        };
        let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/partsale", options);
        let returnData = await data.json();
        return returnData;


    }
    static async fetchCarSales() {
        let carSales;
        const options = {

            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET'
            },
            cache: "default",
        };
        let data = await fetch(process.env.VUE_APP_SERVER_URL +"/api/carsale", options);
        let returnData = await data.json();

        return returnData;

    }
}