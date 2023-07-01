

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.220363e6.js","_app/immutable/chunks/index.f2f7f558.js","_app/immutable/chunks/stores.85584fb5.js","_app/immutable/chunks/singletons.bda8e594.js"];
export const stylesheets = ["_app/immutable/assets/0.55810c41.css"];
export const fonts = [];
