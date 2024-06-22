import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import NotLoggedInMsg from "../components/NotLoggedInMsg";

export default function CreatePost({ loggedUser }) {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState("other");
  const [otherCategory, setOtherCategory] = useState();
  const [content, setContent] = useState();
  const handlePostCreation = async (e) => {
    e.preventDefault();
    const fields = {
      heading: title,
      content: content,
    };

    if (category === "other") {
      fields.category = otherCategory;
    }

    const response = await axios.post("/api/v1/posts", fields);
    console.log(response);
    location.assign(`/post/${response.data.data._id}`);
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  return (
    <>
      {!loggedUser ? (
        <NotLoggedInMsg />
      ) : (
        <div className="flex justify-center w-screen">
          <form action="" onSubmit={handlePostCreation}>
            <h2>Create Post</h2>
            <div className="flex flex-col gap-4 py-2">
              <TextField
                required
                id="outlined-required"
                label="Title"
                defaultValue=""
                onChange={(e) => setTitle(e.target.value)}
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
                    value={category}
                    label="Age"
                    onChange={(e) => handleChangeCategory(e)}
                  >
                    <MenuItem value={"sports"}>Sports</MenuItem>
                    <MenuItem value={"fitness"}>Fitness</MenuItem>
                    <MenuItem value={"crime"}>Crime</MenuItem>
                    <MenuItem value="other">
                      <em>Other</em>
                    </MenuItem>
                  </Select>
                  {category === "other" && (
                    <TextField
                      required
                      id="outlined-required"
                      label="Other"
                      defaultValue=""
                      onChange={(e) => setOtherCategory(e.target.value)}
                    ></TextField>
                  )}
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
