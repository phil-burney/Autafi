import LandingPage from '../components/Pages/LandingPage.vue'
import SignupPage from '../components/Pages/SignupPage.vue'
import LoginPage from '../components/Pages/LoginPage.vue'
import Dashboard from '../components/Pages/Dashboard.vue'
import PasswordResetRequestPage from '../components/Pages/PasswordResetRequestPage.vue'
import SignupSuccessPage from '../components/Pages/SuccessRegisterPage.vue'
import ListingSuccessPage from '../components/Pages/SuccessListingPage.vue'
import PasswordEmailSuccessPage from '../components/Pages/PasswordEmailSuccessPage.vue'
import PasswordResetConfirmationPage from '../components/Pages/PasswordResetConfirmationPage.vue'
import PasswordResetPage from '../components/Pages/PasswordResetPage.vue'
import CarsBountyPage from '../components/Pages/Bounties/CarsBountyPage.vue'
import PartsBountyPage from '../components/Pages/Bounties/PartsBountyPage.vue'
import CarsSalePage from '../components/Pages/Sales/CarsSalePage.vue'
import PartsSalePage from '../components/Pages/Sales/PartsSalePage.vue'
import PartBountyListPage from '../components/Pages/List/PartBountyListPage.vue'
import CarBountyListPage from '../components/Pages/List/CarBountyListPage.vue'
import PartSaleListPage from '../components/Pages/List/PartSalesListPage.vue'
import CarSaleListPage from '../components/Pages/List/CarSalesListPage.vue'
import CookiePolicyPage from '../components/Pages/CookiePolicy.vue'


const routes = [
    { path: '/', component: LandingPage },
    { path: '/login', component: LoginPage },
    { path: '/signup', component: SignupPage },
    { path: '/signup/success', component: SignupSuccessPage },
    { path: '/cookie/policy', component: CookiePolicyPage },
    { path: '/resetpassword/request', component: PasswordResetRequestPage },
    { path: '/resetpassword/request/confirmation', component: PasswordEmailSuccessPage },
    { path: '/resetpassword/form/*', component: PasswordResetPage },
    { path: '/resetpassword/confirmation', component: PasswordResetConfirmationPage },
   
    {
        path: '/bounty/car/create', component: CarsBountyPage, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/bounty/part/create', component: PartsBountyPage, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/sale/car/create', component: CarsSalePage, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/sale/part/create', component: PartsSalePage, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/listing/success', component: ListingSuccessPage
    },
    { path: '/bounty/car/list', component: CarBountyListPage },
    { path: '/bounty/part/list', component: PartBountyListPage },
    { path: '/sale/car/list', component: CarSaleListPage },
    { path: '/sale/part/list', component: PartSaleListPage },
    { path: '/dashboard', component: Dashboard },

];



export default routes;