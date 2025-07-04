import {
  BookOpen,
  FlaskConical,
  BriefcaseMedical,
  Users,
  Navigation,
  Footprints,
} from "lucide-react";

const topLocations = [
  {
    name: "Laboratorio 1",
    icon: FlaskConical,
    colors: "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100",
  },
  {
    name: "Laboratorio 2",
    icon: FlaskConical,
    colors:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100",
  },
  {
    name: "Oficina 1",
    icon: BriefcaseMedical,
    colors: "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100",
  },
  {
    name: "Sala de Estudio",
    icon: BookOpen,
    colors:
      "bg-purple-100 text-purple-700 dark:bg-purple-700 dark:text-purple-100",
  },
  {
    name: "Aula 101",
    icon: Users,
    colors: "bg-amber-100 text-amber-700 dark:bg-amber-700 dark:text-amber-100",
  },
  {
    name: "Pasillo Principal",
    icon: Navigation,
    colors: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100",
  },
];

export default topLocations;