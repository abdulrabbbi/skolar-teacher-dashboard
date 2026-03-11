import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  BellRing,
  CheckCircle2,
  Flame,
  MessageSquareText,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "../../lib/cn";

export type NotificationIconType =
  | "feedback"
  | "streak"
  | "reminder"
  | "summary"
  | "achievement"
  | "system"
  | "liveQuiz";

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  unread: boolean;
  iconType: NotificationIconType;
  targetRoute?: string;
  ctaLabel?: string;
};

function iconFor(type: NotificationIconType) {
  if (type === "feedback") return MessageSquareText;
  if (type === "streak") return Flame;
  if (type === "reminder") return BellRing;
  if (type === "summary") return BarChart3;
  if (type === "achievement") return Sparkles;
  if (type === "liveQuiz") return PlayCircle;
  return CheckCircle2;
}

function iconTone(type: NotificationIconType) {
  if (type === "feedback") return "bg-[#FFF1F4] text-[#E11D48] border-[#FFD7E1]";
  if (type === "streak") return "bg-[#FFF8E8] text-[#C56A00] border-[#F8E2A4]";
  if (type === "reminder") return "bg-[#EEF2FF] text-[#4F46E5] border-[#D9DEFF]";
  if (type === "summary") return "bg-[#ECFDF3] text-[#047857] border-[#B7EBCB]";
  if (type === "achievement") return "bg-[#F0F9FF] text-[#0369A1] border-[#CBEAFE]";
  if (type === "liveQuiz") return "bg-[#EEF2FF] text-[#4F46E5] border-[#D9DEFF]";
  return "bg-slate-50 text-slate-700 border-slate-100";
}

type Props = {
  open: boolean;
  unreadCount: number;
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllRead: () => void;
  onEditProfile: () => void;
  onNotificationClick: (notification: NotificationItem) => void;
};

export function NotificationsPopover({
  open,
  unreadCount,
  notifications,
  onMarkAllRead,
  onEditProfile,
  onNotificationClick,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.985 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          role="dialog"
          aria-label="Notifications"
          className={cn(
            "relative z-[10000] w-[min(360px,calc(100vw-24px))] flex flex-col",
            "max-h-[min(400px,calc(100dvh-90px))] overflow-hidden",
            "rounded-[22px] border border-[#D9E1EC] bg-white",
            "shadow-[0_18px_55px_rgba(15,23,42,0.16)]",
          )}
        >
          <div className="shrink-0 border-b border-[#E9EEF5] px-4 pt-4 pb-3">
            {/* Row 1 – title */}
            <div className="text-[18px] font-extrabold leading-none text-[#0F172A]">
              Notifications
            </div>

            {/* Row 2 – unread count + actions */}
            <div className="mt-2.5 flex items-center justify-between gap-2">
              <div className="text-[12px] font-medium text-[#64748B]">
                {unreadCount} unread
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={onMarkAllRead}
                  className={cn(
                    "inline-flex h-7 items-center justify-center rounded-[10px]",
                    "border border-[#D5DEE8] bg-white px-2.5",
                    "text-[11px] font-semibold text-[#334155]",
                    "transition hover:bg-slate-50",
                  )}
                >
                  Mark all read
                </button>

                <button
                  type="button"
                  onClick={onEditProfile}
                  className={cn(
                    "inline-flex h-7 items-center justify-center rounded-[10px]",
                    "bg-[#0F172A] px-2.5",
                    "text-[11px] font-semibold text-white",
                    "transition hover:bg-[#111C33]",
                  )}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <div className="scrollbar-hide flex-1 overflow-y-auto px-3 py-2.5">
            <div className="space-y-1.5">
              {notifications.map((n) => {
                const Icon = iconFor(n.iconType);

                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => onNotificationClick(n)}
                    className={cn(
                      "w-full rounded-[14px] border border-[#E2E8F0] bg-white text-left",
                      "px-3 py-2.5 transition",
                      n.targetRoute
                        ? "hover:border-indigo-200 hover:bg-indigo-50/30"
                        : "hover:bg-slate-50",
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      {/* icon */}
                      <div
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border",
                          iconTone(n.iconType),
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      {/* content */}
                      <div className="min-w-0 flex-1">
                        {/* title row */}
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="truncate text-[13px] font-bold leading-tight text-[#0F172A]">
                            {n.title}
                          </div>
                          {/* time + unread dot */}
                          <div className="flex shrink-0 items-center gap-1 pt-px">
                            <span className="text-[11px] font-semibold text-[#64748B]">
                              {n.timeAgo}
                            </span>
                            {n.unread && (
                              <span className="h-2 w-2 shrink-0 rounded-full bg-[#FF2D55]" />
                            )}
                          </div>
                        </div>

                        {/* message */}
                        <div className="mt-0.5 text-[11.5px] leading-[1.4] text-[#475569]">
                          {n.message}
                        </div>

                        {/* CTA */}
                        {n.targetRoute ? (
                          <div className="mt-1.5 text-[11.5px] font-semibold text-[#4F46E5]">
                            {n.ctaLabel ?? "Open"}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </button>
                );
              })}

              {notifications.length === 0 && (
                <div className="px-4 py-8 text-center text-sm font-medium text-slate-500">
                  You’re all caught up.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}