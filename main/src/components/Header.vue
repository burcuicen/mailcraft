<template>
  <header class="header">
    <div class="header__container">
      <div class="header__content">
        <div class="brand" @click="$emit('go-back')">
          <h1 class="brand__title">Mail Craft</h1>
          <p class="brand__subtitle">Email Template Manager</p>
        </div>
        <div class="header__actions">
          <button
            v-if="showEditor"
            class="header__action"
            @click="$emit('go-back')"
          >
            <span class="header__action-icon">⌂</span>
            Back To Home
          </button>
          <button
            v-else
            class="header__action"
            @click="$emit('create-template')"
          >
            <span class="header__action-icon">+</span>
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

<style lang="scss">
.header {
  background: linear-gradient(to right, #8b5cf6, #f97316);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &__content {
    height: 120px;

    padding-right: 64px;
    padding-left: 64px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__actions {
    display: flex;
    gap: 1rem;
  }
  &__action {
    cursor: pointer;

    display: flex;
    align-items: center;
    gap: 12px;

    padding: 12px 16px;

    background-color: white;
    border: none;
    border-radius: 8px;

    color: #8b5cf6;

    font-weight: 600;

    transition: all 0.2s ease;

    &:hover {
      background-color: #f3f4f6;
    }
    &-icon {
      font-size: 21px;
      font-weight: 700;
    }
  }
}

.brand {
  cursor: pointer;

  &__title {
    font-size: 32px;
    font-weight: 700;

    color: white;
    margin: 0;
  }
  &__subtitle {
    color: rgba(255, 255, 255, 0.9);

    margin: 1px 0 0 0;
    font-size: 16px;
  }
}
</style>
