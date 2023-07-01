

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.809e1a08.js","_app/immutable/chunks/index.f2f7f558.js","_app/immutable/chunks/stores.e183caf5.js","_app/immutable/chunks/singletons.de60c474.js"];
export const stylesheets = ["_app/immutable/assets/0.55810c41.css"];
export const fonts = [];
