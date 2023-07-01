export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["example.png","favicon.png","filter.png","markers/blue-marker.png","markers/green-marker.png","markers/grey-marker.png","markers/purple-marker.png","markers/red-marker.png","markers/yellow-marker.png","outlook.png","questionmark.png","reimu-standing.gif","reimu.gif","tournament-card-icons/clock.png","tournament-card-icons/map-marker.png","tournament-card-icons/people.png","tournaments.png"]),
	mimeTypes: {".png":"image/png",".gif":"image/gif"},
	_: {
		client: {"start":"_app/immutable/entry/start.772a808b.js","app":"_app/immutable/entry/app.0af2b279.js","imports":["_app/immutable/entry/start.772a808b.js","_app/immutable/chunks/index.f2f7f558.js","_app/immutable/chunks/singletons.bda8e594.js","_app/immutable/entry/app.0af2b279.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.f2f7f558.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
