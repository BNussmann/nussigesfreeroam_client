import CompanyRegistrationForm from '../views/companyregistration/CompanyRegistrationForm.vue'
import CompanyRegistrationSuccess from "../views/companyregistration/CompanyRegistrationSuccess.vue";
import CompanyRegistrationFailure from "@/views/companyregistration/CompanyRegistrationFailure.vue";
import CompanyAdministrationHome from "@/views/companyadministration/CompanyAdministrationHome.vue";
import DrugLabOverview from "@/views/druglaboverview/DruglabOverview.vue";
import Progressbar from "@/views/progressbar/Progressbar.vue";
import SupportRequest from "@/views/supportrequest/SupportRequest.vue";
import SupportAppHome from "@/views/supportapp/SupportAppHome.vue";
import TwoOptionPrompt from "@/views/prompt/TwoOptionPrompt.vue";
import WholesalerShop from "@/views/wholesaler/WholesalerShop.vue";
import CarDealerMenu from "@/views/cardealer/CarDealerMenu.vue";
import CarDealerMenuFailure from "@/views/cardealer/CarDealerMenuFailure.vue";
import CarDealerMenuSuccess from "@/views/cardealer/CarDealerMenuSuccess.vue";
import SpeedometerComponent from '../components/hud/speedometer/SpeedometerComponent.vue';
import Notification from "@/views/notification/Notification.vue";
import Garage from "@/views/garage/Garage.vue";

const CompanyRegistrationRouter = {
  home: CompanyRegistrationForm,
  success: CompanyRegistrationSuccess,
  failure: CompanyRegistrationFailure
}

const SpeedometerRouter = {
  home: SpeedometerComponent
}

const CarDealerMenuRouter = {
  home: CarDealerMenu,
  failure: CarDealerMenuFailure,
  success: CarDealerMenuSuccess
}

const WholesalerShopRouter = {
  home: WholesalerShop
}

const TwoOptionPromptRouter = {
  home: TwoOptionPrompt
}

const CompanyAdministrationRouter = {
  home: CompanyAdministrationHome
}

const DrugLabOverviewRouter = {
  home: DrugLabOverview
}

const ProgressbarRouter = {
  home: Progressbar
}

const SupportRequestRouter = {
  home: SupportRequest
}

const SupportRouter = {
  home: SupportAppHome
}

const NotificationRouter = {
  home: Notification
}

const GarageRouter = {
  home: Garage
}



const Router = {
  "CompanyRegistration": CompanyRegistrationRouter,
  "CompanyAdministration": CompanyAdministrationRouter,
  "DrugLabOverview": DrugLabOverviewRouter,
  "Progressbar" : ProgressbarRouter,
  "SupportRequest": SupportRequestRouter,
  "SupportApp": SupportRouter,
  "TwoOptionPrompt": TwoOptionPromptRouter,
  "WholesalerShop": WholesalerShopRouter,
  "CarDealerMenu": CarDealerMenuRouter,
  "Speedometer": SpeedometerRouter,
  "Notification": NotificationRouter,
  "Garage": GarageRouter
}

export default Router
