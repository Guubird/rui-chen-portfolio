import {
  BrainCircuit,
  Command,
  Cpu,
  Eye,
  Layers3,
  NotebookTabs,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Project = {
  title: string;
  kicker: string;
  description: string;
  image?: string;
  stats: string[];
  bullets: string[];
  tags: string[];
  icon: LucideIcon;
};

export const projects: Project[] = [
  {
    title: "WorkTrace",
    kicker: "Local-first macOS work memory",
    description:
      "A privacy-preserving macOS system that compresses everyday computer activity into meaningful work history: Sessions, Missions, Timeline, Story, Patterns, Memory, and future Reflection.",
    image: "/assets/evidence/worktrace.png",
    stats: ["macOS SwiftUI", "Local JSON", "MemoryBook"],
    bullets: [
      "Compresses app activity into deterministic layers instead of collecting raw behavior forever.",
      "Keeps AI out of the current implementation and reserves future reflection for compressed Memory only.",
      "Rejects surveillance patterns: no network, screenshots, clipboard reads, browser history, or file-content reading.",
    ],
    tags: ["SwiftUI", "Local-first", "Memory systems", "AI-ready"],
    icon: BrainCircuit,
  },
  {
    title: "ClipDock",
    kicker: "Intentional personal resource dock",
    description:
      "A native macOS utility for saving and reusing useful links, text snippets, prompt snippets, and shell commands without becoming an automatic history tracker.",
    image: "/assets/evidence/clipdock.png",
    stats: ["Menu bar", "Quick Add", "Trash restore"],
    bullets: [
      "Supports Link, Text, Prompt, and Command items with search, type filters, sorting, copy/open actions, and local usage counts.",
      "Includes a compact Quick Add floating window and menu bar controls.",
      "Uses explicit user action for saving; future clipboard detection should ask before storing anything.",
    ],
    tags: ["Swift", "SwiftUI", "Productivity", "macOS"],
    icon: NotebookTabs,
  },
  {
    title: "VisionOS / AR Billiards Assistant",
    kicker: "Spatial computing concept",
    description:
      "A Vision Pro / AR assistant concept for mapping a billiards table, understanding spatial geometry, and helping visualize trajectory decisions in physical space.",
    stats: ["VisionOS", "AR mapping", "Trajectory aid"],
    bullets: [
      "Explores how real-world surfaces can become computational interfaces.",
      "Frames AR as an assistive layer, not a replacement for player skill.",
      "Connects spatial perception, interaction design, and practical computer vision thinking.",
    ],
    tags: ["VisionOS", "AR", "Spatial UI", "Interactive systems"],
    icon: Eye,
  },
  {
    title: "SURF / XJTLU Research",
    kicker: "Research-backed experimentation",
    description:
      "School-winning Summer Undergraduate Research Fellowship experience, supported by award evidence and university promotion materials.",
    image: "/assets/evidence/xjtlu-surf-award.jpg",
    stats: ["SURF", "XJTLU", "Research"],
    bullets: [
      "Worked in a research context with a team and academic supervision.",
      "Connected immersive interfaces, game/AR thinking, and technical prototyping.",
      "Public university promotion screenshots are included as supporting evidence.",
    ],
    tags: ["Research", "Immersive systems", "Prototype", "Team"],
    icon: Sparkles,
  },
];

export const stackGroups = [
  {
    title: "Native macOS",
    icon: Command,
    summary: "Swift interfaces, menu bar behavior, lightweight utilities, and local-first app structure.",
    items: ["Swift / SwiftUI", "Menu bar utilities", "Local-first apps"],
  },
  {
    title: "AI-native tools",
    icon: BrainCircuit,
    summary: "Work memory, prompt workflows, and reflection systems designed around compressed context.",
    items: ["Work memory", "Prompt workflows", "Reflection systems"],
  },
  {
    title: "Web / Creative frontend",
    icon: Layers3,
    summary: "High-contrast interactive sites with typed React systems, motion, and realtime 3D.",
    items: ["React", "TypeScript", "Three.js", "Framer Motion"],
  },
  {
    title: "Spatial computing",
    icon: Eye,
    summary: "VisionOS and AR concepts that map physical space into useful interface layers.",
    items: ["VisionOS / AR", "Table mapping", "Billiards assistant concept"],
  },
  {
    title: "Research & foundations",
    icon: Cpu,
    summary: "Academic research exposure and technical fundamentals supporting future systems work.",
    items: ["CUDA Python", "SURF research", "TOEFL"],
  },
];

export const evidence = [
  {
    title: "NVIDIA CUDA Python",
    detail: "Certificate of Competency in Fundamentals of Accelerated Computing with CUDA Python.",
    src: "/assets/evidence/nvidia-cuda-certificate.jpg",
    alt: "NVIDIA CUDA Python certificate",
  },
  {
    title: "XJTLU SURF Winner",
    detail: "School Winner of Summer Undergraduate Research Fellowship.",
    src: "/assets/evidence/xjtlu-surf-award.jpg",
    alt: "XJTLU SURF school winner certificate",
  },
  {
    title: "TOEFL / MyBest",
    detail: "English proficiency evidence for international technical communication.",
    src: "/assets/evidence/toefl-score.jpg",
    alt: "TOEFL MyBest score evidence",
  },
];

export const surfScreens = [
  "/assets/evidence/surf-promo-1.png",
  "/assets/evidence/surf-promo-2.png",
  "/assets/evidence/surf-promo-3.png",
  "/assets/evidence/surf-promo-4.png",
  "/assets/evidence/surf-promo-5.png",
];
