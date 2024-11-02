// src/services/stripoService.js
import { STORAGE, SCRIPT, TEMPLATE_URLS } from "./constants";
import { createEditorConfig } from "./config/stripoConfig";

export const stripoService = {
  loadScript() {
    this.removeExistingScript();
    return this.appendNewScript();
  },

  removeExistingScript() {
    const existingScript = document.getElementById(SCRIPT.ID);
    if (existingScript) {
      existingScript.remove();
    }
  },

  appendNewScript() {
    return new Promise(function (resolve, reject) {
      const script = document.createElement("script");
      script.id = SCRIPT.ID;
      script.type = "text/javascript";
      script.src = SCRIPT.URL;
      script.onload = resolve;
      script.onerror = function () {
        reject(new Error("Failed to load Stripo script"));
      };
      document.head.appendChild(script);
    });
  },

  async loadTemplate() {
    const savedTemplate = this.getSavedTemplate();
    return savedTemplate || this.fetchDefaultTemplate();
  },

  getSavedTemplate() {
    const template = localStorage.getItem(STORAGE.TEMPLATE);
    return template ? JSON.parse(template) : null;
  },

  async fetchDefaultTemplate() {
    const [html, css] = await Promise.all([
      this.fetchTemplateContent(TEMPLATE_URLS.html),
      this.fetchTemplateContent(TEMPLATE_URLS.css),
    ]);
    return { html, css };
  },

  async fetchTemplateContent(url) {
    const response = await fetch(url);
    return response.text();
  },

  initializeEditor(options) {
    const config = createEditorConfig(
      options.template,
      options.onHistoryChange
    );
    return window.Stripo.init(config);
  },

  saveTemplate() {
    if (!this.isApiInitialized()) return null;
    return this.saveTemplateToStorage();
  },

  saveTemplateToStorage() {
    return new Promise(function (resolve) {
      window.StripoApi.getTemplate(function (html, css) {
        const template = { html, css };
        localStorage.setItem(STORAGE.TEMPLATE, JSON.stringify(template));
        resolve(template);
      });
    });
  },

  exportTemplate() {
    if (!this.isApiInitialized()) return null;
    return this.compileEmail();
  },

  compileEmail() {
    return new Promise(function (resolve) {
      window.StripoApi.compileEmail(function (error, html, ampHtml) {
        if (error) return resolve(null);
        resolve({ html, ampHtml });
      });
    });
  },

  isApiInitialized() {
    return !!window.StripoApi;
  },

  cleanup() {
    if (this.isApiInitialized()) {
      window.StripoApi.stop();
    }
  },
};
