
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
  CheckSquare,
  Zap,
  Folder,
  Layers,
  Settings,
  ChevronLeft,
  X,
} from "lucide-react";

type SidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

const sidebarSections = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", path: "dashboard", icon: Home },
      { label: "My Classes", path: "classes", icon: Users },
      { label: "Analytics", path: "analytics", icon: BarChart3 },
      { label: "Calendar", path: "calendar", icon: Calendar },
      { label: "Games", path: "games", icon: Gamepad2 },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "Assessments", path: "assessments", icon: ClipboardCheck },
      { label: "Cross-Marking", path: "cross-marking", icon: Shuffle },
      { label: "Task Compiler", path: "task-compiler", icon: CheckSquare },
      { label: "Live Quiz", path: "live-quiz", icon: Zap },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Content Library", path: "content-library", icon: Folder },
      { label: "Curriculum", path: "curriculum", icon: Layers },
    ],
  },
];

/* ================= STYLES ================= */

const baseLink =
  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out";

const inactive =
  "text-slate-600 hover:bg-green-100 hover:text-green-700 hover:shadow-sm hover:scale-[1.02]";

const active =
  "bg-green-500 text-whiteshadow-sm shadow-green-200";

/* ========================================== */

export default function AppSidebar({ mobileOpen, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

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
          rounded-2xl
          transition-all duration-300
          md:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${collapsed ? "w-16" : "w-64"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-2 border-b border-slate-200/60">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100 transition"
          >
            <ChevronLeft
              size={18}
              className={`transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>

          <button
            onClick={onClose}
            className="md:hidden h-8 w-8 flex items-center justify-center rounded-md hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 overflow-y-scroll scrollbar-hide px-2 py-4 space-y-6">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <p className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {section.title}
                </p>
              )}

              <div className="mt-2 space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end
                      onClick={onClose}
                      className={({ isActive }) =>
                        `
                          ${baseLink}
                          ${isActive ? active : inactive}
                          ${collapsed ? "justify-center px-2" : ""}
                        `
                      }
                    >
                      <Icon
                        size={18}
                        className="transition-transform duration-200 group-hover:scale-110"
                      />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="border-t border-slate-200/60 p-2">
          <div
            className={`flex items-center gap-3 px-2 py-2 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-semibold">
              JD
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-slate-500">View Profile</p>
              </div>
            )}
          </div>

          <NavLink
            to="settings"
            onClick={onClose}
            className={({ isActive }) =>
              `
                ${baseLink}
                ${isActive ? active : inactive}
                ${collapsed ? "justify-center px-2" : ""}
              `
            }
          >
            <Settings
              size={18}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            {!collapsed && <span>Settings</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
}
