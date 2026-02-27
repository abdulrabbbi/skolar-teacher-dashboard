
// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Home,
//   Users,
//   BarChart3,
//   Calendar,
//   Gamepad2,
//   ClipboardCheck,
//   Shuffle,
//   Sparkles,
//   Zap,
//   Folder,
//   Layers,
//   Settings,
//   ChevronLeft,
//   X,
// } from "lucide-react";
// import { useMediaQuery } from "../../shared/hooks/useMediaQuery";

// type SidebarProps = {
//   mobileOpen?: boolean;
//   onClose?: () => void;
// };

// type SidebarItem = {
//   label: string;
//   path: string;
//   icon: React.ElementType;
//   end?: boolean;
// };

// const sidebarSections: { title: string; items: SidebarItem[] }[] = [
//   {
//     title: "Main",
//     items: [
//       { label: "Dashboard", path: "dashboard", icon: Home, end: true },
//       { label: "My Classes", path: "classes", icon: Users, end: false },
//       { label: "Analytics", path: "analytics", icon: BarChart3, end: true },
//       { label: "Calendar", path: "calendar", icon: Calendar, end: true },
//       { label: "Games", path: "games", icon: Gamepad2, end: true },
//     ],
//   },
//   {
//     title: "Tools",
//     items: [
//       { label: "Assessments", path: "assessments", icon: ClipboardCheck, end: true },
//       { label: "Cross-Marking", path: "cross-marking", icon: Shuffle, end: true },
//       { label: "Task Compiler", path: "task-compiler", icon: Sparkles, end: false },
//       { label: "Live Quiz", path: "live-quiz", icon: Zap, end: false },
//     ],
//   },
//   {
//     title: "Resources",
//     items: [
//       { label: "Content Library", path: "content-library", icon: Folder, end: true },
//       { label: "Curriculum", path: "curriculum", icon: Layers, end: false },
//     ],
//   },
// ];

// const baseLink =
//   "group mx-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors";
// const inactive = "text-slate-700 hover:bg-slate-100";
// const active = "bg-[#00B96B] text-white shadow-sm";

// export default function AppSidebar({ mobileOpen, onClose }: SidebarProps) {
//   const [collapsed, setCollapsed] = useState(false);
//   const isMdUp = useMediaQuery("(min-width: 768px)");

//   const handleChevronClick = () => {
//     // ✅ Desktop: collapse/expand
//     if (isMdUp) {
//       setCollapsed((p) => !p);
//       return;
//     }
//     // ✅ Mobile: close drawer
//     onClose?.();
//   };

//   const handleNavClick = () => {
//     // ✅ Only close on mobile
//     if (!isMdUp) onClose?.();
//   };

//   return (
//     <>
//       {/* MOBILE OVERLAY */}
//       {mobileOpen && (
//         <div
//           onClick={onClose}
//           className="fixed inset-0 z-40 bg-black/40 md:hidden"
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`
//           fixed md:static inset-y-0 left-0 z-50
//           flex flex-col
//           bg-white
//           border border-slate-200/60
//           shadow-sm
//           rounded-2xl
//           transition-all duration-300
//           md:translate-x-0
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
//           w-64
//           ${collapsed ? "md:w-16" : "md:w-64"}
//         `}
//       >
//         {/* TOP RIGHT CHEVRON */}
//         <div className="flex justify-end px-2 pt-2">
//           <button
//             onClick={handleChevronClick}
//             className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 transition"
//             aria-label={isMdUp ? "Collapse sidebar" : "Close sidebar"}
//           >
//             <ChevronLeft
//               size={18}
//               className={`transition-transform ${collapsed ? "md:rotate-180" : ""}`}
//             />
//           </button>

//           {/* MOBILE CLOSE */}
//           <button
//             onClick={onClose}
//             className="ml-1 md:hidden grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 transition"
//             aria-label="Close sidebar"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         {/* NAV */}
//         <nav className="flex-1 overflow-y-auto px-1 py-3 space-y-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
//           {sidebarSections.map((section) => (
//             <div key={section.title}>
//               {section.title !== "Main" && !collapsed && (
//                 <p className="px-4 text-[11px] font-semibold text-slate-400">
//                   {section.title}
//                 </p>
//               )}

//               <div className={`${section.title !== "Main" && !collapsed ? "mt-2" : ""} space-y-1`}>
//                 {section.items.map((item) => {
//                   const Icon = item.icon;

//                   return (
//                     <NavLink
//                       key={item.path}
//                       to={item.path}
//                       end={item.end}
//                       onClick={handleNavClick}
//                       title={collapsed ? item.label : undefined}
//                       className={({ isActive }) =>
//                         `${baseLink} ${isActive ? active : inactive} ${
//                           collapsed ? "md:justify-center md:px-2" : ""
//                         }`
//                       }
//                     >
//                       {({ isActive }) => (
//                         <>
//                           <Icon
//                             size={18}
//                             className={`shrink-0 transition-colors ${
//                               isActive
//                                 ? "text-white"
//                                 : "text-slate-400 group-hover:text-slate-600"
//                             }`}
//                           />
//                           {!collapsed && <span>{item.label}</span>}
//                         </>
//                       )}
//                     </NavLink>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </nav>

//         {/* FOOTER */}
//         <div className="px-2 pb-3">
//           <div className={`mx-2 flex items-center gap-3 py-3 ${collapsed ? "md:justify-center" : ""}`}>
//             <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
//               J
//             </div>

//             {!collapsed && (
//               <div className="leading-tight">
//                 <p className="text-sm font-semibold text-slate-900">John Doe</p>
//                 <p className="text-xs text-slate-400">View Profile</p>
//               </div>
//             )}
//           </div>

//           <NavLink
//             to="settings"
//             end
//             onClick={handleNavClick}
//             title={collapsed ? "Settings" : undefined}
//             className={({ isActive }) =>
//               `${baseLink} ${isActive ? active : inactive} ${
//                 collapsed ? "md:justify-center md:px-2" : ""
//               }`
//             }
//           >
//             {({ isActive }) => (
//               <>
//                 <Settings
//                   size={18}
//                   className={`shrink-0 transition-colors ${
//                     isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
//                   }`}
//                 />
//                 {!collapsed && <span>Settings</span>}
//               </>
//             )}
//           </NavLink>
//         </div>
//       </aside>
//     </>
//   );
// }




import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  BarChart3,
  Calendar,
  Gamepad2,
  ClipboardCheck,
  Shuffle,
  Sparkles,
  Zap,
  Folder,
  Layers,
  Settings,
  ChevronLeft,
  X,
} from "lucide-react";
import { useMediaQuery } from "../../shared/hooks/useMediaQuery";

type SidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

type SidebarItem = {
  label: string;
  path: string;
  icon: React.ElementType;
  end?: boolean;
};

const sidebarSections: { title: string; items: SidebarItem[] }[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", path: "dashboard", icon: Home, end: true },
      { label: "My Classes", path: "classes", icon: Users, end: false },
      { label: "Analytics", path: "analytics", icon: BarChart3, end: true },
      { label: "Calendar", path: "calendar", icon: Calendar, end: true },
      { label: "Games", path: "games", icon: Gamepad2, end: true },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "Assessments", path: "assessments", icon: ClipboardCheck, end: true },
      { label: "Cross-Marking", path: "cross-marking", icon: Shuffle, end: true },
      { label: "Task Compiler", path: "task-compiler", icon: Sparkles, end: false },
      { label: "Live Quiz", path: "live-quiz", icon: Zap, end: false },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Content Library", path: "content-library", icon: Folder, end: true },
      { label: "Curriculum", path: "curriculum", icon: Layers, end: false },
    ],
  },
];

const baseLink =
  "group mx-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors";
const inactive = "text-slate-700 hover:bg-slate-100";
const active = "bg-[#00B96B] text-white shadow-sm";

export default function AppSidebar({ mobileOpen, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const isMdUp = useMediaQuery("(min-width: 768px)");

  const handleChevronClick = () => {
    // ✅ Desktop: collapse/expand
    if (isMdUp) {
      setCollapsed((p) => !p);
      return;
    }
    // ✅ Mobile: close drawer
    onClose?.();
  };

  const handleNavClick = () => {
    // ✅ Only close on mobile
    if (!isMdUp) onClose?.();
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          flex flex-col
          bg-white
          border border-slate-200/60
          shadow-sm
          rounded-2xl
          transition-all duration-300
          md:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          w-64
          ${collapsed ? "md:w-16" : "md:w-64"}
        `}
      >
        {/* TOP RIGHT CHEVRON */}
        <div
          className={`flex items-center px-2 pt-2 justify-end ${
            collapsed ? "md:justify-center" : "md:justify-end"
          }`}
        >
          <button
            onClick={handleChevronClick}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 transition"
            aria-label={isMdUp ? "Collapse sidebar" : "Close sidebar"}
          >
            <ChevronLeft
              size={18}
              className={`transition-transform ${collapsed ? "md:rotate-180" : ""}`}
            />
          </button>

          {/* MOBILE CLOSE */}
          <button
            onClick={onClose}
            className="ml-1 md:hidden grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 transition"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 overflow-y-auto px-1 py-3 space-y-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              {section.title !== "Main" && !collapsed && (
                <p className="px-4 text-[11px] font-semibold text-slate-400">
                  {section.title}
                </p>
              )}

              <div
                className={`${
                  section.title !== "Main" && !collapsed ? "mt-2" : ""
                } space-y-1`}
              >
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      onClick={handleNavClick}
                      title={collapsed ? item.label : undefined}
                      className={({ isActive }) =>
                        `${baseLink} ${isActive ? active : inactive} ${
                          collapsed ? "md:justify-center md:px-2" : ""
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            size={18}
                            className={`shrink-0 transition-colors ${
                              isActive
                                ? "text-white"
                                : "text-slate-400 group-hover:text-slate-600"
                            }`}
                          />
                          {!collapsed && <span>{item.label}</span>}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="px-2 pb-3">
          <div
            className={`mx-2 flex items-center gap-3 py-3 ${
              collapsed ? "md:justify-center" : ""
            }`}
          >
            <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
              J
            </div>

            {!collapsed && (
              <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-900">John Doe</p>
                <p className="text-xs text-slate-400">View Profile</p>
              </div>
            )}
          </div>

          <NavLink
            to="settings"
            end
            onClick={handleNavClick}
            title={collapsed ? "Settings" : undefined}
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive} ${
                collapsed ? "md:justify-center md:px-2" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Settings
                  size={18}
                  className={`shrink-0 transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                {!collapsed && <span>Settings</span>}
              </>
            )}
          </NavLink>
        </div>
      </aside>
    </>
  );
}