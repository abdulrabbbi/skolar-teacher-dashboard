/* eslint-disable react-hooks/set-state-in-effect */
import { Bell, Calendar, Menu } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/router/routes";
import logo from "../../assets/images/logo.png";

export type AppTopbarProps = {
  onMenuClick?: () => void;
  onLogoClick?: () => void;
};

type IconButtonProps = {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  ariaExpanded?: boolean;
};

function IconButton({
  label,
  children,
  onClick,
  ariaExpanded,
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      aria-expanded={ariaExpanded}
      className="
        group
        inline-flex h-9 w-9 items-center justify-center
        rounded-xl
        bg-[#00B96B1A] text-[#00B96B]
        transition-all duration-200 ease-out
        hover:bg-[#00B96B1A] hover:scale-105
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-[#00B96B]
      "
    >
      <span className="transition-transform duration-200 group-hover:rotate-6">
        {children}
      </span>
    </button>
  );
}

const topbarNotifications = [
  {
    id: "notif-1",
    title: "3 students have not answered yet",
    time: "Just now",
  },
  {
    id: "notif-2",
    title: "Live quiz confidence dropped to 71%",
    time: "2 min ago",
  },
  {
    id: "notif-3",
    title: "Moderation room has a new submission",
    time: "8 min ago",
  },
] as const;

export default function AppTopbar({ onMenuClick, onLogoClick }: AppTopbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const notificationsPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!notificationsOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideButton = notificationsRef.current?.contains(target);
      const isInsidePanel = notificationsPanelRef.current?.contains(target);

      if (!isInsideButton && !isInsidePanel) {
        setNotificationsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [notificationsOpen]);

  useEffect(() => {
    setNotificationsOpen(false);
  }, [location.pathname]);

  const handleOpenCalendar = () => {
    navigate(ROUTES.calendar);
  };

  const handleToggleNotifications = () => {
    setNotificationsOpen((previous) => !previous);
  };

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
              hover:bg-[#00B96B14] hover:text-[#00B96B]
              active:scale-95
              md:hidden
            "
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <button
          type="button"
          onClick={onLogoClick}
          className="
            group flex items-center gap-2
            rounded-xl
            px-1 py-1
            hover:bg-slate-50
            transition-all duration-300 ease-out
          "
        >
          <img
            src={logo}
            alt="Skolar logo"
            className="h-10 w-10 shrink-0 object-contain transform-gpu transition-transform duration-300 ease-out group-hover:scale-150"
            draggable={false}
          />
          <span className="text-lg font-semibold tracking-wide text-slate-900 transition-transform duration-300 ease-out group-hover:translate-y-[-1px]">
            SKOLAR
          </span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <IconButton label="Open calendar" onClick={handleOpenCalendar}>
          <Calendar className="h-5 w-5" />
        </IconButton>

        <div ref={notificationsRef} className="relative">
          <IconButton
            label="View notifications"
            onClick={handleToggleNotifications}
            ariaExpanded={notificationsOpen}
          >
            <Bell className="h-5 w-5" />
          </IconButton>

          {notificationsOpen && typeof document !== "undefined"
            ? createPortal(
                <div
                  ref={notificationsPanelRef}
                  className="fixed right-4 top-[4.25rem] z-[250] w-64 rounded-xl border border-slate-200 bg-white p-2.5 shadow-xl md:right-6"
                >
                  <div className="mb-2 flex items-center justify-between px-1">
                    <p className="text-xs font-semibold text-slate-900">
                      Notifications
                    </p>
                    <button
                      type="button"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-[11px] font-medium text-slate-500 hover:text-slate-700"
                    >
                      Close
                    </button>
                  </div>

                  <div className="max-h-56 space-y-1.5 overflow-y-auto pr-0.5">
                    {topbarNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5"
                      >
                        <p className="text-[11px] font-medium leading-4 text-slate-800">
                          {notification.title}
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-500">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>,
                document.body,
              )
            : null}
        </div>

        <button
          type="button"
          className="
            hidden sm:flex items-center gap-2
            rounded-full border border-slate-200
            bg-white px-2.5 py-1.5
            text-sm font-medium text-slate-700
            transition-all duration-200
            hover:bg-[#00B96B14] hover:border-[#00B96B]
            hover:text-[#00B96B]
          "
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00B96B] text-xs font-semibold text-white">
            J
          </span>
          Account
        </button>
      </div>
    </header>
  );
}
