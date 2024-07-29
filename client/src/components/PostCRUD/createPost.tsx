// CreatePost.tsx
import { useEffect, useState } from "react";
import { Post } from "../../interfaces/Post";
import { CircularProgress } from "@mui/material";
import { ENDPOINT } from "../Variables";

const CreatePost: React.FC<{ onPostCreated: (newPost: Post) => void }> = ({
  onPostCreated,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");

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

    const fetchTags = async () => {
      try {
        const response = await fetch(`${ENDPOINT}/tags`);
        if (response.ok) {
          const tagsData = await response.json();
          setTags(tagsData.tags);
        } else {
          // Handle error
          console.error("Failed to fetch tags");
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching tags", error);
      }
    };

    fetchUser();
    fetchTags();
  }, []);

  const handleCreatePost = async () => {
    try {
      setLoad(true);
      const response = await fetch(`${ENDPOINT}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Title: title,
          Body: body,
          Email: email,
          Tag: tag,
        }),
      });

      console.log(
        `Created post successfully with title:${title} body:${body} by ${email}`
      );
      if (response.ok) {
        const newPost = await response.json();

        onPostCreated(newPost);
        // Clear input fields after creating a post
        setTitle("");
        setBody("");
        setEmail("");
        // window.location.reload();
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoad(false);
    }
  };

  return load ? (
    <CircularProgress />
  ) : !email ? (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-4 rounded relative mb-2 align-middle"
      role="alert"
    >
      <strong className="font-bold text-xl">Sorry! 😔</strong>
      <br />
      <span className="block sm:inline">
        {" "}
        Exclusive posting privileges are reserved for registered members. Kindly
        log out and re-enter the platform with valid user credentials to access
        this feature.
      </span>
    </div>
  ) : (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Create a New Post
      </h2>
      <label className="block mb-4">
        <span className="text-gray-700">Title:</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Body:</span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Tag:</span>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="" disabled>
            Choose a tag or enter a new one below.
          </option>
          {tags.map((tagOption) => (
            <option key={tagOption} value={tagOption}>
              {tagOption}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </label>
      <button
        onClick={handleCreatePost}
        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-700 transition duration-300"
      >
        Create Post
      </button>
    </div>
  );
};

export default CreatePost;
