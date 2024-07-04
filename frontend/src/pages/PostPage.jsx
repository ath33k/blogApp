import {
  Alert,
  Box,
  Button,
  IconButton,
  Modal,
  Popover,
  Snackbar,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoggedUser } from "../context/UserProvider";

const PostPage = () => {
  const { loggedUser, isAuthenticated, isLoading } = useLoggedUser();
  const [data, setData] = useState();
  const [postLoading, setPostLoading] = useState(true);
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  console.log(data);

  const handleModelOpen = () => setIsModelOpen(true);
  const handleModelClose = () => setIsModelOpen(false);

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const fetchDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/${id}`,
        { withCredentials: true }
      );
      handleModelClose();
      setIsSnackbarOpen(true);
      setTimeout(() => {
        setIsSnackbarOpen(false);
        location.assign("/");
      }, 1500);
    } catch (err) {
      handleModelClose();
      console.log(err);
      console.log("couldnn't delete");
    }
  };

  useEffect(() => {
    const fetchpost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/${id}`
        );

        setData(response.data.data);
        setPostLoading(false);
        console.log(response.data.data);
      } catch (err) {
        setPostLoading(false);
        console.log(err);
      }
    };
    fetchpost();
  }, [id]);

  if (postLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <SnackBar
        isSnackbarOpen={isSnackbarOpen}
        setIsSnackbarOpen={setIsSnackbarOpen}
      />
      {isModelOpen && (
        <DeleteModel
          isModelOpen={isModelOpen}
          handleModelClose={handleModelClose}
          fetchDelete={fetchDelete}
        />
      )}
      <div className="flex flex-col gap-2 p-4 px-8">
        <div>
          <h1>{data.heading}</h1>
          {data.category.map((el) => (
            <span key={el._id}>Category: {el.name}</span>
          ))}

          <p>{data.content}</p>
        </div>
        {loggedUser && (
          <div>
            <Button
              aria-describedby={popoverId}
              variant="outlined"
              onClick={handlePopoverClick}
              size="small"
            >
              ...
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <IconButton aria-label="delete" onClick={handleModelOpen}>
                <DeleteIcon />
              </IconButton>
            </Popover>
          </div>
        )}
        <hr />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
          deserunt ullam quas asperiores similique esse consequuntur itaque
          provident, repellat, error voluptatum commodi pariatur ducimus facere
          numquam. Ipsum at voluptate saepe animi eum distinctio consequatur
          nihil, quia fugiat non enim laboriosam dicta, repellat dolorum cumque
          voluptatibus nulla ullam! Maxime, earum aliquam!
        </p>
      </div>
    </div>
  );
};

export default PostPage;

const DeleteModel = ({ isModelOpen, handleModelClose, fetchDelete }) => {
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
        <div className="flex flex-col gap-4">
          <h2 className="text-center">Are you sure?</h2>
          <div className="flex justify-between">
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={fetchDelete}
            >
              Delete Now
            </Button>
            <Button variant="outlined" color="error" onClick={handleModelClose}>
              NO
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

const SnackBar = ({ isSnackbarOpen, setIsSnackbarOpen }) => {
  const handleClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Snackbar
      open={isSnackbarOpen}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={4000}
      onClose={handleClose}
      message="Post has been deleted Successfully"
    />
  );
};
