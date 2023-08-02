import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import ProfileDropdown from "./ProfileDropdown";
import userimg from "../../../assets/images/users/user2.jpg";
import { GETADMINDATA, getToken } from "../../../Api/GetData";
import { useSelector } from "react-redux";
import { isObjectEmpty } from "../../../Global/Const";

const Header = ({ sx, customClass, toggleSidebar, toggleMobileSidebar }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [adminData, setAdminData] = React.useState({});
  const navigate = useNavigate();
  const isProfileChange = useSelector(
    (state) => state.CustomizerReducer.customizerState
  );

  const [Token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("Token"))
  );
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogutExecutive = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // 2
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // 4
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  // drawer
  const [showDrawer, setShowDrawer] = useState(false);

  const handleDrawerClose = () => {
    setShowDrawer(false);
  };

  // drawer top
  const [showDrawer2, setShowDrawer2] = useState(false);

  const handleDrawerClose2 = () => {
    setShowDrawer2(false);
  };
  const token = getToken();
  function GetAdminData() {
    GETADMINDATA("retrive/profile", setAdminData, token);
  }
  useEffect(() => {
    GetAdminData();
  }, [isProfileChange]);
  return (
    <AppBar sx={sx} elevation={0} className={customClass}>
      <Toolbar
        style={{
          width: "93%",
          alignSelf: "center",
          borderRadius: "10px",
          marginTop: "2%",
          boxShadow: "0px 7px 30px 0px rgb(90 114 123 / 11%)",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          size="large"
          sx={{
            display: {
              lg: "flex",
              xs: "none",
            },
          }}
        >
          <FeatherIcon icon="menu" />
        </IconButton>
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "flex",
            },
          }}
        >
          <FeatherIcon icon="menu" width="20" height="20" />
        </IconButton>
        <Box>
          <Typography variant="h3" color="primary">
            Welcome back !
          </Typography>
        </Box>
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "flex",
            },
          }}
        ></IconButton>

        <Box flexGrow={1} />

        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box display="flex" alignItems="center">
            {isObjectEmpty(adminData?.team) ? (
              <Avatar
                sx={{
                  width: "40px",
                  height: "40px",
                }}
              >
                {adminData?.team?.name.charAt(0).toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                src={adminData?.admin?.logo}
                alt={userimg}
                sx={{
                  width: "40px",
                  height: "40px",
                }}
              />
            )}
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          sx={{
            "& .MuiMenu-paper": {
              width: "385px",
              right: 0,
              top: "70px !important",
            },
            "& .MuiList-padding": {
              p: "30px",
            },
          }}
        >
          <Box
            sx={{
              mb: 1,
            }}
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h4" fontWeight="500">
                Profile
              </Typography>
            </Box>
          </Box>

          <ProfileDropdown adminData={adminData} toggle={handleClose4} />
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/auth/login"
          >
            <Button
              sx={{
                mt: 2,
                display: "block",
                width: "100%",
              }}
              variant="contained"
              color="primary"
              onClick={handleLogutExecutive}
            >
              Logout
            </Button>
          </Link>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
