<template>
  <header class="header">
    <div class="header-container">
      <div class="header-content">
        <div class="brand" @click="$emit('go-back')">
          <h1 class="brand-title">MailCraft</h1>
          <p class="brand-subtitle">Email Template Manager</p>
        </div>
        <div class="header-actions">
          <button
            v-if="showEditor"
            class="create-button"
            @click="$emit('go-back')"
          >
            <span class="button-icon">⌂</span>
            Back To Home
          </button>
          <button
            v-else
            class="create-button"
            @click="$emit('create-template')"
          >
            <span class="button-icon">+</span>
            Create Template
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  props: {
    showEditor: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.header {
  background: linear-gradient(to right, #8b5cf6, #f97316);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.header-content {
  height: 120px;

  padding-right: 64px;
  padding-left: 64px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-actions {
  display: flex;
  gap: 1rem;
}

.brand {
  cursor: pointer;
}

.brand-title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.brand-subtitle {
  color: rgba(255, 255, 255, 0.9);
  margin: 0.25rem 0 0 0;
  font-size: 0.95rem;
}

.create-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: #8b5cf6;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.create-button:hover {
  background-color: #f3f4f6;
  transform: translateY(-1px);
}

.button-icon {
  font-size: 1.25rem;
  font-weight: bold;
}

@media (max-width: 640px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .brand-title {
    font-size: 1.75rem;
  }

  .create-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
