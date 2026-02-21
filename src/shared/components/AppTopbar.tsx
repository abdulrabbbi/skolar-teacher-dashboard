
import { Bell, Calendar, Menu } from "lucide-react";
import type { ReactNode } from "react";
// ✅ correct import (from src/assets/...)
import logo from "../../assets/images/logo.png";

export type AppTopbarProps = {
  onMenuClick?: () => void;
  onLogoClick?: () => void; // optional if you want it clickable
};

type IconButtonProps = {
  label: string;
  children: ReactNode;
};

function IconButton({ label, children }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="
        group
        inline-flex h-9 w-9 items-center justify-center
        rounded-xl
        bg-green-100 text-green-700
        transition-all duration-200 ease-out
        hover:bg-green-200 hover:scale-105
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-green-300
      "
    >
      <span className="transition-transform duration-200 group-hover:rotate-6">
        {children}
      </span>
    </button>
  );
}

export default function AppTopbar({ onMenuClick, onLogoClick }: AppTopbarProps) {
  return (
    <header
      className="
        flex h-14 items-center justify-between
        rounded-2xl
        border border-slate-200
        bg-white/90 backdrop-blur
        px-4 md:px-6
        shadow-sm
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="
              inline-flex h-9 w-9 items-center justify-center
              rounded-lg border border-slate-200
              text-slate-600
              transition-all duration-200
              hover:bg-green-100 hover:text-green-700
              active:scale-95
              md:hidden
            "
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        {/* LOGO + BRAND */}
        <button
          type="button"
          onClick={onLogoClick}
          className="
            flex items-center gap-2
            rounded-xl
            px-1 py-1
            hover:bg-slate-50
            transition
          "
        >
          <img
            src={logo}
            alt="Skolar logo"
            className="h-9 w-9 shrink-0 object-contain"
            draggable={false}
          />
          <span className="text-lg font-semibold tracking-wide text-slate-900">
            SKOLAR
          </span>
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <IconButton label="Open calendar">
          <Calendar className="h-5 w-5" />
        </IconButton>

        <IconButton label="View notifications">
          <Bell className="h-5 w-5" />
        </IconButton>

        {/* ACCOUNT */}
        <button
          type="button"
          className="
            hidden sm:flex items-center gap-2
            rounded-full border border-slate-200
            bg-white px-2.5 py-1.5
            text-sm font-medium text-slate-700
            transition-all duration-200
            hover:bg-green-50 hover:border-green-300
            hover:text-green-700
          "
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
            J
          </span>
          Account
        </button>
      </div>
    </header>
  );
}
