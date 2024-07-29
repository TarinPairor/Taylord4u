import { useEffect, useState } from "react";
import { Comment } from "../../interfaces/Comment";
import { ENDPOINT } from "../Variables";

export default function Comments() {
  const [, setEmail] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  // LOAD THE EMAIL OF THE LOGGED IN USER
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
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);

  const refreshComments = async () => {
    try {
      const response = await fetch(`${ENDPOINT}/comments`);
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    refreshComments();
  }, []);
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.ID}>
            <div>
              <strong>ID:</strong>
              {comment.ID}
            </div>
            <div>
              <strong>Body:</strong> {comment.Body}
            </div>
            <div>
              <strong>Email:</strong> {comment.Email}
            </div>
            <div>
              <strong>Created At:</strong> {comment.CreatedAt}
            </div>
            <div>
              <strong>Updated At:</strong> {comment.UpdatedAt}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
