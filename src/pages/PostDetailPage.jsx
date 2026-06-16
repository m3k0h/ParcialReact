import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { usePosts } from "../context/PostsContext";
import {toast} from "sonner";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deletePost, editPost } = usePosts();
  const { data: post, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", userId: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // cuando llegan los datos los metemos en el form
  useEffect(() => {
    if (post) setForm({ title: post.title, body: post.body, userId: post.userId });
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            editPost(Number(id), form);
            if (!res.ok){
              throw new Error(`Error ${res.status}`);   
              toast.error("PUT: ERROR " + res.status, { description: `No se pudo actualizar el post ${id}` });
            }
            toast.success("PUT: OK 200", { description: `Post ${id} actualizado correctamente` });
            setEditing(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error(err.message);
        } finally {
            setSaving(false);
        }
    };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        toast.error("DELETE: ERROR " + res.status, { description: `No se pudo eliminar el post ${id}` });
        throw new Error(`Error ${res.status}`);
      }
      toast.success("DELETE: OK 200", { description: `Post ${id} eliminado correctamente` }); 
      deletePost(Number(id));
      navigate("/");
    } catch (err) {
      console.error(err.message);
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  const handleCancel = () => {
    setForm({ title: post.title, body: post.body, userId: post.userId });
    setEditing(false);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 text-[#6b7280]">
      <div className="w-9 h-9 rounded-full border-2 border-[#2e3247] border-t-[#6c63ff] animate-spin"></div>
      <span className="text-sm">Cargando post...</span>
    </div>
  );

  if (error) return (
    <div className="bg-[#ef4444]/10 border border-[#ef4444]/25 rounded-xl p-4 flex items-center gap-3 text-[#fca5a5] text-sm">
      <span className="w-5 h-5 rounded-full bg-[#ef4444] text-white flex items-center justify-center text-xs font-bold shrink-0">!</span>
      No se pudo cargar el post. {error}
    </div>
  );

  return (
    <div className="grid grid-cols-[1fr_300px] gap-6">

      {/* MAIN */}
      <div className="bg-[#1a1d27] border border-[#2e3247] rounded-xl p-8">

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xs text-[#6b7280] bg-[#222535] border border-[#2e3247] px-3 py-1.5 rounded-lg mb-6 cursor-pointer hover:text-[#e8eaf0] transition-all"
        >
          ← Volver al listado
        </button>

        <span className="inline-block bg-[#6c63ff]/20 text-[#a78bfa] text-xs font-semibold px-3 py-1 rounded-full mb-4">
          Post #{id}
        </span>

        {/* TÍTULO */}
        {editing ? (
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-[#222535] border border-[#6c63ff] rounded-lg px-4 py-3 text-lg font-bold font-display text-[#e8eaf0] mb-6 outline-none"
          />
        ) : (
          <h1 className="font-display text-2xl font-bold leading-snug mb-6 capitalize">
            {form.title}
          </h1>
        )}

        {/* BODY */}
        {editing ? (
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            rows={6}
            className="w-full bg-[#222535] border border-[#6c63ff] rounded-lg px-4 py-3 text-sm text-[#e8eaf0] leading-relaxed outline-none resize-none"
          />
        ) : (
          <p className="text-sm text-[#b0b5c8] leading-relaxed">
            {form.body}
          </p>
        )}

        {/* TOAST */}
        {saved && (
          <div className="mt-4 flex items-center gap-2 bg-[#10b981]/15 border border-[#10b981]/30 rounded-lg px-4 py-2.5 text-[#6ee7b7] text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
            Post actualizado correctamente ✓
          </div>
        )}

      </div>

      {/* SIDEBAR */}
      <div className="flex flex-col gap-4">

        <div className="bg-[#1a1d27] border border-[#2e3247] rounded-xl p-5">
          <h3 className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-4">
            Información
          </h3>
          <div className="flex flex-col gap-1">

            <div className="flex justify-between items-center text-sm py-2 border-b border-[#2e3247]">
              <span className="text-[#6b7280]">ID</span>
              <span className="font-medium">{post.id}</span>
            </div>

            {/* USER ID EDITABLE */}
            <div className="flex justify-between items-center text-sm py-2 border-b border-[#2e3247]">
              <span className="text-[#6b7280]">User ID</span>
              {editing ? (
                <input
                  name="userId"
                  value={form.userId}
                  onChange={handleChange}
                  type="number"
                  className="w-20 bg-[#222535] border border-[#6c63ff] rounded-lg px-2 py-1 text-sm text-[#e8eaf0] outline-none text-right"
                />
              ) : (
                <span className="font-medium">{form.userId}</span>
              )}
            </div>

            <div className="flex justify-between items-center text-sm py-2">
              <span className="text-[#6b7280]">Palabras</span>
              <span className="font-medium">{form.body.split(" ").length}</span>
            </div>

          </div>
        </div>

        {/* ACCIONES */}
        <div className="bg-[#1a1d27] border border-[#2e3247] rounded-xl p-5 flex flex-col gap-2">
          <h3 className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-2">
            Acciones
          </h3>

          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#6c63ff] text-white border-none cursor-pointer hover:bg-[#5b52ee] transition-all disabled:opacity-50"
              >
                {saving ? "Guardando..." : "💾 Guardar cambios"}
              </button>
              <button
                onClick={handleCancel}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#222535] text-[#6b7280] border border-[#2e3247] cursor-pointer hover:text-[#e8eaf0] transition-all"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#10b981]/12 text-[#10b981] border-none cursor-pointer hover:bg-[#10b981]/20 transition-all"
              >
                ✏️ Editar este post
              </button>
              {confirmDelete ? (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-[#fca5a5] text-center">¿Seguro que querés eliminar este post?</p>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#ef4444] text-white border-none cursor-pointer hover:bg-[#dc2626] transition-all disabled:opacity-50"
                  >
                    {deleting ? "Eliminando..." : "Sí, eliminar"}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#222535] text-[#6b7280] border border-[#2e3247] cursor-pointer hover:text-[#e8eaf0] transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#ef4444]/10 text-[#ef4444] border-none cursor-pointer hover:bg-[#ef4444]/20 transition-all"
                >
                  🗑️ Eliminar post
                </button>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
}
