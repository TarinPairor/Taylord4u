import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import CircularProgress from "@mui/material/CircularProgress";
import { ENDPOINT } from "../Variables";

interface UpdatePostProps {
  postId: number;
  title: string;
  body: string;
  onUpdate: () => void;
}

const UpdatePost: React.FC<UpdatePostProps> = ({
  postId,
  title,
  body,
  onUpdate,
}) => {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newBody, setNewBody] = useState(body);
  const [email, setEmail] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${ENDPOINT}/validate`, {
          method: "GET",
          credentials: "include", // Include credentials to send cookies
        });

        if (response.ok) {
          const userData = await response.json();
          setEmail(userData.user.Email);
        } else {
          // Handle error
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      const response = await fetch(`${ENDPOINT}/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email, // Pass the email from props
          Title: newTitle,
          Body: newBody,
        }),
      });

      setOpen(true);

      console.log(
        `Updated post successfully to title:${newTitle} body:${newBody} by ${email}`
      );

      if (response.ok) {
        // Call the onUpdate callback to refresh the posts list
        onUpdate();
        // Reset the form or close the update form
        setNewTitle("");
        setNewBody("");
      } else {
        // Handle error
        console.error(response);
      }
    } catch (error) {
      // Handle error
      console.error("Error updating post:", error);
    } finally {
      setIsUpdating(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Click Here to Updated
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update Post"}</DialogTitle>
        {isUpdating ? (
          <div className="flex justify-center items-center h-full">
            <CircularProgress />
          </div>
        ) : (
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              className="flex-column"
            >
              <label>
                <div className="font-bold">New Title:</div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </label>
              <br />
              <label>
                <div className="font-bold">New Body:</div>
                <textarea
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                />
              </label>
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleUpdate} color="primary" autoFocus>
            Update Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdatePost;
