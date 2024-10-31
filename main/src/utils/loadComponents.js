export default async (componentName) => {
  const module = await import("editor/components");
  return module[componentName];
};
