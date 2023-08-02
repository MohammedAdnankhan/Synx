import React, { useState } from "react";
import {
  Fab,
  Drawer,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";

import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

import CloseIcon from "@mui/icons-material/Close";
const SidebarWidth = "320px";

const Customizer = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div>
      <Tooltip title="Notification">
        <Fab
          color="primary"
          aria-label="settings"
          sx={{ position: "fixed", right: "15px", bottom: "15px" }}
          onClick={() => setShowDrawer(true)}
        >
          {/* <FeatherIcon icon="settings" /> */}
          <CircleNotificationsIcon fontSize="large" />
        </Fab>
      </Tooltip>
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        <Box
          p={2}
          justifyContent="space-between"
          display={"flex"}
          alignItems="center"
        >
          <Typography variant="h3">Notification</Typography>
          <CloseIcon onClick={() => setShowDrawer(false)} />
        </Box>
        <Divider />
      </Drawer>
    </div>
  );
};

export default Customizer;
