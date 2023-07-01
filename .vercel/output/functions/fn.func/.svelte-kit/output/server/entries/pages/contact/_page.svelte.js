import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
const TwitterFollow_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: `a.svelte-xgunny{text-align:right;color:white;background-size:1.5em;font-weight:bold;text-decoration:none;background:#1DA1F2 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cpath fill='rgb(255, 255, 255)' class='cls-2' d='M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23'/%3E%3C/svg%3E") no-repeat 0 50%;border-radius:30px;display:inline-block;padding:0 15px;width:5em;height:2.2em;line-height:2}a.svelte-xgunny:hover{background-color:#1678af}`,
  map: null
};
const TwitterFollow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<a target="_blank" href="https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fpublish.twitter.com%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5EZedenZeder&screen_name=ZedenZeder" class="svelte-xgunny">Follow
</a>`;
});
const MailTo_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "a.svelte-gplrqn{font-weight:bold;text-decoration:none;color:white;margin-right:0}div.svelte-gplrqn{background-size:1.5em;background:#005ea2;border-radius:30px;padding:0 15px;width:6em;height:2.4em;line-height:2;display:flex;justify-content:right}div.svelte-gplrqn:hover{background-color:#002844FF}img.svelte-gplrqn{justify-content:left;margin-right:2em}",
  map: null
};
const MailTo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="svelte-gplrqn"><img alt="outlook" src="outlook.png" class="svelte-gplrqn">
    <a target="_blank" href="mailto:ashar562@uwo.ca" class="svelte-gplrqn">Mail</a>
</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "div.svelte-13jub4r{background-color:#2c343c;height:fit-content(100%);padding:10px;margin:10px 2em}h2.svelte-13jub4r{letter-spacing:1px;text-align:center;font-family:'Impact', sans-serif;font-size:50px;color:white;font-style:italic;background-color:#2c343c;margin:5px 2em 0;padding:10px}p.svelte-13jub4r{text-align:center;color:white}img.svelte-13jub4r{float:right;border:black solid 3px;margin-right:5px;margin-left:10px}body.svelte-13jub4r{background-color:#26282B;height:100vh}.svelte-13jub4r{margin:0;padding:0}.share-buttons.svelte-13jub4r{display:flex;justify-content:center;align-items:center;border:none;gap:10px}.reimu-div.svelte-13jub4r{display:flex;justify-content:center;align-items:center;border:none;margin-right:1.7em;margin-left:0}.reimu.svelte-13jub4r{border:none}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1ur5unx_START -->${$$result.title = `<title>Smash Mapping: Contact</title>`, ""}<!-- HEAD_svelte-1ur5unx_END -->`, ""}

<body class="svelte-13jub4r"><h2 class="svelte-13jub4r">Contact</h2>


<div class="svelte-13jub4r"><p class="svelte-13jub4r">Below you&#39;ll find links to contact me, please contact if you have bug reports, suggestions, or any other
        inquiries.</p>
    <br class="svelte-13jub4r">

    <p class="svelte-13jub4r">Twitter is my main form of contact, and its also where I post development updates, but you&#39;re more than welcome
        to contact me with any of the other methods</p>


    <div class="share-buttons svelte-13jub4r">${validate_component(TwitterFollow, "TwitterFollow").$$render($$result, {}, {}, {})}
        ${validate_component(MailTo, "MailTo").$$render($$result, {}, {}, {})}</div>

    <div class="reimu-div svelte-13jub4r"><img alt="reimu-gif" class="reimu svelte-13jub4r" src="reimu.gif">
        <img style="height: 200px; width: 200px" alt="reimu-standing-gif" class="reimu svelte-13jub4r" src="reimu-standing.gif"></div></div>

</body>`;
});
export {
  Page as default
};
