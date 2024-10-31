<template>
  <div class="stripo-editor-container">
    <div class="editor-controls">
      <div>
        <button id="undoButton" class="control-button" :disabled="!canUndo">
          Undo
        </button>
        <button id="redoButton" class="control-button" :disabled="!canRedo">
          Redo
        </button>
        <button id="codeEditor" class="control-button">Code editor</button>
        <span v-show="lastChange" class="history-container">
          Last change:
          <a id="changeHistoryLink" href="#">{{ lastChange }}</a>
        </span>
      </div>
      <div>
        <button class="control-button save" @click="handleSave">Save</button>
        <button class="control-button export" @click="handleExport">
          Export
        </button>
      </div>
    </div>

    <div class="editor-containers">
      <div id="stripoSettingsContainer">Loading...</div>
      <div id="stripoPreviewContainer"></div>
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
    };
  },

  async mounted() {
    try {
      await stripoService.loadScript();
      const template = await stripoService.loadDemoTemplate();

      stripoService.initializeEditor({
        template,
        onHistoryChange: (lastChangeInfoText) => {
          this.lastChange = lastChangeInfoText;
        },
      });
    } catch (error) {
      console.error("Failed to initialize editor:", error);
    }
  },

  methods: {
    async handleSave() {
      try {
        const result = await stripoService.getTemplate();
        console.log("Saving template:", result);
        this.$emit("save", result);
      } catch (error) {
        console.error("Save failed:", error);
      }
    },

    async handleExport() {
      try {
        const result = await stripoService.compileEmail();
        console.log("Exporting template:", result);
        this.$emit("export", result);
      } catch (error) {
        console.error("Export failed:", error);
      }
    },
  },

  beforeUnmount() {
    stripoService.cleanup();
  },
};
</script>

<style scoped>
.stripo-editor-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.editor-controls {
  background-color: #f5f5f5;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor-containers {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.control-button {
  padding: 8px 16px;
  margin: 0 4px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.control-button:hover {
  background: #f0f0f0;
}

.control-button.save,
.control-button.export {
  background: #b5e8b5;
}

.control-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

#stripoSettingsContainer {
  width: 400px;
  overflow: auto;
}

#stripoPreviewContainer {
  flex: 1;
  overflow: auto;
}

.history-container {
  margin-left: 10px;
}
</style>
