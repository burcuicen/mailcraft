<template>
  <div class="editor-container">
    <div v-if="showNameModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content">
          <h3 class="modal-title">
            {{ editingTemplate ? "Update" : "Save" }} Template
          </h3>
          <input
            v-model="templateName"
            type="text"
            class="modal-input"
            placeholder="Enter template name"
            @keyup.enter="confirmSave"
          />
          <div class="modal-actions">
            <button class="modal-button cancel" @click="showNameModal = false">
              Cancel
            </button>
            <button class="modal-button save" @click="confirmSave">
              {{ editingTemplate ? "Update" : "Save" }} Template
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="editor-header">
      <div class="editor-tools">
        <div class="tool-group">
          <button id="codeEditor" class="tool-button">
            <span>Code Editor</span>
          </button>
        </div>

        <div class="action-group">
          <button class="action-button save" @click="handleSave">
            <span>{{ editingTemplate ? "Update" : "Save" }}</span>
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

  props: {
    editingTemplate: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      editor: null,
      isLoading: true,
      showNameModal: false,
      templateName: "",
    };
  },

  watch: {
    editingTemplate: {
      immediate: true,
      handler(template) {
        if (template) {
          this.templateName = template.name;
        }
      },
    },
  },

  async mounted() {
    await this.setupEditor();
  },

  methods: {
    async setupEditor() {
      await this.loadEditorDependencies();
      await this.initializeEditorWithTemplate();
      this.startLoadingTimeout();
    },

    async loadEditorDependencies() {
      await stripoService.loadScript();
    },

    async initializeEditorWithTemplate() {
      const template =
        this.editingTemplate || (await stripoService.loadTemplate());
      await stripoService.initializeEditor({
        template,
        onHistoryChange: this.handleHistoryChange,
      });
    },

    startLoadingTimeout() {
      setTimeout(
        function () {
          this.isLoading = false;
        }.bind(this),
        2000
      );
    },

    async handleSave() {
      this.showNameModal = true;
    },

    async confirmSave() {
      if (!this.templateName.trim()) {
        alert("Please enter a template name");
        return;
      }

      const result = await stripoService.saveTemplate();
      if (result) {
        const savedTemplate = {
          id: this.editingTemplate?.id || Date.now(),
          name: this.templateName,
          html: result.html,
          css: result.css,
          createdAt:
            this.editingTemplate?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const templates = JSON.parse(localStorage.getItem("templates") || "[]");
        const existingIndex = templates.findIndex(
          (t) => t.id === savedTemplate.id
        );

        if (existingIndex !== -1) {
          templates[existingIndex] = savedTemplate;
        } else {
          templates.push(savedTemplate);
        }

        localStorage.setItem("templates", JSON.stringify(templates));
        this.showNameModal = false;
        this.showSuccessMessage(
          `Template ${this.editingTemplate ? "updated" : "saved"} successfully!`
        );
        this.$emit("saved");
      }
    },

    async handleExport() {
      const result = await stripoService.exportTemplate();
      if (result) {
        console.log("Template exported:", result);
      }
    },

    showSuccessMessage(message) {
      alert(message);
    },

    handleHistoryChange(lastChangeInfoText) {
      console.log("History change:", lastChangeInfoText);
    },
  },

  beforeUnmount() {
    stripoService.cleanup();
  },
};
</script>

<style scoped>
.editor-container {
  padding-right: 64px;
  padding-left: 64px;

  display: flex;
  flex-direction: column;
  height: 100vh;

  background-color: #f8f9fa;
}

.editor-header {
  padding-top: 1rem;

  background-color: #ffffff;
  border-bottom: 1px solid #e9ecef;
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

.tool-button {
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

  position: relative;

  overflow: hidden;
}

.tool-button:hover {
  background-color: #e9ecef;
}

.tool-button::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;

  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;

  transform: translate(-50%, -50%);
}

.tool-button:active::after {
  width: 200px;
  height: 200px;
}

.action-button {
  cursor: pointer;

  height: 36px;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0 15px;

  border-radius: 4px;

  font-weight: 500;

  border: none;
}

.action-button.save {
  background: linear-gradient(to right, #8b5cf6, #7c3aed);
  color: white;
}

.action-button.save:hover {
  transform: translateY(-1px);
  background: linear-gradient(to right, #7c3aed, #6d28d9);
}

.action-button.export {
  background: linear-gradient(to right, #6b7280, #4b5563);
  color: white;
}

.action-button.export:hover {
  transform: translateY(-1px);
  background: linear-gradient(to right, #4b5563, #374151);
}

.action-button:active {
  transform: translateY(1px);
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;
}

.modal-container {
  background: white;

  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  width: 90%;
  max-width: 400px;
}

.modal-content {
  padding: 1.5rem;
}

.modal-title {
  margin: 0 0 1rem 0;

  font-size: 1.25rem;
  font-weight: 600;

  color: #2d3748;
}

.modal-input {
  width: 326px;

  padding: 0.75rem;

  border: 1px solid #e2e8f0;
  border-radius: 4px;

  margin-bottom: 1rem;

  font-size: 1rem;
  transition: border-color 0.2s;
}

.modal-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.modal-button {
  padding: 0.5rem 1rem;

  border-radius: 4px;

  font-weight: 500;

  cursor: pointer;
  transition: all 0.2s;
}

.modal-button.cancel {
  background-color: #fff;
  border: 1px solid #e2e8f0;
  color: #4a5568;
}

.modal-button.cancel:hover {
  background-color: #f7fafc;
}

.modal-button.save {
  background: linear-gradient(to right, #8b5cf6, #7c3aed);
  border: none;
  color: white;
}

.modal-button.save:hover {
  background: linear-gradient(to right, #7c3aed, #6d28d9);
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

  #stripoSettingsContainer {
    width: 100%;
  }

  #stripoPreviewContainer {
    display: none;
  }
}
</style>
