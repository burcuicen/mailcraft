export const stripoService = {
  loadScript() {
    return new Promise((resolve, reject) => {
      const existingScript = document.getElementById("stripoScript");
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.id = "stripoScript";
      script.type = "text/javascript";
      script.src = "https://plugins.stripo.email/static/latest/stripo.js";
      script.onload = resolve;
      script.onerror = () => reject(new Error("Failed to load Stripo script"));
      document.head.appendChild(script);
    });
  },

  async loadDemoTemplate() {
    try {
      const htmlResponse = await fetch(
        "https://raw.githubusercontent.com/ardas/stripo-plugin/master/Public-Templates/Basic-Templates/Trigger%20newsletter%20mockup/Trigger%20newsletter%20mockup.html"
      );
      const cssResponse = await fetch(
        "https://raw.githubusercontent.com/ardas/stripo-plugin/master/Public-Templates/Basic-Templates/Trigger%20newsletter%20mockup/Trigger%20newsletter%20mockup.css"
      );

      const html = await htmlResponse.text();
      const css = await cssResponse.text();

      return { html, css };
    } catch (error) {
      console.error("Failed to load template:", error);
      throw error;
    }
  },

  initializeEditor({ template, onHistoryChange }) {
    return window.Stripo.init({
      settingsId: "stripoSettingsContainer",
      previewId: "stripoPreviewContainer",
      codeEditorButtonId: "codeEditor",
      undoButtonId: "undoButton",
      redoButtonId: "redoButton",
      changeHistoryLinkId: "changeHistoryLink",
      html: template.html,
      css: template.css,
      apiRequestData: {
        emailId: `demo-${Date.now()}`,
      },
      userFullName: "Demo User",
      versionHistory: {
        changeHistoryLinkId: "changeHistoryLink",
        onInitialized: onHistoryChange,
      },
      getAuthToken: async (callback) => {
        try {
          const response = await fetch(
            "https://plugins.stripo.email/api/v1/auth",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                pluginId: process.env.STRIPO_PLUGIN_ID,
                secretKey: process.env.STRIPO_SECRET_KEY,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Auth request failed");
          }

          const data = await response.json();
          callback(data.token);
        } catch (error) {
          console.error("Auth error:", error);
          callback(null);
        }
      },
    });
  },

  getTemplate() {
    return new Promise((resolve) => {
      if (!window.StripoApi) {
        resolve({ html: null, css: null });
        return;
      }

      window.StripoApi.getTemplate((html, css) => {
        resolve({ html, css });
      });
    });
  },

  compileEmail() {
    return new Promise((resolve, reject) => {
      if (!window.StripoApi) {
        reject(new Error("Stripo API not initialized"));
        return;
      }

      window.StripoApi.compileEmail((error, html, ampHtml) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({ html, ampHtml });
      });
    });
  },

  cleanup() {
    if (window.StripoApi) {
      window.StripoApi.stop();
    }
  },
};
