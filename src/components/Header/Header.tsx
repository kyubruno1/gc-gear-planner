import { List, X } from "phosphor-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const baseLink =
    "inline-block w-[5rem] text-center bg-bgpagelight px-[10px] py-[10px] rounded-[10px] border-[3px] border-primary border-b-0 shadow-[0px_0px_0px_3px_#415870] font-bold mb-[-10px]";
  const activeLink = "bg-bgtextdark font-bold text-white";

  const navLinks = [
    { to: "/", label: "Equip", exact: true },
    { to: "/visual", label: "Visual" },
    { to: "/pet", label: "Pet" },
    { to: "/runas", label: "Runas" },
    { to: "/titulos", label: "Títulos" },
    { to: "/colecao", label: "Coleção" },
  ];

  return (
    <header className="">
      <div className="flex justify-between items-center px-4 py-2 max-w-[1200px] mx-auto">
        <h1 className="text-xl font-bold text-black">Minha Build</h1>

        {/* Botão hamburguer visível só no mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black md:hidden"
          aria-label="Abrir menu"
        >
          {isOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
        </button>

        {/* Menu desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-5">
            {navLinks.map(({ to, label, exact }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    isActive ? `${baseLink} ${activeLink}` : baseLink
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <nav className="md:hidden ">
          <ul className="flex flex-col items-center gap-3 py-6"> {/* mais padding vertical */}
            {navLinks.map(({ to, label, exact }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={exact}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? `inline-block w-[80vw] max-w-xs text-center b px-6 py-4 rounded-[10px] border-[3px] border-primary font-bold text-xl text-white shadow-[0_0_0_3px_#415870] bg-bgtextdark`
                      : `inline-block w-[80vw] max-w-xs text-center bg-bgpagelight px-6 py-4 rounded-[10px] border-[3px] border-primary font-bold text-xl text-gray-900 shadow-[0_0_0_3px_#415870] hover:bg-bgtextdark hover:text-white`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
