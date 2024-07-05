import { Avatar, Box, Button, Modal, TextField, styled } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

import { useEffect } from "react";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import UpdateIcon from "@mui/icons-material/Update";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const UserInfo = ({ loggedUser }) => {
  const [profilePicture, setProfilePicture] = useState(undefined);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [DPImageUrl, setDPImageURL] = useState();
  const [selectedPreviewImage, setSelectedPreviewImage] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isLoading, setIsloading] = useState(true);
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    const setupUser = async () => {
      console.log("ss");
      setName(loggedUser.name);
      setEmail(loggedUser.email);
      const imageRef = ref(storage, `user-images/${loggedUser.image}`);

      const url = await getDownloadURL(imageRef);
      setAvatarUrl(url);
      setIsloading(false);
    };
    setupUser();
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
  const handleFileChange = (e) => {
    console.log(e.target.files);
    setProfilePicture(e.target.files[0]);
  };

  const handleImagePreview = () => {
    setSelectedPreviewImage(true);
    setDPImageURL(URL.createObjectURL(profilePicture));
  };

  const handleUpdateSubmission = async () => {
    // const fields = {
    //   name,
    //   email,
    //   image: profilePicture,
    // };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", profilePicture);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/updateMe`,
        formData,
        { withCredentials: true }
      );
      setProfilePicture(undefined);
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };
  if (!loggedUser || isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="flex flex-col gap-4 ">
      {selectedPreviewImage && (
        <IMGPreviewModel
          DPImageUrl={DPImageUrl}
          setSelectedPreviewImage={setSelectedPreviewImage}
        />
      )}
      <div>
        <h3>Profile Picture</h3>
        <div className="flex flex-col md:flex-row md:justify-between py-2 gap-4 md:gap-0">
          <div className="flex gap-4">
            <Avatar
              sx={{
                width: "64px",
                height: "64px",
              }}
              src={avatarUrl}
            />

            <div>
              <h3 className="text-xl font-semibold">{loggedUser.name}</h3>
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
              setProfilePicture(undefined);
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
            // disabled={
            //   !isInputDisabled
            //     ? profilePicture == undefined &&
            //       name == loggedUser.name &&
            //       email == loggedUser.email
            //       ? true
            //       : false
            //     : true
            // }
            disabled={
              isInputDisabled
                ? true
                : profilePicture == undefined &&
                  name == loggedUser.name &&
                  email == loggedUser.email
                ? true
                : false
            }
            startIcon={<UpdateIcon />}
            onClick={handleUpdateSubmission}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

const IMGPreviewModel = ({ DPImageUrl, setSelectedPreviewImage }) => {
  const [isModelOpen, setIsModelOpen] = useState(true);

  const handleModelClose = () => {
    setSelectedPreviewImage(false);
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
