import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        if (!res.ok) {
          toast.error("GET: ERROR " + res.status, { description: "No se pudieron cargar los posts" });
          throw new Error(`Error ${res.status}`);
        }
        toast.success("GET: OK 200", { description: "Posts cargados correctamente" });  
        return res.json();
      })
      .then(data => { setPosts(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  const deletePost = (id) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const addPost = (post) => {
    setPosts(prev => [post, ...prev]);
  };

  const editPost = (id, updated) => {
    setPosts(prev => prev.map(post => post.id === id ? { ...post, ...updated } : post));
  };

  return (
    <PostsContext.Provider value={{ posts, loading, error, deletePost, addPost, editPost }}>
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);
