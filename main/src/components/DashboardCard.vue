<template>
  <div class="dashboard-card">
    <h3 class="dashboard-card__title">{{ title }}</h3>
    <p class="dashboard-card__value">{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: "DashboardCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.dashboard-card {
  background-color: #ffffff;
  padding: 32px;

  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  &__title {
    color: #6b7280;

    font-size: 0.875rem;
    font-weight: 500;

    margin: 0 0 0.5rem 0;
  }
  &__value {
    color: #8b5cf6;

    font-size: 1.5rem;
    font-weight: 700;

    margin: 0;
  }
}
</style>
