import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Modal,
  TextField,
  styled,
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import React, { useEffect, useState } from "react";
import { red } from "@mui/material/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import UpdateIcon from "@mui/icons-material/Update";

const Profile = ({ loggedUser }) => {
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState();
  const [DPImageUrl, setDPImageURL] = useState();
  const [selectedPreviewImage, setSelectedPreviewImage] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  useEffect(() => {
    if (loggedUser) {
      setIsLoading(false);
      setName(loggedUser.name);
      setEmail(loggedUser.email);
    }
  }, [loggedUser, isInputDisabled]);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 0,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 100,
  });

  const handleListClick = (event, value) => {
    setSelectedListIndex(value);
  };

  const handleFileChange = (e) => {
    console.log(e.target.files);
    setProfilePicture(e.target.files[0]);
  };

  const handleImagePreview = () => {
    setSelectedPreviewImage(true);
    setDPImageURL(URL.createObjectURL(profilePicture));
  };

  const handleUpdateSubmission = () => {};

  const handlePasswordChangeSubmission = (e) => {};

  if (!loggedUser || isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="flex h-screen self-stretch gap-4 p-2 justify-center">
      {selectedPreviewImage && (
        <IMGPreviewModel
          DPImageUrl={DPImageUrl}
          setSelectedPreviewImage={setSelectedPreviewImage}
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
            <div className="flex flex-col gap-4 ">
              <div>
                <h3>Profile Picture</h3>
                <div className="flex flex-col md:flex-row md:justify-between py-2 gap-4 md:gap-0">
                  <div className="flex gap-4">
                    <Avatar
                      sx={{
                        backgroundColor: "red",
                        padding: "1.5rem",
                        fontSize: "1.5rem",
                      }}
                    >
                      {loggedUser.name[0]}
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {loggedUser.name}
                      </h3>
                      <h5 className="text-xs">Blog {loggedUser.role}</h5>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-center gap-1">
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      disabled={isInputDisabled}
                      type="file"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      onChange={(e) => handleFileChange(e)}
                    >
                      Upload Photo
                      <VisuallyHiddenInput accept="image/*" type="file" />
                    </Button>
                    <div
                      className="text-xs hover:cursor-pointer hover:text-blue-500"
                      onClick={handleImagePreview}
                    >
                      {profilePicture && <span>{profilePicture.name}</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3>Full Name</h3>
                <TextField
                  fullWidth={true}
                  size="small"
                  // defaultValue={name}
                  value={name}
                  disabled={isInputDisabled}
                  onChange={(e) => setName(e.target.value)}
                ></TextField>
              </div>
              <div>
                <h3>Email address</h3>
                <TextField
                  key={"email"}
                  fullWidth={true}
                  id="outlined-read-only-input"
                  required
                  size="small"
                  // placeholder={loggedUser}
                  value={email}
                  // defaultValue={email}
                  disabled={isInputDisabled}
                  onChange={(e) => setEmail(e.target.value)}
                ></TextField>
              </div>
              <div className="flex flex-col md:flex-row  md:justify-between gap-8 ">
                <div className="flex gap-4">
                  <Button
                    variant="contained"
                    size="small"
                    disabled={!isInputDisabled}
                    startIcon={<EditIcon />}
                    onClick={() => setIsInputDisabled(false)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={isInputDisabled}
                    onClick={() => {
                      setProfilePicture(false);
                      setIsInputDisabled(true);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="contained"
                    color="success"
                    disabled={
                      !isInputDisabled
                        ? profilePicture == false &&
                          name == loggedUser.name &&
                          email == loggedUser.email
                          ? true
                          : false
                        : true
                    }
                    startIcon={<UpdateIcon />}
                    onClick={handleUpdateSubmission}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
          {selectedListIndex == 1 && (
            <form action="" onSubmit={handlePasswordChangeSubmission}>
              <h3>Change Password</h3>
              <div className="flex flex-col gap-4 py-2">
                <TextField
                  required
                  id="outlined-required"
                  label="Current Password"
                  defaultValue=""
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="New Password"
                  defaultValue=""
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Confirm Password"
                  type="password"
                  defaultValue=""
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button variant="contained" color="success" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

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
          <ListItemText primary="Change Password" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

const IMGPreviewModel = ({ DPImageUrl, setSelectedPreviewImage }) => {
  const [isModelOpen, setIsModelOpen] = useState(true);

  const handleModelClose = () => {
    setSelectedPreviewImage(false);
    // setIsModelOpen(false);
  };
  return (
    <Modal
      open={isModelOpen}
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
        <div className="flex flex-col gap-4 items-center">
          <Button variant="contained" onClick={handleModelClose}>
            Close
          </Button>
          <img src={DPImageUrl} alt="profile picture" height="250px" />
        </div>
      </Box>
    </Modal>
  );
};

export default Profile;
