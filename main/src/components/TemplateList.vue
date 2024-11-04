<template>
  <div class="template-list">
    <div class="template-list__header">
      <h2 class="template-list__title">Your Templates</h2>
    </div>
    <div class="template-list__content">
      <div v-if="templates.length === 0" class="template-list__empty">
        <p class="template-list__empty-text">
          No templates yet. Create your first template!
        </p>
      </div>
      <div v-else class="template-list__items">
        <div
          v-for="template in templates"
          :key="template.id"
          class="template-list__item"
        >
          <div class="template-list__info">
            <h3 class="template-list__name">{{ template.name }}</h3>
            <p class="template-list__date">
              Created on {{ formatDate(template.createdAt) }}
            </p>
          </div>
          <div class="template-list__actions">
            <button
              class="template-list__button template-list__button--edit"
              @click="$emit('edit', template)"
            >
              <span>Edit</span>
            </button>
            <button
              class="template-list__button template-list__button--delete"
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

<style lang="scss">
.template-list {
  &__header {
    padding-bottom: 16px;
    padding-left: 16px;

    border-bottom: 1px solid #e5e7eb;
  }

  &__title {
    color: #1f2937;
    font-size: 20px;
    font-weight: 600;

    margin: 0;
  }

  &__content {
    padding-top: 16px;
  }

  &__empty {
    text-align: center;
    padding: 16px;

    &-text {
      color: #6b7280;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 16px;

    border-radius: 8px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }

  &__info {
    flex: 1;
  }

  &__name {
    color: #1f2937;
    font-size: 16px;

    font-weight: 500;

    margin: 0 0 4px 0;
  }

  &__date {
    color: #6b7280;
    font-size: 14px;

    margin: 0;
  }

  &__actions {
    display: flex;
    gap: 8px;
  }

  &__button {
    padding: 8px 16px;

    border: none;
    border-radius: 6px;

    font-weight: 500;

    cursor: pointer;

    transition: all 0.2s;

    &--edit {
      background: linear-gradient(to right, #8b5cf6, #7c3aed);
      color: white;

      &:hover {
        background: linear-gradient(to right, #7c3aed, #6d28d9);
      }
    }

    &--delete {
      background-color: #ef4444;
      color: white;

      &:hover {
        background-color: #dc2626;
      }
    }
  }
}
</style>
