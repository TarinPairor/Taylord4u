import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CommentUnderPost from "./components/CommentCRUD/CommentUnderPost";
import HealthCheck from "./components/pages/HealthCheck";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Singup";
import PostsUnderTag from "./components/PostCRUD/PostsUnderTag";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/:postid" element={<CommentUnderPost />} />
          <Route path="/post/tag/:tag" element={<PostsUnderTag />} />
          <Route path="/health" element={<HealthCheck />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
