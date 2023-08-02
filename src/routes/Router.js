import React from "react";
import { Navigate } from "react-router-dom";
import {
  FullLayout,
  BlankLayout,
  Error,
  Hompage,
  CustomLogin,
  SubcriptionPage,
  OrganisationPage,
  UserPage,
  SubPage,
  ForgetPasswordPage,
  TeamMebmerVerified,
  ResetPassword,
  SuccessVerified,
  SUBPLANE,
  APISETTING,
  DATARETENTION,
  PAYMENT,
  SIGNIN,
  PLANS,
  PLANPAYMENT,
  VERIFICATION,
  TwoFa,
  PRICINGCARDS,
  Invoice,
  SHOWCARD,
  REGISTEREDPAYMENT,
  ROLEMANAGEMENT,
  ADDROLE,
  EDITROLE,
  VIEWROLE,
  SWAGGER,
  FUISCREEN,
  DRAG_AND_DROP,
} from "./RouteConstant";
import Redi from "../Pages/Redi/Redi";

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", exact: true, element: <Hompage /> },
      {
        path: "/organization",
        exact: true,
        element: <UserPage />,
      },
      {
        path: "/team-management",
        exact: true,
        element: <SubcriptionPage />,
      },
      {
        path: "/user-management",
        exact: true,
        element: <OrganisationPage />,
      },
      {
        path: "/subscription",
        exact: true,
        element: <SubPage />,
      },
      {
        path: "/subscription-plans",
        exact: true,
        element: <SUBPLANE />,
      },
      {
        path: "/subscription-payment",
        exact: true,
        element: <PAYMENT />,
      },
      {
        path: "/invoice",
        exact: true,
        element: <Invoice />,
      },
      {
        path: "/user-verification-detail",
        exact: true,
        element: <VERIFICATION />,
      },
      {
        path: "/data-retention",
        exact: true,
        element: <DATARETENTION />,
      },
      {
        path: "/api-setting",
        exact: true,
        element: <APISETTING />,
      },
      {
        path: "/roles-management",
        exact: true,
        element: <ROLEMANAGEMENT />,
      },
      {
        path: "/add-roles",
        exact: true,
        element: <ADDROLE />,
      },
      {
        path: "/edit-roles",
        exact: true,
        element: <EDITROLE />,
      },
      {
        path: "/view-roles",
        exact: true,
        element: <VIEWROLE />,
      },
      {
        path: "/API-documentation",
        exact: true,
        element: <SWAGGER />,
      },
      {
        path: "/fiu",
        exact: true,
        element: <FUISCREEN />,
      },
      {
        path: "/drag",
        exact: true,
        element: <DRAG_AND_DROP />,
      },

      { path: "*", element: <Navigate to="/auth/login" /> },
    ],
  },

  { path: "/team-invite/:id", element: <TeamMebmerVerified /> },
  { path: "/addteam-success", element: <SuccessVerified /> },
  { path: "/2fa/:id", element: <TwoFa /> },
  { path: "/redi/:id", element: <Redi /> },
  { path: "/cms", element: <PRICINGCARDS /> },
  { path: "/pricing", element: <SHOWCARD /> },
  { path: "/register-payment", element: <REGISTEREDPAYMENT /> },

  {
    path: "auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "login", element: <CustomLogin /> },

      // { path: "sign-up", element: <SIGNIN /> },
      { path: "plans", element: <PLANS /> },
      { path: "payment", element: <PLANPAYMENT /> },
      {
        path: "forget-password",
        element: <ForgetPasswordPage />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      // { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
