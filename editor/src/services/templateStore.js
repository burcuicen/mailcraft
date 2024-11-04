export const templateStore = {
  STORAGE_KEY: "mailcraft_templates",

  getAllTemplates() {
    const templates = localStorage.getItem(this.STORAGE_KEY);
    return templates ? JSON.parse(templates) : [];
  },

  saveTemplate(template) {
    const templates = this.getAllTemplates();

    const index = templates.findIndex((t) => t.id === template.id);

    if (index !== -1) {
      template.updatedAt = new Date().toISOString();
      templates[index] = template;
    } else {
      templates.push(template);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(templates));
    return template;
  },

  deleteTemplate(id) {
    const templates = this.getAllTemplates();
    const filtered = templates.filter((t) => t.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  },
};
