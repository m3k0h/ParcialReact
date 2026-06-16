// pages/PostsPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import PostCard from "../components/PostCard";
import { toast } from "sonner";

export default function PostsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState("");
    const postsPerPage = 9;

    const { posts, loading, error, deletePost } = usePosts();
    const navigate = useNavigate();

    const sorted = posts ? [...posts].sort((a, b) => b.id - a.id) : [];

    const filtered = sorted.filter(post =>
        !query ||
        post.id.toString() === query.trim() ||
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query)
    );

    const totalPages = Math.ceil(filtered.length / postsPerPage) || 1;
    const currentPosts = filtered.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: "DELETE",
            });
            if (!res.ok){
                toast.error("DELETE: ERROR " + res.status, { description: `No se pudo eliminar el post ${id}` });
                throw new Error(`Error ${res.status}`);
                return;
            }
            toast.success("DELETE: OK 200", { description: `Post ${id} eliminado correctamente` });
        } catch (err) {
            console.error(err.message);
            return;
        }
        deletePost(id);
    };

    if (loading) return <p>Cargando posts...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Buscar posts..."
                    value={query}
                    className="w-full px-4 py-2 rounded-lg bg-[#1a1d27] border border-[#2e3247] text-sm text-[#e8eaf0] focus:outline-none focus:ring-2 focus:ring-[#6c63ff]/50"
                    onChange={(e) => {
                        setQuery(e.target.value.toLowerCase());
                        setCurrentPage(1);
                    }}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPosts.map(post => (
                    <PostCard key={post.id} post={post} onRequestDelete={handleDelete} />
                ))}
            </div>
            <div className="flex justify-center items-center gap-3 mt-8">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="px-4 py-2 rounded-lg bg-[#6c63ff]/15 text-[#a78bfa] border-none cursor-pointer hover:bg-[#6c63ff]/25 transition-all"
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>

                <span className="text-sm text-[#6b7280]">
                    Página {currentPage} de {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="px-4 py-2 rounded-lg bg-[#6c63ff]/15 text-[#a78bfa] border-none cursor-pointer hover:bg-[#6c63ff]/25 transition-all"
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};
