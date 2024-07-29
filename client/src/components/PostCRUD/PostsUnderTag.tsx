import { useState, useEffect, useMemo } from "react";
import CreatePost from "./CreatePost";
import { Post } from "../../interfaces/Post";
import UpdatePost from "./UpdatePost";
import DeletePost from "./DeletePost";
import { formatTimeStamp, timeAgo } from "../formatTimeStamp";

import CircularProgress from "@mui/material/CircularProgress";
import { LinearProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { ENDPOINT } from "../Variables";

function PostsUnderTag() {
  const { tag } = useParams<{ tag: string }>();
  const [posts, setPosts] = useState<Post[]>([]);

  const [email, setEmail] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [load, setLoad] = useState(false);

  const [isLoadingPost, setIsLoadingPost] = useState(false);

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

  // HANDLE THE CREATION OF A NEW POST BY APPENDING IT TO THE PREVIOUS POST
  const handlePostCreated = async (newPost: Post) => {
    setLoad(true);
    setPosts((prevPosts) => [...prevPosts, newPost]);
    await refreshPosts();
    setLoad(false);
  };

  //SET THE SELECTED POST TO THE POST WHERE THE UPDATE BUTTON WAS CLICKED AND DISPLAYS AN UPDATE FORM
  const handleUpdateClick = (post: Post) => {
    setSelectedPost(post);
  };

  // CLOSE THE UPDATE FORM
  const handleUpdateClose = () => {
    setSelectedPost(null);
  };

  // GENERATE THE POSTS
  const refreshPosts = async () => {
    try {
      setIsLoadingPost(true);
      const response = await fetch(`${ENDPOINT}/posts/tags/${tag}`);
      setIsLoadingPost(false);
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  //HANDLE THE UPDATING OF POST WHILE ALSO UPDATING THE DATA
  const handlePostUpdate = async () => {
    // Call refreshPosts after updating the post
    await refreshPosts();

    // Close the update form
    handleUpdateClose();
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  const genurl = (postid: number) => `/post/${postid}`;
  const memoizedPost = useMemo(() => posts, [posts]);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-6">{tag}</h2>
      {load ? (
        <CircularProgress />
      ) : (
        <CreatePost onPostCreated={handlePostCreated} />
      )}

      {isLoadingPost ? (
        <div className="mt-10">
          <LinearProgress color="inherit" />
        </div>
      ) : (
        <ul className="space-y-6">
          {memoizedPost.map((post) => (
            <li key={post.ID} className="border-b pb-4">
              {selectedPost && selectedPost.ID === post.ID && (
                <div>
                  <UpdatePost
                    postId={selectedPost.ID}
                    title={selectedPost.Title}
                    body={selectedPost.Body}
                    onUpdate={handlePostUpdate}
                  />
                  <button
                    onClick={handleUpdateClose}
                    className="bg-white text-red-500 border border-red-500 px-4 py-1 mt-1 rounded-md font-light hover:bg-red-700 hover:text-white transition duration-300"
                  >
                    Close
                  </button>
                </div>
              )}
              <div className="pb-3 *:cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <a
                  href={genurl(post.ID)}
                  className="block text-black hover:text-gray-700 transition duration-300"
                >
                  <div className="mb-2 flex flex-row items-center justify-between">
                    <h2 className="text-xl font-bold">{post.Title}</h2>
                    <div className="text-xs text-gray-600">
                      <span>Last Updated:</span>
                      <br />
                      {timeAgo(post.UpdatedAt)}
                    </div>
                  </div>

                  <div className="text-gray-700 ">{post.Body}</div>
                  <div className="mt-2 text-gray-600">
                    <strong>Posted by</strong> {post.Email}
                  </div>
                  <div className="text-gray-600">
                    <strong>Created At:</strong>{" "}
                    {formatTimeStamp(post.CreatedAt)}
                  </div>
                </a>
              </div>

              {/* Only display the update button if the post is created by the logged-in user */}
              <div>
                {post.Email === email && (
                  <button
                    onClick={() => handleUpdateClick(post)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Update Post
                  </button>
                )}
              </div>
              <div>
                {post.Email === email && (
                  <DeletePost postId={post.ID} onDelete={refreshPosts} />
                )}
              </div>
              <br />
            </li>
          ))}
        </ul>
      )}
      {/* Display the UpdatePost component when a post is selected for update */}
    </div>
  );
}

export default PostsUnderTag;
