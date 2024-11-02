// src/models/template.js
export class Template {
  constructor(name = "", html = "", css = "") {
    this.id = Date.now();
    this.name = name;
    this.html = html;
    this.css = css;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}
