export default function AboutPage() {
  const techs = [
    { icon: "⚛️", name: "React 18", desc: "UI + Hooks" },
    { icon: "⚡", name: "Vite", desc: "Bundler" },
    { icon: "🛣️", name: "React Router", desc: "Navegación" },
    { icon: "🌐", name: "Fetch API", desc: "HTTP nativo" },
    { icon: "🎨", name: "Tailwind", desc: "Estilos" },
    { icon: "🔗", name: "JSONPlaceholder", desc: "API REST" },
  ];

  const members = [
    { icon: "👨", name: "Castro Santiago"},
    { icon: "👨", name: "Cano Nazareno"},
    { icon: "👩", name: "Cordoba Milagros"},
    { icon: "👩", name: "Insegna Belen"},
    { icon: "👨", name: "Zambrano Facundo"}
  ];

  return (
    <div className="max-w-xl mx-auto text-center pt-12">

      <span className="inline-block px-4 py-1 rounded-full border border-[#2e3247] text-[#6b7280] text-xs mb-6">
        v1.0 · Segundo Parcial
      </span>

      <h1 className="font-display text-4xl font-bold mb-4 bg-gradient-to-br from-white to-[#a78bfa] bg-clip-text text-transparent">
        PostHub
      </h1>

      <p className="text-[#6b7280] text-sm leading-relaxed mb-10">
        Aplicación desarrollada como trabajo práctico de Programación Web II.
        Consume la API de JSONPlaceholder y permite gestionar posts mediante un CRUD completo.
      </p>

      <div className="grid grid-cols-3 gap-3">
        {techs.map((tech) => (
          <div
            key={tech.name}
            className="bg-[#222535] border border-[#2e3247] rounded-xl p-4 text-center"
          >
            <div className="text-2xl mb-2">{tech.icon}</div>
            <div className="text-sm font-semibold">{tech.name}</div>
            <div className="text-xs text-[#6b7280] mt-1">{tech.desc}</div>
          </div>
        ))}
      </div>

      <hr className="border-[#2e3247] my-8" />



      <div className="flex flex-col items-center cols-2 gap-3">

        <h1 className="col-span-3 text-left font-display text-2xl font-bold mb-4 bg-gradient-to-br from-white to-[#a78bfa] bg-clip-text text-transparent">
            Integrantes
        </h1>
        <div className="grid grid-cols-3 gap-3 w-full">
            {members.map((member) => (
            <div
                key={member.name}
                className="bg-[#222535] border border-[#2e3247] rounded-xl p-4 text-center"
            >
                <div className="text-2xl mb-2">{member.icon}</div>
                <div className="text-sm font-semibold">{member.name}</div>
            </div>
            ))}
        </div>
        
      </div>

    </div>
  );
}
