// src/services/constants/index.js
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
  html: "https://raw.githubusercontent.com/ardas/stripo-plugin/master/Public-Templates/Basic-Templates/Trigger%20newsletter%20mockup/Trigger%20newsletter%20mockup.html",
  css: "https://raw.githubusercontent.com/ardas/stripo-plugin/master/Public-Templates/Basic-Templates/Trigger%20newsletter%20mockup/Trigger%20newsletter%20mockup.css",
};

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
