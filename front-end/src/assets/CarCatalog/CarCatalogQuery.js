
import CarCatalog from "./CarCatalog.json"

export { findByYear, findByMake, getYears, getParts }


function findByYear(year) {
    return (Object.keys(CarCatalog[year].Makes))
}

function findByMake(year, make) {
    return CarCatalog[year].Makes[make]
}

function getYears() {
    return Object.keys(CarCatalog)
}
function getParts() {
    return [
        "Engine",
        "Transmission",
        "Passenger Side Door",
        "Driver's Side Door",
        "Carbeurator",
        "Intake Manifold",
        "Hood",
        "Trunk",
        "Front Bumper",
        "Rear Bumper",
        "Door Handle",
        "Front Seats",
        "Rear Seats",
        "Interior Door Panel",
        "Dashboard",
        "Instrument Cluster"
    ]
}