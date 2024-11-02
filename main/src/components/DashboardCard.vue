<!-- src/components/DashboardCard.vue -->
<template>
  <div class="dashboard-card">
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-value">{{ value }}</p>
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

<style scoped>
.dashboard-card {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.dashboard-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
}

.card-value {
  color: #8b5cf6;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}
</style>
