import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import {toast} from "sonner";

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { addPost } = usePosts();
  const titleRef = useRef(null); // useRef para el foco automático
  const [form, setForm] = useState({ title: "", body: "", userId: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // foco automático en el título al montar el componente — cumple el requisito de useRef
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "El título es obligatorio";
    if (form.title.length > 100) errs.title = "Máximo 100 caracteres";
    if (!form.body.trim()) errs.body = "El contenido es obligatorio";
    if (!form.userId) errs.userId = "El User ID es obligatorio";
    if (isNaN(form.userId)) errs.userId = "El User ID debe ser un número";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);

    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, userId: Number(form.userId) }),
        });
        if (!res.ok) {
          toast.error("POST: ERROR " + res.status, { description: "No se pudo crear el post. Intentá de nuevo." });
          throw new Error(`Error ${res.status}`);
          return;
        }
        toast.success("POST: OK 201", { description: "Post creado correctamente" });
        const data = await res.json();
        addPost(data);
        navigate("/posts");
    } catch (err) {
        setErrors({ api: "No se pudo crear el post. Intentá de nuevo." });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Crear nuevo post</h1>
          <p className="text-xs text-[#6b7280] mt-1">Completá los campos y publicá</p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xs text-[#6b7280] bg-[#222535] border border-[#2e3247] px-3 py-1.5 rounded-lg cursor-pointer hover:text-[#e8eaf0] transition-all"
        >
          ← Volver
        </button>
      </div>

      {/* ERROR API */}
      {errors.api && (
        <div className="bg-[#ef4444]/10 border border-[#ef4444]/25 rounded-xl p-4 flex items-center gap-3 text-[#fca5a5] text-sm mb-6">
          <span className="w-5 h-5 rounded-full bg-[#ef4444] text-white flex items-center justify-center text-xs font-bold shrink-0">!</span>
          {errors.api}
        </div>
      )}


      <div className="bg-[#1a1d27] border border-[#2e3247] rounded-xl p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* TÍTULO */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
              Título
            </label>
            <input
              ref={titleRef}
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Título del post..."
              className={`bg-[#222535] border rounded-lg px-4 py-3 text-sm text-[#e8eaf0] outline-none transition-all placeholder:text-[#4b5563] ${
                errors.title
                  ? "border-[#ef4444]"
                  : "border-[#2e3247] focus:border-[#6c63ff]"
              }`}
            />
            <div className="flex justify-between">
              {errors.title
                ? <span className="text-xs text-[#ef4444]">{errors.title}</span>
                : <span></span>
              }
              <span className="text-xs text-[#6b7280]">{form.title.length} / 100</span>
            </div>
          </div>

          {/* BODY */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
              Contenido
            </label>
            <textarea
              name="body"
              value={form.body}
              onChange={handleChange}
              placeholder="Escribí el contenido del post..."
              rows={6}
              className={`bg-[#222535] border rounded-lg px-4 py-3 text-sm text-[#e8eaf0] outline-none resize-none transition-all placeholder:text-[#4b5563] ${
                errors.body
                  ? "border-[#ef4444]"
                  : "border-[#2e3247] focus:border-[#6c63ff]"
              }`}
            />
            <div className="flex justify-between">
              {errors.body
                ? <span className="text-xs text-[#ef4444]">{errors.body}</span>
                : <span></span>
              }
              <span className="text-xs text-[#6b7280]">{form.body.length} caracteres</span>
            </div>
          </div>

          {/* USER ID */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
              User ID
            </label>
            <input
              name="userId"
              value={form.userId}
              onChange={handleChange}
              type="number"
              placeholder="Ej: 1"
              className={`bg-[#222535] border rounded-lg px-4 py-3 text-sm text-[#e8eaf0] outline-none transition-all placeholder:text-[#4b5563] ${
                errors.userId
                  ? "border-[#ef4444]"
                  : "border-[#2e3247] focus:border-[#6c63ff]"
              }`}
            />
            {errors.userId && (
              <span className="text-xs text-[#ef4444]">{errors.userId}</span>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex gap-3 justify-end pt-2 border-t border-[#2e3247]">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#222535] text-[#6b7280] border border-[#2e3247] cursor-pointer hover:text-[#e8eaf0] transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#6c63ff] text-white border-none cursor-pointer hover:bg-[#5b52ee] transition-all disabled:opacity-50"
            >
              {loading ? "Publicando..." : "Publicar post"}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
