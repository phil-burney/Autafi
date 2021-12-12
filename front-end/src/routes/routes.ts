import LandingPage from '../components/Pages/LandingPage.vue'
import SignupPage from '../components/Pages/SignupPage.vue'
import LoginPage from '../components/Pages/LoginPage.vue'
import Dashboard from '../components/Pages/Dashboard.vue'
import SignupSuccessPage from '../components/Pages/SuccessRegisterPage.vue'
import ListingSuccessPage from '../components/Pages/SuccessListingPage.vue'
import CarsOrPartsPageBounty from '../components/Pages/CarOrPartSelection/CarsOrPartsPageBounty.vue'
import CarsOrPartsPageSale from '../components/Pages/CarOrPartSelection/CarsOrPartsPageSale.vue'
import ListingSelection from '../components/Pages/CarOrPartSelection/ListingSelection.vue'
import CarsBountyPage from '../components/Pages/Bounties/CarsBountyPage.vue'
import PartsBountyPage from '../components/Pages/Bounties/PartsBountyPage.vue'
import CarsSalePage from '../components/Pages/Sales/CarsSalePage.vue'
import PartsSalePage from '../components/Pages/Sales/PartsSalePage.vue'
import PartBountyListPage from '../components/Pages/List/PartBountyListPage.vue'
import CarBountyListPage from '../components/Pages/List/CarBountyListPage.vue'
import PartSaleListPage from '../components/Pages/List/PartSalesListPage.vue'
import CarSaleListPage from '../components/Pages/List/CarSalesListPage.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: '/login', component: LoginPage },
    { path: '/signup', component: SignupPage },
    { path: '/signup/success', component: SignupSuccessPage },
    {
        path: '/selectcarsorpartsbounty', component: CarsOrPartsPageBounty, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/selectcarsorpartssale', component: CarsOrPartsPageSale, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/cars/createbounty', component: CarsBountyPage, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/parts/createbounty', component: PartsBountyPage, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/cars/createsale', component: CarsSalePage, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/parts/createsale', component: PartsSalePage, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/listing/success', component: ListingSuccessPage
    },
    { path: '/cars/bounty/list', component: CarBountyListPage },
    { path: '/parts/bounty/list', component: PartBountyListPage },
    { path: '/cars/sale/list', component: CarSaleListPage },
    { path: '/parts/sale/list', component: PartSaleListPage },
    { path: '/listingSelect', component: ListingSelection },
    { path: '/dashboard', component: Dashboard },

];



export default routes;