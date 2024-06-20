import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const handlePostCreation = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/v1/posts", {
      heading: title,
      content: content,
    });
    console.log(response);
    location.assign(`/post/${response.data.data._id}`);
  };
  return (
    <>
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
            <Button variant="contained" color="success" type="submit">
              Create
            </Button>
            <p></p>
          </div>
        </form>
      </div>
    </>
  );
}
