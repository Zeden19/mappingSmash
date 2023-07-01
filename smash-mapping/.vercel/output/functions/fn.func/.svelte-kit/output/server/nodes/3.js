

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.38e404d9.js","_app/immutable/chunks/index.f2f7f558.js"];
export const stylesheets = ["_app/immutable/assets/3.87955568.css"];
export const fonts = [];
