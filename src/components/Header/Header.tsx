import { List, X } from "phosphor-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCharacter } from "../../context/CharacterContext";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { sheetName, setSheetName } = useCharacter();

  const [tempName, setTempName] = useState(sheetName);

  const handleSave = () => {
    setSheetName(tempName);
    setIsEditing(false);
  };

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
    { to: "/detalhes", label: "Detalhes" },
  ];

  return (
    <header>
      <div className="flex justify-between items-center px-4 py-2 max-w-[1200px] mx-auto">
        {/* Nome da build com label visível */}
        <div className="flex items-center gap-2 hover:bg-textLightBlue">
          <label htmlFor="sheetNameInput" className="text-sm text-gray-600">
            Nome da Build:
          </label>

          {isEditing ? (
            <input
              id="sheetNameInput"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
              autoFocus
              className="text-lg font-semibold text-black bg-yellow-100 border-b-2 border-yellow-500 hover:border-yellow-600 focus:ring-2 focus:ring-yellow-400 outline-none px-1 transition duration-200 "
            />
          ) : (
            <span
              className="text-lg font-semibold text-black cursor-pointer hover:underline hover:text-yellow-600"
              title="Clique para editar"
              onClick={() => {
                setTempName(sheetName);
                setIsEditing(true);
              }}
            >
              {sheetName}
            </span>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black md:hidden"
          aria-label="Abrir menu"
        >
          {isOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
        </button>

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

      {isOpen && (
        <nav className="md:hidden">
          <ul className="flex flex-col items-center gap-3 py-6">
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
