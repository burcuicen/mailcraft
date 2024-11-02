<!-- src/components/StripoEditor.vue -->
<template>
  <div class="editor-container">
    <div class="editor-header">
      <div class="editor-tools">
        <div class="tool-group">
          <button id="codeEditor" class="tool-button">
            <span>Code Editor</span>
          </button>
        </div>

        <div class="action-group">
          <button class="action-button save" @click="handleSave">
            <span>Save</span>
          </button>
          <button class="action-button export" @click="handleExport">
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>

    <div class="editor-workspace">
      <div class="loading-overlay" v-if="isLoading">
        <div class="spinner"></div>
        <span>Loading editor...</span>
      </div>

      <div class="stripo-containers">
        <div id="stripoSettingsContainer"></div>
        <div id="stripoPreviewContainer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { stripoService } from "@/services/stripoService";

export default {
  name: "StripoEditor",
  data() {
    return {
      editor: null,
      canUndo: false,
      canRedo: false,
      lastChange: "",
      isCodeEditorOpen: false,
      isLoading: true,
    };
  },

  async mounted() {
    try {
      await stripoService.loadScript();
      const template = await stripoService.loadTemplate();

      await stripoService.initializeEditor({
        template,
        onHistoryChange: (lastChangeInfoText) => {
          console.log("History change:", lastChangeInfoText);
          this.lastChange = lastChangeInfoText;
        },
        onButtonsInit: ({ canUndo, canRedo }) => {
          if (typeof canUndo !== "undefined") {
            this.canUndo = canUndo;
          }
          if (typeof canRedo !== "undefined") {
            this.canRedo = canRedo;
          }
        },
      });

      this.isLoading = false;

      // Event listener'ları ekle
      document.getElementById("undoButton").addEventListener("click", () => {
        if (window.StripoApi && window.StripoApi.undo) {
          window.StripoApi.undo();
        }
      });

      document.getElementById("redoButton").addEventListener("click", () => {
        if (window.StripoApi && window.StripoApi.redo) {
          window.StripoApi.redo();
        }
      });
    } catch (error) {
      console.error("Failed to initialize editor:", error);
    }
  },

  methods: {
    async handleSave() {
      try {
        const result = await stripoService.saveTemplate();
        console.log("Template saved:", result);
        alert("Template saved successfully!");
      } catch (error) {
        console.error("Save failed:", error);
        alert("Failed to save template!");
      }
    },

    async handleExport() {
      try {
        const result = await stripoService.exportTemplate();
        console.log("Template exported:", result);
      } catch (error) {
        console.error("Export failed:", error);
      }
    },
  },

  beforeUnmount() {
    document
      .getElementById("undoButton")
      ?.removeEventListener("click", () => {});
    document
      .getElementById("redoButton")
      ?.removeEventListener("click", () => {});
    stripoService.cleanup();
  },
};
</script>

<style scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f9fa;
}

.editor-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.editor-tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.tool-group,
.action-group {
  display: flex;
  gap: 0.5rem;
}

#undoButton,
#redoButton {
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  margin: 0 5px;
}

.tool-button,
.action-button {
  height: 36px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 15px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: #ffffff;
  color: #495057;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tool-button:hover:not(:disabled),
.action-button:hover {
  background-color: #e9ecef;
}

.tool-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f8f9fa;
}

.action-button.save {
  background-color: #28a745;
  border-color: #28a745;
  color: white;
}

.action-button.save:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.action-button.export {
  background-color: #6c757d;
  border-color: #6c757d;
  color: white;
}

.action-button.export:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.history-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  min-width: 200px;
}

.history-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.history-link:hover {
  text-decoration: underline;
}

.editor-workspace {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 1000;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.stripo-containers {
  display: flex;
  height: 100%;
}

#stripoSettingsContainer {
  width: 400px;
  background-color: #ffffff;
  border-right: 1px solid #e9ecef;
  overflow: auto;
}

#stripoPreviewContainer {
  flex: 1;
  background-color: #ffffff;
  overflow: auto;
}

@media (max-width: 768px) {
  .editor-tools {
    flex-direction: column;
    align-items: stretch;
  }

  .tool-group,
  .action-group {
    justify-content: center;
  }

  .history-container {
    justify-content: center;
    text-align: center;
    padding: 0.5rem 0;
  }

  #stripoSettingsContainer {
    width: 100%;
  }

  #stripoPreviewContainer {
    display: none;
  }
}
</style>
