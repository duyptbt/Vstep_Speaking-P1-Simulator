import { AppTheme } from "../types";

export interface ThemeConfig {
  id: AppTheme;
  name: string;
  category: "light" | "dark";
  canvasBg: string;
  headerBg: string;
  headerBorder: string;
  cardBg: string;
  cardBorder: string;
  subCardBg: string;
  subCardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  btnPrimary: string;
  tabActive: string;
  tabInactive: string;
  boxBg: string;
  boxBorder: string;
  codeBg: string;
}

export const THEMES: Record<AppTheme, ThemeConfig> = {
  light: {
    id: "light",
    name: "Academy Light (Classic)",
    category: "light",
    canvasBg: "bg-slate-100/90 text-slate-800",
    headerBg: "bg-white",
    headerBorder: "border-slate-200",
    cardBg: "bg-white border-slate-200 text-slate-800 shadow-sm",
    cardBorder: "border-slate-200",
    subCardBg: "bg-slate-50",
    subCardBorder: "border-slate-200",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-700",
    textMuted: "text-slate-500",
    accentText: "text-blue-600",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-200",
    btnPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
    tabActive: "bg-blue-600 text-white shadow-sm",
    tabInactive: "bg-slate-200/80 text-slate-700 hover:bg-slate-300/80",
    boxBg: "bg-slate-50",
    boxBorder: "border-slate-200",
    codeBg: "bg-slate-100 text-slate-800 border-slate-200"
  },
  ivory: {
    id: "ivory",
    name: "Warm Ivory (Parchment)",
    category: "light",
    canvasBg: "bg-[#fbf9f4] text-stone-800",
    headerBg: "bg-[#ffffff]",
    headerBorder: "border-stone-200",
    cardBg: "bg-[#ffffff] border-stone-200/90 text-stone-800 shadow-sm",
    cardBorder: "border-stone-200",
    subCardBg: "bg-[#f8f5ed]",
    subCardBorder: "border-stone-200",
    textPrimary: "text-stone-900",
    textSecondary: "text-stone-700",
    textMuted: "text-stone-500",
    accentText: "text-amber-700",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-200",
    btnPrimary: "bg-amber-700 hover:bg-amber-800 text-white",
    tabActive: "bg-amber-700 text-white shadow-sm",
    tabInactive: "bg-stone-200/80 text-stone-700 hover:bg-stone-300/80",
    boxBg: "bg-[#f8f5ed]",
    boxBorder: "border-stone-200",
    codeBg: "bg-[#f2ece0] text-stone-800 border-stone-300"
  },
  nordic: {
    id: "nordic",
    name: "Nordic Frost (Clean Ice)",
    category: "light",
    canvasBg: "bg-[#f1f5f9] text-slate-800",
    headerBg: "bg-white",
    headerBorder: "border-cyan-100",
    cardBg: "bg-white border-cyan-100 text-slate-800 shadow-sm",
    cardBorder: "border-cyan-100",
    subCardBg: "bg-cyan-50/50",
    subCardBorder: "border-cyan-100",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-700",
    textMuted: "text-slate-500",
    accentText: "text-teal-700",
    accentBg: "bg-teal-50",
    accentBorder: "border-teal-200",
    btnPrimary: "bg-teal-600 hover:bg-teal-700 text-white",
    tabActive: "bg-teal-600 text-white shadow-sm",
    tabInactive: "bg-slate-200/80 text-slate-700 hover:bg-slate-300/80",
    boxBg: "bg-cyan-50/40",
    boxBorder: "border-cyan-100",
    codeBg: "bg-cyan-100/60 text-slate-800 border-cyan-200"
  },
  midnight: {
    id: "midnight",
    name: "Midnight Dark (Indigo)",
    category: "dark",
    canvasBg: "bg-slate-950 text-slate-100",
    headerBg: "bg-slate-900",
    headerBorder: "border-slate-800",
    cardBg: "bg-slate-900 border-slate-800 text-slate-100 shadow-md",
    cardBorder: "border-slate-800",
    subCardBg: "bg-slate-800/60",
    subCardBorder: "border-slate-700/60",
    textPrimary: "text-white",
    textSecondary: "text-slate-200",
    textMuted: "text-slate-400",
    accentText: "text-indigo-400",
    accentBg: "bg-indigo-500/20",
    accentBorder: "border-indigo-500/30",
    btnPrimary: "bg-indigo-600 hover:bg-indigo-500 text-white",
    tabActive: "bg-indigo-600 text-white shadow-sm",
    tabInactive: "bg-slate-800 text-slate-300 hover:bg-slate-700",
    boxBg: "bg-slate-800/60",
    boxBorder: "border-slate-700/60",
    codeBg: "bg-slate-950/80 text-slate-200 border-slate-800"
  },
  emerald: {
    id: "emerald",
    name: "Emerald Zen (Forest Dark)",
    category: "dark",
    canvasBg: "bg-zinc-950 text-zinc-100",
    headerBg: "bg-zinc-900",
    headerBorder: "border-zinc-800",
    cardBg: "bg-zinc-900 border-zinc-800 text-zinc-100 shadow-md",
    cardBorder: "border-zinc-800",
    subCardBg: "bg-emerald-950/40",
    subCardBorder: "border-emerald-800/40",
    textPrimary: "text-zinc-100",
    textSecondary: "text-zinc-200",
    textMuted: "text-zinc-400",
    accentText: "text-emerald-400",
    accentBg: "bg-emerald-500/20",
    accentBorder: "border-emerald-500/30",
    btnPrimary: "bg-emerald-600 hover:bg-emerald-500 text-white",
    tabActive: "bg-emerald-600 text-white shadow-sm",
    tabInactive: "bg-zinc-800 text-zinc-300 hover:bg-zinc-700",
    boxBg: "bg-emerald-950/30",
    boxBorder: "border-emerald-800/40",
    codeBg: "bg-zinc-950/80 text-zinc-200 border-zinc-800"
  },
  sunset: {
    id: "sunset",
    name: "Sunset Twilight (Amber Dark)",
    category: "dark",
    canvasBg: "bg-neutral-950 text-neutral-100",
    headerBg: "bg-neutral-900",
    headerBorder: "border-neutral-800",
    cardBg: "bg-neutral-900 border-neutral-800 text-neutral-100 shadow-md",
    cardBorder: "border-neutral-800",
    subCardBg: "bg-amber-950/30",
    subCardBorder: "border-amber-800/30",
    textPrimary: "text-neutral-100",
    textSecondary: "text-neutral-200",
    textMuted: "text-neutral-400",
    accentText: "text-amber-400",
    accentBg: "bg-amber-500/20",
    accentBorder: "border-amber-500/30",
    btnPrimary: "bg-amber-600 hover:bg-amber-500 text-white",
    tabActive: "bg-amber-600 text-white shadow-sm",
    tabInactive: "bg-neutral-800 text-neutral-300 hover:bg-neutral-700",
    boxBg: "bg-amber-950/30",
    boxBorder: "border-amber-800/30",
    codeBg: "bg-neutral-950/80 text-neutral-200 border-neutral-800"
  }
};

