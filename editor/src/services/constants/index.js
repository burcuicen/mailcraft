export const STORAGE = {
  TEMPLATE: "stripoTemplate",
};

export const SCRIPT = {
  ID: "stripoScript",
  URL: "https://plugins.stripo.email/static/latest/stripo.js",
};

export const API = {
  AUTH_URL: "https://plugins.stripo.email/api/v1/auth",
};

export const TEMPLATE_URLS = {
  html: "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Basic-Templates/New-editor-template/New-editor-template.html",
  css: "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Basic-Templates/New-editor-template/New-editor-template.css",
};
export const TEMPLATES_BY_CATEGORY = [
  {
    category: "Cars",
    templates: [
      {
        name: "Father's Day",
        html: "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Cars/Fathers-day-newsletter/Fathers-Day.html",
        css: "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Cars/Fathers-day-newsletter/Fathers-Day.css",
        thumbnail:
          "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Cars/Fathers-day-newsletter/Fathers-Day.png",
      },
      {
        name: "Promo",
        html: "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Cars/Promo-newsletter/Promo-newsletter.html",
        css: "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Cars/Promo-newsletter/Promo-newsletter.css",
        thumbnail:
          "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Cars/Promo-newsletter/Promo-newsletter.png",
      },
      {
        name: "Trigger",
        html: "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Cars/Trigger-newsletter/Trigger-newsletter.html",
        css: "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Cars/Trigger-newsletter/Trigger-newsletter.css",
        thumbnail:
          "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Cars/Trigger-newsletter/Trigger-newsletter.png",
      },
    ],
  },
  {
    category: "Fashion",
    templates: [
      {
        name: "Black Friday",
        html: "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Fashion/Black-friday/Black-friday.html",
        css: "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Fashion/Black-friday/Black-friday.css",
        thumbnail:
          "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Fashion/Black-friday/Black-friday.png",
      },
      {
        name: "Promo",
        html: "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Fashion/Promo-newsletter/Promo-newsletter.html",
        css: "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Fashion/Promo-newsletter/Promo-newsletter.css",
        thumbnail:
          "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Fashion/Promo-newsletter/Promo-newsletter.png",
      },
      {
        name: "Trigger",
        html: "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Fashion/Trigger-newsletter/Trigger-newsletter.html",
        css: "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Fashion/Trigger-newsletter/Trigger-newsletter.css",
        thumbnail:
          "https://raw.githubusercontent.com/ardas/stripo-plugin/refs/heads/master/Public-Templates/Custom-Templates/Fashion/Trigger-newsletter/Trigger-newsletter.png",
      },
    ],
  },
];

export const EDITOR_CONFIG = {
  containers: {
    settingsId: "stripoSettingsContainer",
    previewId: "stripoPreviewContainer",
  },
  buttons: {
    codeEditor: "codeEditor",
    undo: "undoButton",
    redo: "redoButton",
    historyLink: "changeHistoryLink",
  },
  default: {
    userFullName: "Demo User",
  },
};
