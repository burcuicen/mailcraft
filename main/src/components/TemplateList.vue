<!-- src/components/TemplateList.vue -->
<template>
  <div class="template-list">
    <div class="list-header">
      <h2 class="list-title">Your Templates</h2>
    </div>
    <div class="list-content">
      <div v-if="templates.length === 0" class="empty-state">
        <p>No templates yet. Create your first template!</p>
      </div>
      <div v-else>
        <div
          v-for="template in templates"
          :key="template.id"
          class="template-item"
        >
          <div class="template-info">
            <h3 class="template-name">{{ template.name }}</h3>
            <p class="template-date">
              Created on {{ formatDate(template.createdAt) }}
            </p>
          </div>
          <div class="template-actions">
            <button class="action-btn edit" @click="$emit('edit', template)">
              <span>Edit</span>
            </button>
            <button
              class="action-btn delete"
              @click="$emit('delete', template)"
            >
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TemplateList",
  props: {
    templates: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<style scoped>
.template-list {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.list-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.list-title {
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.list-content {
  padding: 1rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.template-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s;
}

.template-item:last-child {
  border-bottom: none;
}

.template-item:hover {
  background-color: #f9fafb;
}

.template-info {
  flex: 1;
}

.template-name {
  color: #1f2937;
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
}

.template-date {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.template-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn.edit {
  background: linear-gradient(to right, #8b5cf6, #7c3aed);
  color: white;
}

.action-btn.edit:hover {
  background: linear-gradient(to right, #7c3aed, #6d28d9);
}

.action-btn.delete {
  background-color: #ef4444;
  color: white;
}

.action-btn.delete:hover {
  background-color: #dc2626;
}
</style>
