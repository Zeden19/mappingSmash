export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["example.png","favicon.png","filter.png","markers/blue-marker.png","markers/green-marker.png","markers/grey-marker.png","markers/purple-marker.png","markers/red-marker.png","markers/yellow-marker.png","outlook.png","questionmark.png","reimu-standing.gif","reimu.gif","tournament-card-icons/clock.png","tournament-card-icons/map-marker.png","tournament-card-icons/people.png","tournaments.png"]),
	mimeTypes: {".png":"image/png",".gif":"image/gif"},
	_: {
		client: {"start":"_app/immutable/entry/start.9c151322.js","app":"_app/immutable/entry/app.978233c1.js","imports":["_app/immutable/entry/start.9c151322.js","_app/immutable/chunks/index.f2f7f558.js","_app/immutable/chunks/singletons.f81e2d62.js","_app/immutable/entry/app.978233c1.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.f2f7f558.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js')
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
};
