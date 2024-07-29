import { useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { ENDPOINT } from "../Variables";

// DeletePost.tsx
interface DeletePostProps {
  postId: number;
  onDelete: () => void;
}

function DeletePost({ postId, onDelete }: DeletePostProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`${ENDPOINT}/posts/${postId}`, {
        method: "DELETE",
      });
      console.log(`Deleted post successfully of id:${postId}`);
      if (response.ok) {
        // Call the onDelete callback to refresh the posts list
        onDelete();
      } else {
        // Handle error
        console.error("Failed to delete post");
      }
    } catch (error) {
      // Handle error
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return isDeleting ? (
    <div className="transition duration-300 m-2">
      <CircularProgress />
    </div>
  ) : (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-700 transition duration-300 mt-1"
    >
      Delete Post
    </button>
  );
}

export default DeletePost;
