/* eslint-disable react-hooks/set-state-in-effect */
import { Bell, Calendar, Menu } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import topbarIcon from "../../assets/images/topiconn.svg";
import {
  NotificationsPopover,
  type NotificationItem,
} from "../components/ui/NotificationsPopover";

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

type PanelPosition = {
  top: number;
  right: number;
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

function buildTopbarNotifications(): NotificationItem[] {
  return [
    {
      id: "notif-live-quiz",
      title: "Live Quiz Started",
      message:
        "Your teacher has started a live Methods quiz. Join now before the timer runs out.",
      timeAgo: "now",
      unread: true,
      iconType: "liveQuiz",
      targetRoute: "/teacher/live-quiz",
      ctaLabel: "Join Live Quiz",
    },
    {
      id: "notif-feedback",
      title: "Feedback Available",
      message:
        "Your Exam Simulation attempt has new AI feedback ready to review.",
      timeAgo: "2m",
      unread: true,
      iconType: "feedback",
      targetRoute: "/teacher/analytics",
    },
    {
      id: "notif-streak",
      title: "Streak Milestone!",
      message: "You hit a 7-day study streak. Keep going to reach 14 days.",
      timeAgo: "1h",
      unread: true,
      iconType: "streak",
      targetRoute: "/teacher/dashboard",
    },
    {
      id: "notif-reminder",
      title: "Study Reminder",
      message: "Planner: You scheduled a 30-minute revision block for today.",
      timeAgo: "3h",
      unread: false,
      iconType: "reminder",
      targetRoute: "/teacher/calendar",
    },
    {
      id: "notif-summary",
      title: "Weekly Progress Summary",
      message:
        "Your accuracy improved by 5% this week. See the breakdown by topic.",
      timeAgo: "1d",
      unread: true,
      iconType: "summary",
      targetRoute: "/teacher/analytics",
    },
  ];
}

export default function AppTopbar({ onMenuClick, onLogoClick }: AppTopbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    () => buildTopbarNotifications(),
  );
  const [panelPosition, setPanelPosition] = useState<PanelPosition>({
    top: 72,
    right: 16,
  });

  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const notificationsPanelRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications],
  );

  useEffect(() => {
    if (!notificationsOpen) return;

    const updatePosition = () => {
      const trigger = notificationsRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();

      setPanelPosition({
        top: rect.bottom + 10,
        right: Math.max(10, window.innerWidth - rect.right),
      });
    };

    updatePosition();

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

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [notificationsOpen]);

  useEffect(() => {
    setNotificationsOpen(false);
  }, [location.pathname]);

  const handleOpenCalendar = () => {
    navigate("/teacher/calendar");
  };

  const handleToggleNotifications = () => {
    setNotificationsOpen((previous) => !previous);
  };

  const handleMarkAllRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({
        ...item,
        unread: false,
      })),
    );
  };

  const handleEditProfile = () => {
    navigate("/teacher/settings");
    setNotificationsOpen(false);
  };

  const handleNotificationClick = (notification: NotificationItem) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === notification.id ? { ...item, unread: false } : item,
      ),
    );

    setNotificationsOpen(false);

    if (notification.targetRoute) {
      navigate(notification.targetRoute);
    }
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
            transition-all duration-300 ease-out
            hover:bg-slate-50
          "
        >
          <img
            src={topbarIcon}
            alt="Skolar logo"
            className="h-10 w-10 shrink-0 object-contain transition-transform duration-300 ease-out group-hover:scale-150"
            draggable={false}
          />
          <span className="text-lg font-semibold tracking-wide text-slate-900 transition-transform duration-300 ease-out group-hover:-translate-y-[1px]">
            SKOLAR
          </span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <IconButton label="Open calendar" onClick={handleOpenCalendar}>
          <Calendar className="h-5 w-5" />
        </IconButton>

        <div ref={notificationsRef} className="relative">
          <div className="relative">
            <IconButton
              label="View notifications"
              onClick={handleToggleNotifications}
              ariaExpanded={notificationsOpen}
            >
              <Bell className="h-5 w-5" />
            </IconButton>

            {unreadCount > 0 && (
              <span className="pointer-events-none absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-sm">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
        </div>

        {notificationsOpen && typeof document !== "undefined"
          ? createPortal(
              <div
                ref={notificationsPanelRef}
                className="fixed z-[9999]"
                style={{
                  top: `${panelPosition.top}px`,
                  right: `${panelPosition.right}px`,
                }}
              >
                <NotificationsPopover
                  open={notificationsOpen}
                  unreadCount={unreadCount}
                  notifications={notifications}
                  onClose={() => setNotificationsOpen(false)}
                  onMarkAllRead={handleMarkAllRead}
                  onEditProfile={handleEditProfile}
                  onNotificationClick={handleNotificationClick}
                />
              </div>,
              document.body,
            )
          : null}

        <button
          type="button"
          className="
            hidden sm:flex items-center gap-2
            rounded-full border border-slate-200
            bg-white px-2.5 py-1.5
            text-sm font-medium text-slate-700
            transition-all duration-200
            hover:border-[#00B96B]
            hover:bg-[#00B96B14]
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
