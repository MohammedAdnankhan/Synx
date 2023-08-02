import React from "react";
import {
  Box,
  MenuItem,
  Typography,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import userimg from "../../../assets/images/users/user2.jpg";
import { isObjectEmpty } from "../../../Global/Const";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router";
const ProfileDropdown = ({ adminData, toggle }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          pb: 3,
          mt: 3,
        }}
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
          <Box
            sx={{
              ml: 2,
            }}
          >
            {isObjectEmpty(adminData?.team) ? (
              <Typography
                variant="h4"
                sx={{
                  lineHeight: "1.235",
                }}
              >
                {adminData?.team?.name}
              </Typography>
            ) : (
              <Typography
                variant="h4"
                sx={{
                  lineHeight: "1.235",
                }}
              >
                {adminData?.admin?.organizationName}
              </Typography>
            )}
            {isObjectEmpty(adminData?.team) ? (
              <Typography color="textSecondary" variant="h6" fontWeight="400">
                {adminData?.team?.roleName}
              </Typography>
            ) : (
              <Typography color="textSecondary" variant="h6" fontWeight="400">
                Administrator
              </Typography>
            )}
            <Box display="flex" alignItems="center">
              <Typography
                color="textSecondary"
                display="flex"
                alignItems="center"
                sx={{
                  color: (theme) => theme.palette.grey.A200,
                  mr: 1,
                }}
              >
                <FeatherIcon icon="mail" width="18" />
              </Typography>
              {isObjectEmpty(adminData?.team) ? (
                <Typography color="textSecondary" variant="h6">
                  {adminData?.team?.email}
                </Typography>
              ) : (
                <Typography color="textSecondary" variant="h6">
                  {adminData?.admin?.bussinessEmail}
                </Typography>
              )}
            </Box>

            <div
              onClick={() => {
                navigate("/organization");
                toggle();
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                gap={"5px"}
                style={{ cursor: "pointer" }}
              >
                <ManageAccountsIcon style={{ color: "#777e89" }} />
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  Settings
                </Typography>
              </Box>
            </div>
          </Box>
        </Box>
      </Box>
      <Divider
        style={{
          marginTop: 0,
          marginBottom: 0,
        }}
      />

      <Box>
        <Divider
          style={{
            marginTop: 0,
            marginBottom: 0,
          }}
        />
      </Box>
    </Box>
  );
};
export default ProfileDropdown;
