import { NavLink } from 'react-router-dom';

export function Header() {
  const baseLink =
    "inline-block w-[80px] text-center bg-bgpagelight px-[10px] py-[10px] rounded-[10px] border-[3px] border-primary border-b-0 shadow-[0px_0px_0px_3px_#415870] font-bold mb-[-10px]";
  const activeLink = "bg-bgtextdark font-bold text-white ";

  return (
    <nav>
      <ul className="flex gap-5 px-[30px] pt-[10px] max-w-[1200px] mx-auto">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? `${baseLink} ${activeLink}` : baseLink}>
            Equip
          </NavLink>
        </li>
        <li>
          <NavLink to="/visual" className={({ isActive }) => isActive ? `${baseLink} ${activeLink}` : baseLink}>
            Visual
          </NavLink>
        </li>
        <li>
          <NavLink to="/pet" className={({ isActive }) => isActive ? `${baseLink} ${activeLink}` : baseLink}>
            Pet
          </NavLink>
        </li>
        <li>
          <NavLink to="/runas" className={({ isActive }) => isActive ? `${baseLink} ${activeLink}` : baseLink}>
            Runas
          </NavLink>
        </li>
        <li>
          <NavLink to="/titulos" className={({ isActive }) => isActive ? `${baseLink} ${activeLink}` : baseLink}>
            Títulos
          </NavLink>
        </li>
        <li>
          <NavLink to="/colecao" className={({ isActive }) => isActive ? `${baseLink} ${activeLink}` : baseLink}>
            Coleção
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
