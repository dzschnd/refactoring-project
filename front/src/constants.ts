import { TemplateInfo } from "./types";
import nezhnostPreview from "./assets/images/templates/nezhnost/preview.avif";
import navsegdaPreview from "./assets/images/templates/navsegda/preview.avif";
import pinkVibePreview from "./assets/images/templates/pinkVibe/preview.avif";
import minimalismPreview from "./assets/images/templates/minimalism/preview.avif";

export const MIN_SCREEN_WIDTH = 360;
export const SM_SCREEN_WIDTH = 760;
export const MD_SCREEN_WIDTH = 1279;

export const telegramLink = "#";
export const whatsappLink = "#";

export const defaultTemplateName = "nezhnost";

export const templates: TemplateInfo[] = [
  {
    name: "navsegda",
    displayedName: "Навсегда",
    link: "/templates/navsegda",
    price: 3500,
    previewImage: navsegdaPreview,
  },
  {
    name: "pinkVibe",
    displayedName: "Pink Vibe",
    link: "/templates/pinkVibe",
    price: 3500,
    previewImage: pinkVibePreview,
  },
  {
    name: "minimalism",
    displayedName: "Минимализм",
    link: "/templates/minimalism",
    price: 3500,
    previewImage: minimalismPreview,
  },
  {
    name: "nezhnost",
    displayedName: "Нежность",
    link: "/templates/nezhnost",
    price: 4000,
    previewImage: nezhnostPreview,
  },
  {
    name: "red_velvet",
    displayedName: "Red Velvet",
    link: "/templates/red-velvet",
    price: 3500,
    previewImage: nezhnostPreview,
  },
  {
    name: "test",
    displayedName: "TEST",
    link: "/templates/test",
    price: 500,
    previewImage: nezhnostPreview,
  },
];
