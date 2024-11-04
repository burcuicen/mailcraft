import { EDITOR_CONFIG, API } from "../constants";

export const createEditorConfig = (template, onHistoryChange) => ({
  ...EDITOR_CONFIG.containers,
  codeEditorButtonId: EDITOR_CONFIG.buttons.codeEditor,
  undoButtonId: EDITOR_CONFIG.buttons.undo,
  redoButtonId: EDITOR_CONFIG.buttons.redo,
  changeHistoryLinkId: EDITOR_CONFIG.buttons.historyLink,
  html: template.html,
  css: template.css,
  apiRequestData: {
    emailId: `demo-${Date.now()}`,
  },
  userFullName: EDITOR_CONFIG.default.userFullName,
  versionHistory: {
    changeHistoryLinkId: EDITOR_CONFIG.buttons.historyLink,
    onInitialized: onHistoryChange,
  },
  notifications: {
    success: function (message) {
      console.log("Success:", message);
    },
    error: function (message) {
      console.error("Error:", message);
    },
  },
  getAuthToken: createAuthTokenHandler(),
});

function createAuthTokenHandler() {
  return async function (callback) {
    const response = await fetch(API.AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pluginId: process.env.STRIPO_PLUGIN_ID,
        secretKey: process.env.STRIPO_SECRET_KEY,
      }),
    });

    if (!response.ok) return callback(null);

    const data = await response.json();
    callback(data.token);
  };
}
