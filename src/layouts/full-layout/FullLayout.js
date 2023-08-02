import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
  Switch,
  Button,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { TopbarHeight } from "../../assets/global/Theme-variable";
import "../../css/App.css";
import { SetAccess } from "../../redux/customizer/Action";
import { GETACCESSROUTES, getToken } from "../../Api/GetData";
const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));
const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: TopbarHeight,
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = getToken();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const customizer = useSelector((state) => state.CustomizerReducer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  let ary = [
    {
      route: "/dashboard",
      tabName: "Dashboard",
      subs: [
        {
          api: "/dashboard",
          name: "View",
          route: "/dashboard",
        },
      ],
    },
    {
      route: "/user-management",
      tabName: "User",
      subs: [
        {
          api: "/user/retrive/all",
          name: "View",
          route: "/user-management",
        },
        // {
        //   api: "/user/retrive/all",
        //   name: "Edit",
        //   route: "/user-management",
        // },
      ],
    },
    {
      route: "/team-management",
      tabName: "Team",
      subs: [
        {
          api: "/team/retrive/all",
          name: "View",
          route: "/team-management",
        },
        {
          api: "/team/retrive/all",
          name: "Edit",
          route: "/team-management",
        },
        {
          api: "/team/retrive/all",
          name: "Delete",
          route: "/team-management",
        },
      ],
    },
    {
      route: "/organization",
      tabName: "Organization",
      subs: [
        {
          api: "/2FADetails",
          name: "Edit",
          route: "/organization",
        },
        {
          api: "/2FADetails",
          name: "View",
          route: "/organization",
        },
      ],
    },
    {
      route: "/data-retention",
      tabName: "Data retention",
      subs: [
        {
          api: "/update/retentionPeriod",
          name: "View",
          route: "/data-retention",
        },
        {
          api: "/update/retentionPeriod",
          name: "Edit",
          route: "/data-retention",
        },
      ],
    },
    {
      route: "/subscription",
      tabName: "Subscription",
      subs: [
        {
          api: "/payHistory",
          name: "View",
          route: "/subscription",
        },
        {
          api: "/payHistory",
          name: "Edit",
          route: "/subscription",
        },
      ],
    },
    {
      route: "/api-setting",
      tabName: "Api Settings",
      subs: [
        {
          api: "/URL",
          name: "View",
          route: "/api-setting",
        },
        {
          api: "/URL",
          name: "Edit",
          route: "/api-setting",
        },
        {
          api: "/URL",
          name: "Delete",
          route: "/api-setting",
        },
      ],
    },
    {
      route: "/roles-management",
      tabName: "Roles management",
      subs: [
        {
          api: "",
          name: "View",
          route: "/roles-management",
        },
        {
          api: "",
          name: "Edit",
          route: "/roles-management",
        },
        {
          api: "",
          name: "Delete",
          route: "/roles-management",
        },
      ],
    },
  ];
  const handleClick = () => {
    GETACCESSROUTES(token)
      .then((res) => dispatch(SetAccess(res)))
      .catch((error) => dispatch(SetAccess(error)));
  };

  useEffect(() => {
    let Token = JSON.parse(sessionStorage.getItem("Token"));

    if (!Token) {
      navigate("/login", { replace: true });
    }
    handleClick();
  }, []);
  return (
    <MainWrapper className={customizer.activeMode === "dark" ? "darkbg" : ""}>
      <Header
        sx={{
          paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
          backgroundColor:
            customizer.activeMode === "dark" ? "#20232a" : "#fafbfb",
        }}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />{" "}
      <Sidebar
        isSidebardir={customizer.activeDir === "ltr" ? "left" : "right"}
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
            paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <Outlet />
          </Box>
          {/* <Customizer /> */}
          <Footer />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
