import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  styled,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useEffect, useState } from "react";
import NotLoggedInMsg from "../components/NotLoggedInMsg";
import { useLoggedUser } from "../context/UserProvider";

export default function CreatePost() {
  const { loggedUser, isAuthenticated, isLoading } = useLoggedUser();
  const [heading, setHeading] = useState();
  const [description, setDescription] = useState();
  const [allCategories, setAllCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState();
  const [content, setContent] = useState();
  const [coverPhoto, setCoverPhoto] = useState();
  const [coverImgUrl, setCoverImgUrl] = useState();
  const [selectedPreviewImage, setSelectedPreviewImage] = useState(false);

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
    setCoverPhoto(e.target.files[0]);
  };

  const handleImagePreview = () => {
    setSelectedPreviewImage(true);
    setCoverImgUrl(URL.createObjectURL(coverPhoto));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/categories`
        );
        const responseData = response.data.data;
        setAllCategories(responseData.categories);
        console.log(responseData.categories);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const handlePostCreation = async (e) => {
    e.preventDefault();
    const fields = {
      heading,
      description,
      content,
      category: selectedCategory,
    };
    console.log(fields);

    if (selectedCategory === "other") {
      fields.category = otherCategory;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts`,
      fields,
      { withCredentials: true }
    );
    console.log(response);
    location.assign(`/post/${response.data.data._id}`);
  };
  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (!allCategories) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {selectedPreviewImage && (
        <IMGPreviewModel
          imageUrl={coverImgUrl}
          setSelectedPreviewImage={setSelectedPreviewImage}
        />
      )}
      {!loggedUser ? (
        <NotLoggedInMsg />
      ) : (
        <div className="flex justify-center w-full">
          <form action="" onSubmit={handlePostCreation}>
            <h2>Create Post</h2>
            <div className="flex flex-col gap-4 py-2">
              <TextField
                required
                id="outlined-required"
                label="Heading"
                defaultValue=""
                onChange={(e) => setHeading(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Descripton"
                defaultValue=""
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Content"
                defaultValue=""
                onChange={(e) => setContent(e.target.value)}
              />
              <FormControl fullWidth>
                <div className="flex flex-col gap-2">
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategory}
                    label="Age"
                    onChange={(e) => handleChangeCategory(e)}
                  >
                    {allCategories.map((el) => (
                      <MenuItem key={el._id} value={el._id}>
                        {el.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <div className="flex flex-col text-xs items-center">
                    <span> Have not found a suitable category?</span>
                    <Button
                      sx={{
                        fontSize: "0.7rem",
                      }}
                      size="small"
                    >
                      Create a Category
                    </Button>
                  </div>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    type="file"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    onChange={(e) => handleFileChange(e)}
                  >
                    Cover Photo
                    <VisuallyHiddenInput accept="image/*" type="file" />
                  </Button>
                  <div
                    className="text-xs hover:cursor-pointer hover:text-blue-500"
                    onClick={handleImagePreview}
                  >
                    {coverPhoto && <span>{coverPhoto.name}</span>}
                  </div>
                </div>
              </FormControl>
              <Button variant="contained" color="success" type="submit">
                Create
              </Button>
              <p></p>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

const IMGPreviewModel = ({ imageUrl, setSelectedPreviewImage }) => {
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
          <img src={imageUrl} alt="profile picture" height="250px" />
        </div>
      </Box>
    </Modal>
  );
};
