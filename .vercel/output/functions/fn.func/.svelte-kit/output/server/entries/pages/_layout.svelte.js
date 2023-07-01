import { c as create_ssr_component, b as subscribe } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
const app = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "nav.svelte-1fnrmz8 a.svelte-1fnrmz8{padding:0 1em;text-decoration:none;color:white;font-family:'Bebas Neue', sans-serif}nav.svelte-1fnrmz8.svelte-1fnrmz8{background-color:#26282B;padding:10px;height:4%;display:flex;align-items:center;border-bottom:#222223 3px solid}nav.svelte-1fnrmz8 ul.svelte-1fnrmz8{list-style-type:none;display:flex;flex-wrap:nowrap;overflow:hidden;padding-inline-start:0;justify-content:right;padding-top:8px}nav.svelte-1fnrmz8 li.svelte-1fnrmz8{letter-spacing:1px;font-size:1.8em;display:inline;background:none;margin-inline:10px;padding:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-radius:10px}.selected.svelte-1fnrmz8.svelte-1fnrmz8{text-decoration:underline white solid 2px;text-underline-offset:6px}nav.svelte-1fnrmz8 a.svelte-1fnrmz8:hover{color:red}nav.svelte-1fnrmz8 h2.svelte-1fnrmz8{font-family:Impact, serif;font-size:2.3em;margin:5px 3em 0 3em;font-style:italic;color:white}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap" rel="stylesheet">


<nav id="nav" class="svelte-1fnrmz8"><h2 class="svelte-1fnrmz8">Smash Mapping</h2>
    <ul id="navigation" class="svelte-1fnrmz8"><li class="${["svelte-1fnrmz8", $page.url.pathname === "/" ? "selected" : ""].join(" ").trim()}"><a href="/" class="svelte-1fnrmz8">Home</a></li>
        <li class="${["svelte-1fnrmz8", $page.url.pathname === "/about" ? "selected" : ""].join(" ").trim()}"><a href="/about" class="svelte-1fnrmz8">About</a></li>
        <li class="${["svelte-1fnrmz8", $page.url.pathname === "/contact" ? "selected" : ""].join(" ").trim()}"><a href="/contact" class="svelte-1fnrmz8">Contact</a></li></ul></nav>

${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
