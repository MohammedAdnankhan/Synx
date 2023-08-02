import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { SidebarWidth } from "../../../assets/global/Theme-variable";
import "../../../css/Layout.css";
import { GiveIcon } from "./Menuitems";
import Scrollbar from "../../../components/custom-scroll/Scrollbar";
import { useSelector } from "react-redux";

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const [open, setOpen] = React.useState(true);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const permission = useSelector((state) => state.CustomizerReducer.Access);
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  let AddSetting = {
    route: "/fiu",
    tabName: "FIU",
  };

  const renderedOptions = [...permission, AddSetting];
  const SidebarContent = (
    <Scrollbar style={{ height: "calc(100vh - 5px)" }}>
      <Box sx={{ p: 2 }}>
        <div className=" P15 MTB20">
          <span className="logofont blue">Glorep </span>
        </div>
        <Box>
          <List>
            {renderedOptions
              ? renderedOptions.map((item, index) => {
                  if (item.subheader) {
                    return (
                      <li key={item.subheader}>
                        <Typography
                          variant="subtabName2"
                          fontWeight="500"
                          sx={{ my: 2, mt: 4, opacity: "0.4" }}
                        >
                          {item.subheader}
                        </Typography>
                      </li>
                    );
                  } else if (item.children) {
                    return (
                      <React.Fragment key={item.tabName}>
                        <ListItem
                          button
                          component="li"
                          onClick={() => handleClick(index)}
                          selected={pathWithoutLastPart === item.route}
                          sx={{
                            mb: 1,
                            ...(pathWithoutLastPart === item.route && {
                              color: "white",

                              backgroundColor: (theme) =>
                                `${theme.palette.primary.main}!important`,
                            }),
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              ...(pathWithoutLastPart === item.route && {
                                color: "white",
                              }),
                            }}
                          >
                            <FeatherIcon
                              icon={GiveIcon(permission.tabName, "icon")}
                              width="20"
                              height="20"
                            />
                            {/* item.icon change */}
                          </ListItemIcon>
                          borderRadius: "30px",
                          <ListItemText>{item.tabName}</ListItemText>
                          {index === open ||
                          pathWithoutLastPart === item.route ? (
                            <FeatherIcon icon="chevron-down" size="16" />
                          ) : (
                            <FeatherIcon icon="chevron-right" size="16" />
                          )}
                        </ListItem>
                        <Collapse
                          in={index === open}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="li" disablePadding>
                            {item.children.map((child) => {
                              return (
                                <ListItem
                                  key={child.tabName}
                                  button
                                  component={NavLink}
                                  to={child.route}
                                  onClick={onSidebarClose}
                                  selected={pathDirect === child.route}
                                  sx={{
                                    mb: 1,
                                    ...(pathDirect === child.route && {
                                      color: "primary.main",
                                      backgroundColor: "transparent!important",
                                    }),
                                  }}
                                >
                                  <ListItemIcon
                                    sx={{
                                      svg: { width: "14px", marginLeft: "3px" },
                                      ...(pathDirect === child.route && {
                                        color: "primary.main",
                                      }),
                                    }}
                                  >
                                    <FeatherIcon
                                      icon={child.icon}
                                      width="20"
                                      height="20"
                                    />
                                  </ListItemIcon>
                                  <ListItemText>{child.tabName}</ListItemText>
                                </ListItem>
                              );
                            })}
                          </List>
                        </Collapse>
                      </React.Fragment>
                    );
                    // {/********If Sub No Menu**********/}
                  } else {
                    return (
                      item.tabName !== "Organization" && (
                        <List component="li" disablePadding key={item.tabName}>
                          <ListItem
                            onClick={() => handleClick(index)}
                            button
                            component={NavLink}
                            to={item.route}
                            selected={pathDirect === item.route}
                            sx={{
                              mb: 1,
                              ...(pathDirect === item.route && {
                                color: "white",
                                backgroundColor: (theme) =>
                                  `${theme.palette.primary.main}!important`,
                              }),
                              ...(pathDirect === item.sublink && {
                                color: "white",
                                backgroundColor: (theme) =>
                                  `${theme.palette.primary.main}!important`,
                              }),
                              ...(pathDirect === item.sublink1 && {
                                color: "white",
                                backgroundColor: (theme) =>
                                  `${theme.palette.primary.main}!important`,
                              }),
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                ...(pathDirect === item.route && {
                                  color: "white",
                                }),
                                ...(pathDirect === item.sublink && {
                                  color: "white",
                                }),
                                ...(pathDirect === item.sublink1 && {
                                  color: "white",
                                }),
                              }}
                            >
                              <FeatherIcon
                                icon={GiveIcon(item.tabName, "icon")}
                                width="20"
                                height="20"
                              />
                              {/* change item.icon */}
                            </ListItemIcon>
                            <ListItemText onClick={onSidebarClose}>
                              {item.tabName}
                            </ListItemText>
                          </ListItem>
                        </List>
                      )
                    );
                  }
                })
              : ""}
          </List>
        </Box>
        {/* <Buynow /> */}
      </Box>
    </Scrollbar>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
