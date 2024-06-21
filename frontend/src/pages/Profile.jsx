import axios from "axios";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Modal,
  touchRippleClasses,
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";

import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import React, { useEffect, useState } from "react";

import LockResetIcon from "@mui/icons-material/LockReset";
import ChangePassword from "../components/ChangePassword";
import ResetPassword from "../components/ResetPassword";
import UserInfo from "../components/UserInfo";

const Profile = ({ loggedUser }) => {
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(touchRippleClasses);
  const [resetModel, setResetModel] = useState(false);
  const [resetData, setResetData] = useState();

  const handleListClick = (event, value) => {
    setSelectedListIndex(value);
  };

  useEffect(() => {
    if (loggedUser) {
      setIsLoading(false);
    }
  }, [loggedUser]);

  if (!loggedUser || isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="flex h-screen self-stretch gap-4 p-2 justify-center">
      {resetModel && (
        <ResetConfirmModel
          resetData={resetData}
          setResetModel={setResetModel}
          resetModel={resetModel}
        />
      )}
      <div className="border-2 p-2 min-w-[20%] md:min-w-[20%] ">
        <div className="">
          <SideList
            selectedListIndex={selectedListIndex}
            handleListClick={handleListClick}
          />
        </div>
      </div>
      <div className="bg-white min-w-[60%] p-4 border-2">
        <div className="">
          {/* slected user info */}
          {selectedListIndex == 0 && (
            <UserInfo loggedUser={loggedUser} isLoading={isLoading} />
          )}
          {selectedListIndex == 1 && <ChangePassword />}
          {selectedListIndex == 2 && (
            <ResetPassword
              loggedUser={loggedUser}
              setResetData={setResetData}
              setResetModel={setResetModel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

const SideList = ({ selectedListIndex, handleListClick }) => {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton
          selected={selectedListIndex === 0}
          onClick={(event) => handleListClick(event, 0)}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="User Info" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton
          selected={selectedListIndex === 1}
          onClick={(event) => handleListClick(event, 1)}
        >
          <ListItemIcon>
            <KeyIcon />
          </ListItemIcon>
          <ListItemText primary="Update Password" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          selected={selectedListIndex === 2}
          onClick={(event) => handleListClick(event, 2)}
        >
          <ListItemIcon>
            <LockResetIcon />
          </ListItemIcon>
          <ListItemText primary="Reset Password" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

const ResetConfirmModel = ({ resetModel, setResetModel, resetData }) => {
  const handleReset = () => {
    location.assign(`/profile/resetPassword/${resetData.resetToken}`);
  };
  return (
    <Modal
      open={resetModel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
        }}
      >
        <div className="flex flex-col gap-4 break-words">
          <h3 className="text-center">{resetData.message}</h3>

          <Button variant="contained" onClick={handleReset}>
            Reset
          </Button>

          <Button variant="outlined" onClick={() => setResetModel(false)}>
            Ignore
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
