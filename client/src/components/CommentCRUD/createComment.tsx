import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Comment } from "../../interfaces/Comment";
import { ENDPOINT } from "../Variables";

interface CreateCommentProps {
  postid: string;
  onPostCreated: (newComment: Comment) => void;
}

function CreateComment({ postid, onPostCreated }: CreateCommentProps) {
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);

  // LOAD THE EMAIL OF THE LOGGED IN USER
  useEffect(() => {
    setLoad(true);
    const fetchUser = async () => {
      try {
        const response = await fetch(`${ENDPOINT}/validate`, {
          method: "GET",
          credentials: "include", // Include credentials to send cookies
        });

        if (response.ok) {
          const userData = await response.json();
          setEmail(userData.user.Email);
          setLoad(false);
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

  const handleCreateComment = async () => {
    try {
      setLoad(true);
      const response = await fetch(`${ENDPOINT}/comments/${postid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body, email, postid }),
      });

      if (response.ok) {
        const newComment = await response.json();
        // Refresh comments after creating a new comment
        // You can call refreshCommentsUnderPost from CommentUnderPost component
        onPostCreated(newComment);
        setBody("");
        console.log("Comment created successfully");
      } else {
        console.error("Failed to create comment");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setLoad(false);
    }
  };

  return load ? (
    <div>
      <CircularProgress />
    </div>
  ) : email ? (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-2">Create Comment:</h3>
      <div className="mb-4">
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-600"
        >
          Comment Body:
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>
      <button
        onClick={handleCreateComment}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Post Comment
      </button>
    </div>
  ) : (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-4 rounded relative mb-2 align-middle"
      role="alert"
    >
      <strong className="font-bold text-xl">Sorry! 😔</strong>
      <br />
      <span className="block sm:inline">
        {" "}
        Exclusive commenting privileges are reserved for registered members.
        Kindly log out and re-enter the platform with valid user credentials to
        access this feature.
      </span>
    </div>
  );
}

export default CreateComment;
