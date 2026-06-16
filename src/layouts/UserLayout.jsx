// components/Layout.jsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { PostsProvider } from "../context/PostsContext";
import { Toaster } from "sonner";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <PostsProvider>
      <Toaster
        position="bottom-right"
        closeButton
        toastOptions={{
          style: {
            background: "#1a1d27",
            color: "#e8eaf0",
            border: "1px solid #2e3247",
            borderRadius: "0.75rem",
            fontSize: "0.875rem",
          },
          classNames: {
            actionButton: "!bg-[#6c63ff] !text-white hover:!bg-[#5b52ee]",
            closeButton: "!bg-[#222535] !border-[#2e3247] !text-[#6b7280]",
          },
        }}
      />
      <div className="min-h-screen bg-[#0f1117] text-[#e8eaf0] font-sans">
        <nav className="flex justify-between items-center bg-[#1a1d27] border-b border-[#2e3247] px-8 h-[60px]">
          <div className="flex items-center gap-2 font-bold text-[#a78bfa] text-lg">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-[#6c63ff] to-[#a78bfa] inline-block"></span>
            PostHub
          </div>

          <div className="flex">
            <NavLink to="/posts" end className={({ isActive }) =>
              `px-4 py-1.5 rounded-lg text-sm font-medium no-underline transition-all ${
                isActive
                  ? "bg-[#6c63ff]/20 text-[#a78bfa]"
                  : "text-[#6b7280] hover:text-[#e8eaf0]"
              }`
            }>
              Posts
            </NavLink>

            <NavLink to="/about" className={({ isActive }) =>
              `px-4 py-1.5 rounded-lg text-sm font-medium no-underline transition-all ${
                isActive
                  ? "bg-[#6c63ff]/20 text-[#a78bfa]"
                  : "text-[#6b7280] hover:text-[#e8eaf0]"
              }`
            }>
              Acerca de
            </NavLink>
          </div>

          <button
            onClick={() => navigate("/posts/new")}
            className="bg-[#6c63ff] text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none hover:bg-[#5b52ee] transition-all"
          >
            + Nuevo post
          </button>

        </nav>

        {/* CONTENIDO */}
        <main className="p-8">
          <Outlet />
        </main>

      </div>
    </PostsProvider>
  );
};
