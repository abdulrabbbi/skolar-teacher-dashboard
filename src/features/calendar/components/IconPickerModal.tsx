import * as React from "react";
import { createPortal } from "react-dom";
import {
  Activity, AlertCircle, Apple, ArrowLeft, ArrowRight, AtSign,
  Award, BarChart2, Bell, Bike, Bluetooth, Bookmark,
  BookOpen, Brain, Briefcase, Calculator, Calendar, Camera,
  Car, Check, CheckCircle, ChevronDown, ChevronLeft, ChevronRight,
  ChevronUp, Circle, Clipboard, Clock, Cloud, Coffee,
  Copy, Cpu, CreditCard, DollarSign, Download, ExternalLink,
  Eye, EyeOff, FileText, Flag, Folder, Gift,
  Globe, GraduationCap, Hash, Headphones, Heart, HelpCircle,
  Home, Hourglass, Image, Info, Key, Laptop,
  Lightbulb, Link, Lock, Mail, MapPin, Mic,
  Minus, Monitor, Moon, Music, Pencil, Percent,
  Phone, PieChart, Plane, Play, Pause, Plus,
  Printer, RefreshCw, RotateCcw, Save, Search, Send,
  Settings, Share2, Shield, ShoppingCart, Smartphone,
  Square, Star, Sun, Tablet, Tag, Target,
  Timer, Trash2, TrendingUp, Triangle, Umbrella, Unlock,
  Upload, User, Users, Video, Wifi, X, XCircle, Zap,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

type LucideIcon = React.ComponentType<LucideProps>;

export const ICON_MAP: Record<string, LucideIcon> = {
  Activity, AlertCircle, Apple, ArrowLeft, ArrowRight, AtSign,
  Award, BarChart2, Bell, Bike, Bluetooth, Bookmark,
  BookOpen, Brain, Briefcase, Calculator, Calendar, Camera,
  Car, Check, CheckCircle, ChevronDown, ChevronLeft, ChevronRight,
  ChevronUp, Circle, Clipboard, Clock, Cloud, Coffee,
  Copy, Cpu, CreditCard, DollarSign, Download, ExternalLink,
  Eye, EyeOff, FileText, Flag, Folder, Gift,
  Globe, GraduationCap, Hash, Headphones, Heart, HelpCircle,
  Home, Hourglass, Image, Info, Key, Laptop,
  Lightbulb, Link, Lock, Mail, MapPin, Mic,
  Minus, Monitor, Moon, Music, Pencil, Percent,
  Phone, PieChart, Plane, Play, Pause, Plus,
  Printer, RefreshCw, RotateCcw, Save, Search, Send,
  Settings, Share2, Shield, ShoppingCart, Smartphone,
  Square, Star, Sun, Tablet, Tag, Target,
  Timer, Trash2, TrendingUp, Triangle, Umbrella, Unlock,
  Upload, User, Users, Video, Wifi, XCircle, Zap,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

export function renderIcon(name: string, className?: string) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

type Props = {
  isOpen: boolean;
  selectedIcon: string;
  onConfirm: (icon: string) => void;
  onClose: () => void;
};

export default function IconPickerModal({
  isOpen,
  selectedIcon,
  onConfirm,
  onClose,
}: Props) {
  const [search, setSearch] = React.useState("");
  const [tempSelected, setTempSelected] = React.useState(selectedIcon);

  React.useEffect(() => {
    if (isOpen) {
      setTempSelected(selectedIcon);
      setSearch("");
    }
  }, [isOpen, selectedIcon]);

  const filtered = React.useMemo(
    () => ICON_NAMES.filter((n) => n.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000]">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="flex max-h-[85vh] w-full max-w-[500px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                {renderIcon(tempSelected || "AtSign", "h-5 w-5")}
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-slate-900">Select Icon</h2>
                <p className="text-xs text-slate-500">Choose an icon for your event</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-xl text-slate-500 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search */}
          <div className="px-5 pb-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search icons..."
                className="h-10 w-full rounded-xl border border-slate-200 pl-9 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              />
            </div>
          </div>

          {/* Icon grid */}
          <div className="flex-1 overflow-y-auto px-5 pb-4">
            <div className="grid grid-cols-8 gap-1.5">
              {filtered.map((name) => {
                const active = tempSelected === name;
                return (
                  <button
                    key={name}
                    type="button"
                    title={name}
                    onClick={() => setTempSelected(name)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                      active
                        ? "bg-[#1363FF] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {renderIcon(name, "h-5 w-5")}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl border border-slate-200 px-5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm(tempSelected);
                onClose();
              }}
              className="h-10 rounded-xl bg-[#1363FF] px-5 text-sm font-semibold text-white hover:opacity-90"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
