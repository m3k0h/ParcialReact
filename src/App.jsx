import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/UserLayout";
import PostsPage from "./pages/PostsPage";
import PostDetailPage from "./pages/PostDetailPage";
import AboutPage from "./pages/AboutPage";
import CreatePostPage from "./pages/CreatePostPage";

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts/new" element={<CreatePostPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
