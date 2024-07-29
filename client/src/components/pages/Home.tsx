import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout";
import Posts from "../PostCRUD/Posts";
import { User } from "../../interfaces/User";
import { MenuItem, TextField } from "@mui/material";
import { ENDPOINT } from "../Variables";
import HomeInfo from "../HomeInfo";
import { TypeAnimation } from "react-type-animation";

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [tags, setTags] = useState<string[]>([]);

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
          console.log(userData);
          setUser(userData.user);
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

  //const isCookiePresent = !!cookies.Authorization;

  return (
    <div>
      {user ? (
        <>
          <div className="m-4">
            <TextField
              id="outlined-select-tag"
              select
              label="Tags"
              helperText="Tags list"
              sx={{ width: "50%" }}
            >
              {tags?.map((tag: string) => (
                <Link
                  to={`/post/tag/${tag}`}
                  key={tag}
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                </Link>
              ))}
            </TextField>
          </div>
          <Posts />
          <div className="flex flex-col">
            <>Welcome {user ? user.Email : "Guest"}</>
            <Logout />
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center space-x-4">
          <h1 className="flex flex-col justify-center items-center lg:text-6xl text-3xl font-semibold font-sans mb-10">
            Welcome To{" "}
            <div className="font-extrabold lg:text-8xl text-4xl">Taylord4u</div>
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-40"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
          <p className=" m-4 text-xl">
            Please sign up or login to see the posts and comments.{" "}
          </p>
          <div className="flex space-x-2">
            <Link
              to="/signup"
              className=" bg-blue-200 hover:bg-blue-500 transition duration-300 md:text-2xl my-3 border-black border-2 rounded-md p-2"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className=" bg-green-200 hover:bg-green-500 transition duration-300 md:text-2xl my-3 border-black border-2 rounded-md p-2 px-4 md:px-5"
            >
              Login
            </Link>
          </div>
          <p className="font-serif font-semibold m-4 text-xl">
            You can{" "}
            <TypeAnimation
              sequence={[
                "post your ideas.",
                2000,
                "comment on other's posts.",
                2000,
                "analyze post sentiments.",
                2000,
                "add posts to tags.",
                2000,
              ]}
              repeat={Infinity}
            />
          </p>
          <HomeInfo />
        </div>
      )}
    </div>
  );
}

export default Home;
