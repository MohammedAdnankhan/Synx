import Loadable from "../layouts/full-layout/loadable/Loadable";
import { lazy } from "react";

export const FullLayout = Loadable(
  lazy(() => import("../layouts/full-layout/FullLayout"))
);
export const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank-layout/BlankLayout"))
);

export const Error = Loadable(
  lazy(() => import("../views/authentication/Error"))
);
// const Login = Loadable(lazy(() => import("../views/authentication/Login")));
export const Hompage = Loadable(
  lazy(() => import("../Pages/Dashboard/Dashboard"))
);
export const CustomLogin = Loadable(lazy(() => import("../Pages/Login/Login")));
export const SIGNIN = Loadable(lazy(() => import("../Pages/Singup/Signin")));
export const SubcriptionPage = Loadable(
  lazy(() => import("../Pages/SubcriptionalManagement./Subscription"))
);
export const OrganisationPage = Loadable(
  lazy(() => import("../Pages/OrganisationalManagement/Organisational"))
);
export const CreateOrganisationPage = Loadable(
  lazy(() => import("../Pages/CreateOrg/CreteOrg"))
);
export const SubPage = Loadable(
  lazy(() => import("../Pages/Subscription/Subscription"))
);
export const UserPage = Loadable(
  lazy(() => import("../Pages/User/UserManagement"))
);
export const ForgetPasswordPage = Loadable(
  lazy(() => import("../Pages/Forget/ForgetPassword"))
);
export const PAYMENT = Loadable(
  lazy(() => import("../Pages/Stripe/PaymentPage"))
);
export const ResetPassword = Loadable(
  lazy(() => import("../Pages/Forget/ResetPassword"))
);
export const TeamMebmerVerified = Loadable(
  lazy(() => import("../Pages/Team-Verified/TeamMeberForm"))
);
export const SuccessVerified = Loadable(
  lazy(() => import("../Pages/Team-Verified/SuccesVerified"))
);
export const SUBPLANE = Loadable(
  lazy(() => import("../Pages/SubPlan/SubPlan"))
);
export const APISETTING = Loadable(
  lazy(() => import("../Pages/ApiSetting/ApiSetting"))
);
export const DATARETENTION = Loadable(
  lazy(() => import("../Pages/DataRetention/DataRetention"))
);
export const PLANS = Loadable(
  lazy(() => import("../Pages/Plan&Payment/Plans"))
);
export const PLANPAYMENT = Loadable(
  lazy(() => import("../Pages/Plan&Payment/Payment"))
);
export const VERIFICATION = Loadable(
  lazy(() => import("../Pages/Verificatoin_Detail/Verification"))
);
export const TwoFa = Loadable(lazy(() => import("../Pages/2Fa/TwoFa")));
export const Invoice = Loadable(lazy(() => import("../Pages/Invoice/Invoice")));
export const PRICINGCARDS = Loadable(
  lazy(() => import("../Pages/LandingPage/Pricing"))
);
export const SHOWCARD = Loadable(
  lazy(() => import("../Pages/LandingPage/ShowCard"))
);
export const REGISTEREDPAYMENT = Loadable(
  lazy(() => import("../Pages/LandingPage/Payment"))
);
export const ROLEMANAGEMENT = Loadable(
  lazy(() => import("../Pages/Role_Page/RoleMang"))
);
export const ADDROLE = Loadable(
  lazy(() => import("../Pages/Role_Page/CreateRolePage"))
);
export const EDITROLE = Loadable(
  lazy(() => import("../Pages/Role_Page/EditRole"))
);
export const VIEWROLE = Loadable(
  lazy(() => import("../Pages/Role_Page/ViewRoles"))
);
export const SWAGGER = Loadable(lazy(() => import("../Pages/Swagger/Swagger")));

export const FUISCREEN = Loadable(lazy(() => import("../Pages/FUI/FUI")));
export const DRAG_AND_DROP = Loadable(lazy(() => import("../Pages/DND/DND")));
