

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.f4e09562.js","_app/immutable/chunks/index.f2f7f558.js","_app/immutable/chunks/stores.c91dda63.js","_app/immutable/chunks/singletons.80a2bf0b.js"];
export const stylesheets = [];
export const fonts = [];
