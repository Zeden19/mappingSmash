import { c as create_ssr_component } from "../../../chunks/index.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h2.svelte-joqoq1{text-align:center;letter-spacing:1px;font-family:'Impact', sans-serif;font-size:3em;color:white;font-style:italic;background-color:#2c343c;padding:10px;margin:5px 2em 0}p.svelte-joqoq1{text-align:left;color:white;background-color:#2c343c;height:fit-content(100%);padding:10px;margin:10px 1em;overflow:hidden}a.svelte-joqoq1{color:red;background:none;text-decoration:underline 0.15em #FF000000;transition:text-decoration-color 300ms;text-underline-offset:5px}a.svelte-joqoq1:hover{color:#c40707;background:none;text-decoration-color:#FF0000FF}img.svelte-joqoq1{float:right;border:black solid 3px;margin-right:5px;margin-left:10px}body.svelte-joqoq1{background-color:#26282B;height:100vh}.svelte-joqoq1{margin:0;padding:0;background-color:#26282B}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { activePage } = $$props;
  if ($$props.activePage === void 0 && $$bindings.activePage && activePage !== void 0)
    $$bindings.activePage(activePage);
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-pyagfm_START -->${$$result.title = `<title>Smash Mapping: About</title>`, ""}<!-- HEAD_svelte-pyagfm_END -->`, ""}

<body class="svelte-joqoq1"><h2 class="svelte-joqoq1">About</h2>

<p class="svelte-joqoq1">A while back when I first moved out for my first year at university, I was looking for local Smash bros tournaments
    to attend. What I found out was that there was extreme difficulty finding in person tournaments, there was no way
    to just &quot;see&quot; tournaments in your area. I eventually found my local scene but that difficulty always stuck with me.
    <br class="svelte-joqoq1"><br class="svelte-joqoq1">

    <img height="70%" width="65%" src="example.png" alt="example-image" class="svelte-joqoq1">
    At Smash Mapping, the goal is to make finding in-person tournaments far easier than current methods. Smash Mapping
    physically maps tournaments that are listed on <a target="_blank" href="https://www.start.gg/" class="svelte-joqoq1">Start.gg</a> so you
    can easily see what tournaments are near you. By using the filters, you can easily search for tournaments that you
    specifically want, when you want. <br class="svelte-joqoq1"><br class="svelte-joqoq1">


    But this doesn&#39;t only help individuals looking for tournaments, it also helps <b class="svelte-joqoq1">tournament organizers</b>. The
    whole reason why its so hard to find tournaments is because organizers don&#39;t have a good way to show their
    tournaments to the public. Hopefully, if Smash Mapping becomes widespread, tournament organizers won&#39;t have to worry
    about advertising tournaments, people can just use Smash Mapping and find it themselves. Easy! <br class="svelte-joqoq1"><br class="svelte-joqoq1">

    <b class="svelte-joqoq1">Smash Mapping is currently in beta, so there may (and probably will) be bugs. If you find any, please report them
        to me by <a style="cursor: pointer" href="/contact" class="svelte-joqoq1">contacting.</a></b></p>

</body>`;
});
export {
  Page as default
};
