

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.5998430c.js","_app/immutable/chunks/index.f2f7f558.js","_app/immutable/chunks/stores.c91dda63.js","_app/immutable/chunks/singletons.80a2bf0b.js"];
export const stylesheets = ["_app/immutable/assets/0.55810c41.css"];
export const fonts = [];
