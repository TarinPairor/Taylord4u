// CommentUnderPost.tsx
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Comment } from "../../interfaces/Comment";
import { Post } from "../../interfaces/Post";
import { formatTimeStamp, timeAgo } from "../formatTimeStamp";
import CreateComment from "./CreateComment";
import DeleteComment from "./DeleteComment";
import { ENDPOINT } from "../Variables";
import { Button, CircularProgress } from "@mui/material";
import SentimentAnalysisComponent from "../SentimentAnalysis";

function CommentUnderPost() {
  const { postid } = useParams<{ postid: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [email, setEmail] = useState("");
  const [showSentimentAnalysis, setShowSentimentAnalysis] = useState(false);

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

  const refreshCommentsUnderPost = async () => {
    try {
      const response = await fetch(
        `${ENDPOINT}/comments/post?postid=${postid}`
      );
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentsCreated = async (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
    await refreshCommentsUnderPost();
  };

  const refreshPost = async () => {
    try {
      const response = await fetch(`${ENDPOINT}/posts/${postid}`);
      const data = await response.json();
      setPost(data.post);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    refreshCommentsUnderPost();
    refreshPost();
  }, []);

  // Memoize the comments and post
  const memoizedComments = useMemo(() => comments, [comments]);
  const memoizedPost = useMemo(() => post, [post]);

  const renderComments = () => {
    return memoizedComments.map((comment) => (
      <div key={comment.ID} className="my-4 p-4 border border-gray-300 rounded">
        <div className=" mb-2 flex flex-row items-center justify-between">
          <p className="text-sm font-light mr-2">
            {comment.Email || <p className="font-thin">Guest</p>}
          </p>
          <p className=" text-gray-500 text-xs">
            {formatTimeStamp(comment.CreatedAt)}
          </p>
        </div>
        <div className="m-4">
          <p>{comment.Body}</p>
        </div>
        {email && comment.Email === email && (
          <DeleteComment
            commentId={comment.ID}
            onDelete={refreshCommentsUnderPost}
          />
        )}
      </div>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      {memoizedPost && (
        <div>
          <div className="mb-2 flex flex-row items-center justify-between">
            <h2 className="text-xl font-bold">{memoizedPost.Title}</h2>
            <div className="text-xs text-gray-600">
              <br />
              {timeAgo(memoizedPost.UpdatedAt)}
            </div>
          </div>

          <div className="text-gray-700 m-2">{memoizedPost.Body}</div>
          <div className="m-2 text-gray-600">
            <strong>@</strong> {memoizedPost.Email}
          </div>
          <div className="text-gray-600 m-2">
            on {formatTimeStamp(memoizedPost.CreatedAt)}
          </div>
          <Button
            onClick={() => setShowSentimentAnalysis(true)}
            variant="contained"
          >
            Analyze Sentiment
          </Button>
          <br />

          {/* Conditionally render SentimentAnalysisComponent based on state */}
          {showSentimentAnalysis && (
            <>
              <Button
                onClick={() => setShowSentimentAnalysis(false)}
                variant="outlined"
                color="error"
                style={{ position: "relative", margin: "1rem" }} // Increase the margin as needed
              >
                Close
              </Button>
              <SentimentAnalysisComponent
                text={memoizedPost.Body}
                showResults={showSentimentAnalysis}
              />
            </>
          )}
        </div>
      )}
      {email ? (
        <CreateComment
          postid={postid || ""}
          onPostCreated={handleCommentsCreated}
        />
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
      {memoizedComments.length ? (
        <div>
          <h3 className="text-3xl font-semibold mb-4">Comments:</h3>
          {renderComments()}
          <br />
        </div>
      ) : (
        <div className="bg-gray-200 p-4 rounded-md">
          There are currently no comments available. Your contributions are
          welcome. Please feel free to add some to enhance the discussion.
        </div>
      )}
      <Link to={"/"} className="text-blue-500 hover:underline">
        Back to Posts
      </Link>
    </div>
  );
}

export default CommentUnderPost;
