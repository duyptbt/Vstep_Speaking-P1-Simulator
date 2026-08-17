import { AppTheme } from "../types";

export interface ThemeConfig {
  id: AppTheme;
  name: string;
  canvasBg: string;
  headerBg: string;
  headerBorder: string;
  cardBg: string;
  cardBorder: string;
  subCardBg: string;
  subCardBorder: string;
  textPrimary: string;
  textMuted: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  btnPrimary: string;
}

export const THEMES: Record<AppTheme, ThemeConfig> = {
  midnight: {
    id: "midnight",
    name: "Midnight Dark",
    canvasBg: "bg-slate-950 text-slate-100",
    headerBg: "bg-slate-900",
    headerBorder: "border-slate-800",
    cardBg: "bg-slate-900 border-slate-800 text-slate-100",
    cardBorder: "border-slate-800",
    subCardBg: "bg-slate-800/60",
    subCardBorder: "border-slate-700/60",
    textPrimary: "text-white",
    textMuted: "text-slate-400",
    accentText: "text-indigo-400",
    accentBg: "bg-indigo-500/20",
    accentBorder: "border-indigo-500/30",
    btnPrimary: "bg-indigo-600 hover:bg-indigo-500 text-white"
  },
  light: {
    id: "light",
    name: "Academy Light",
    canvasBg: "bg-slate-50 text-slate-900",
    headerBg: "bg-white",
    headerBorder: "border-slate-200",
    cardBg: "bg-white border-slate-200 text-slate-800 shadow-xs",
    cardBorder: "border-slate-200",
    subCardBg: "bg-slate-50",
    subCardBorder: "border-slate-200",
    textPrimary: "text-slate-800",
    textMuted: "text-slate-500",
    accentText: "text-blue-600",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-200",
    btnPrimary: "bg-blue-600 hover:bg-blue-700 text-white"
  },
  emerald: {
    id: "emerald",
    name: "Emerald Zen",
    canvasBg: "bg-zinc-950 text-zinc-100",
    headerBg: "bg-zinc-900",
    headerBorder: "border-zinc-800",
    cardBg: "bg-zinc-900 border-zinc-800 text-zinc-100",
    cardBorder: "border-zinc-800",
    subCardBg: "bg-emerald-950/40",
    subCardBorder: "border-emerald-800/40",
    textPrimary: "text-zinc-100",
    textMuted: "text-zinc-400",
    accentText: "text-emerald-400",
    accentBg: "bg-emerald-500/20",
    accentBorder: "border-emerald-500/30",
    btnPrimary: "bg-emerald-600 hover:bg-emerald-500 text-white"
  },
  sunset: {
    id: "sunset",
    name: "Sunset Twilight",
    canvasBg: "bg-neutral-950 text-neutral-100",
    headerBg: "bg-neutral-900",
    headerBorder: "border-neutral-800",
    cardBg: "bg-neutral-900 border-neutral-800 text-neutral-100",
    cardBorder: "border-neutral-800",
    subCardBg: "bg-amber-950/30",
    subCardBorder: "border-amber-800/30",
    textPrimary: "text-neutral-100",
    textMuted: "text-neutral-400",
    accentText: "text-amber-400",
    accentBg: "bg-amber-500/20",
    accentBorder: "border-amber-500/30",
    btnPrimary: "bg-amber-600 hover:bg-amber-500 text-white"
  }
};
