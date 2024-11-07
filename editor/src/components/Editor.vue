<template>
  <div class="stripo-editor">
    <div v-if="showNameModal" class="stripo-editor__modal">
      <div class="stripo-editor__modal-container">
        <div class="stripo-editor__modal-content">
          <h3 class="stripo-editor__modal-title">
            {{ editingTemplate ? "Update" : "Save" }} Template
          </h3>
          <input
            v-model="templateName"
            type="text"
            class="stripo-editor__modal-input"
            placeholder="Enter template name"
            @keyup.enter="confirmSave"
          />
          <div class="stripo-editor__modal-actions">
            <button
              class="stripo-editor__modal-button stripo-editor__modal-button--cancel"
              @click="showNameModal = false"
            >
              Cancel
            </button>
            <button
              class="stripo-editor__modal-button stripo-editor__modal-button--save"
              @click="confirmSave"
            >
              {{ editingTemplate ? "Update" : "Save" }} Template
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="stripo-editor__header">
      <div class="stripo-editor__tools">
        <div class="stripo-editor__tool-group">
          <button id="codeEditor" class="stripo-editor__tool-button">
            <span>Code Editor</span>
          </button>
        </div>

        <div class="stripo-editor__action-group">
          <button
            class="stripo-editor__action-button stripo-editor__action-button--save"
            @click="handleSave"
          >
            <span>{{ editingTemplate ? "Update" : "Save" }}</span>
          </button>
          <button
            class="stripo-editor__action-button stripo-editor__action-button--export"
            @click="handleExport"
            :disabled="isExporting"
          >
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>

    <div class="stripo-editor__workspace">
      <div class="stripo-editor__loading" v-if="isLoading">
        <div class="stripo-editor__spinner"></div>
        <span>Loading editor...</span>
      </div>

      <div class="stripo-editor__containers">
        <div id="stripoSettingsContainer" class="stripo-editor__settings"></div>
        <div id="stripoPreviewContainer" class="stripo-editor__preview"></div>
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
    customTemplate: {
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
      isExporting: false,
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
    customTemplate: {
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
      const template = await this.getTemplate();

      await stripoService.initializeEditor({
        template,
        onHistoryChange: this.handleHistoryChange,
      });
    },

    async getTemplate() {
      if (this.editingTemplate) return this.editingTemplate;

      if (this.customTemplate)
        return await stripoService.loadCustomTemplate(this.customTemplate);

      return await stripoService.loadTemplate();
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

        this.$emit("saved");
      }
    },

    async handleExport() {
      if (this.isExporting) return;

      this.isExporting = true;

      const result = await stripoService.exportTemplate();
      const blob = new Blob([result.html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "exported-template.html";
      a.click();

      this.isExporting = false;
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

<style lang="scss" scoped>
.stripo-editor {
  padding-right: 64px;
  padding-left: 64px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f9fa;

  &__header {
    margin-top: 40px;
    margin-bottom: 80px;

    padding: 16px;

    background-color: #ffffff;
    border-bottom: 1px solid #e9ecef;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &__tools {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  &__tool-group,
  &__action-group {
    display: flex;
    gap: 8px;
  }

  &__tool-button {
    height: 36px;

    display: flex;
    align-items: center;
    gap: 8px;

    padding: 0 15px;

    border: 1px solid #dee2e6;
    border-radius: 4px;
    background-color: #ffffff;

    color: #495057;
    cursor: pointer;

    transition: all 0.2s ease;

    position: relative;
    overflow: hidden;

    &:hover {
      background-color: #e9ecef;
    }

    &::after {
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

    &:active::after {
      width: 200px;
      height: 200px;
    }
  }

  &__action-button {
    cursor: pointer;

    height: 36px;

    display: flex;
    align-items: center;
    gap: 8px;

    padding: 0 15px;

    border-radius: 4px;

    font-weight: 500;

    border: none;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    &--save {
      background: linear-gradient(to right, #8b5cf6, #7c3aed);
      color: white;

      &:hover {
        transform: translateY(-1px);
        background: linear-gradient(to right, #7c3aed, #6d28d9);
      }
    }

    &--export {
      background: linear-gradient(to right, #6b7280, #4b5563);
      color: white;

      &:hover {
        transform: translateY(-1px);
        background: linear-gradient(to right, #4b5563, #374151);
      }
    }

    &:active {
      transform: translateY(1px);
    }
  }

  &__workspace {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  &__loading {
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
    gap: 16px;
    z-index: 1000;
  }

  &__spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  &__containers {
    display: flex;
    height: 100%;
  }

  &__settings {
    width: 400px;
    background-color: #ffffff;
    border-right: 1px solid #e9ecef;
    overflow: auto;
  }

  &__preview {
    flex: 1;
    background-color: #ffffff;
    overflow: auto;
  }

  &__modal {
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

  &__modal-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 400px;
  }

  &__modal-content {
    padding: 24px;
  }

  &__modal-title {
    margin: 0 0 16px 0;
    font-size: 20px;
    font-weight: 600;
    color: #2d3748;
  }

  &__modal-input {
    width: 326px;
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    margin-bottom: 16px;
    font-size: 16px;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: #8b5cf6;
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    }
  }

  &__modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  &__modal-button {
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &--cancel {
      background-color: #fff;
      border: 1px solid #e2e8f0;
      color: #4a5568;

      &:hover {
        background-color: #f7fafc;
      }
    }

    &--save {
      background: linear-gradient(to right, #8b5cf6, #7c3aed);
      border: none;
      color: white;

      &:hover {
        background: linear-gradient(to right, #7c3aed, #6d28d9);
      }
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    &__tools {
      flex-direction: column;
      align-items: stretch;
    }

    &__tool-group,
    &__action-group {
      justify-content: center;
    }

    &__settings {
      width: 100%;
    }

    &__preview {
      display: none;
    }
  }
}
</style>
