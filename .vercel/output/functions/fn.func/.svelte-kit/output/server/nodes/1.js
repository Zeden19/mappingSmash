

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.01a69956.js","_app/immutable/chunks/index.f2f7f558.js","_app/immutable/chunks/stores.85584fb5.js","_app/immutable/chunks/singletons.bda8e594.js"];
export const stylesheets = [];
export const fonts = [];
