
import CarCatalog from "./CarCatalog.js"

export {findByYear, findByMake}


function findByYear(year){
    let index = year - CarCatalog.Years[0]
    console.log(index)
    if(index < 0 || index > CarCatalog.carCatalog.length){
        return null;
    }
    return(CarCatalog.carCatalog[index])
}

function findByMake(year, make) {
    let obj = findByYear(year);
    return obj.Make[make].Models
}

