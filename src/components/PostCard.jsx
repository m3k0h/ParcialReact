import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post, onRequestDelete }) {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="bg-[#1a1d27] border border-[#2e3247] rounded-xl p-5 flex flex-col gap-3 hover:border-[#6c63ff]/50 transition-all">

      <span className="text-xs font-semibold text-[#6c63ff] uppercase tracking-wider">
        # {String(post.id).padStart(3, "0")}
      </span>

      <h2 className="font-display font-semibold text-sm leading-snug line-clamp-2">
        {post.title}
      </h2>

      <p className="text-xs text-[#6b7280] leading-relaxed line-clamp-3 flex-1">
        {post.body}
      </p>

      <div className="flex gap-2 items-center border-t border-[#2e3247] pt-3">
        <button
          onClick={() => navigate(`/posts/${post.id}`)}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#6c63ff]/15 text-[#a78bfa] border-none cursor-pointer hover:bg-[#6c63ff]/25 transition-all"
        >
          Ver detalle
        </button>
        {confirm ? (
          <>
            <span className="text-xs text-[#fca5a5] ml-auto">¿Seguro?</span>
            <button
              onClick={() => onRequestDelete(post.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#ef4444] text-white border-none cursor-pointer hover:bg-[#dc2626] transition-all"
            >
              Sí
            </button>
            <button
              onClick={() => setConfirm(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#222535] text-[#6b7280] border border-[#2e3247] cursor-pointer hover:text-[#e8eaf0] transition-all"
            >
              No
            </button>
          </>
        ) : (
          <button
            onClick={() => setConfirm(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#ef4444]/10 text-[#ef4444] border-none cursor-pointer hover:bg-[#ef4444]/20 transition-all ml-auto"
          >
            Eliminar
          </button>
        )}
      </div>

    </div>
  );
}
