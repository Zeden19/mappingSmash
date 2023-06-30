<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap" rel="stylesheet">
<script>
    import '../app.css'
    import {page} from "$app/stores";
</script>

<nav id="nav">
    <h2>Smash Mapping</h2>
    <ul id="navigation">
        <li class:selected="{$page.url.pathname === '/'}"><a href="/">Home</a></li>
        <li class:selected="{$page.url.pathname === '/about'}"><a href="/about">About</a></li>
        <li class:selected="{$page.url.pathname === '/contact'}"><a href="/contact">Contact</a></li>
    </ul>
</nav>

<slot/>


<style>
    nav a {
        padding: 0 1em;
        text-decoration: none;
        color: white;
        font-family: 'Bebas Neue', sans-serif;
    }

    nav {
        background-color: #26282B;
        padding: 10px;
        height: 4%;
        display: flex;
        align-items: center;
        border-bottom: #222223 3px solid;
    }

    nav ul {
        list-style-type: none;
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
        padding-inline-start: 0;
        justify-content: right;
        padding-top: 8px;
    }

    nav li {
        letter-spacing: 1px;
        font-size: 1.8em;
        display: inline;
        background: none;
        margin-inline: 10px;
        padding: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: 10px;
    }

    .selected {
        text-decoration: underline white solid 2px;
        text-underline-offset: 6px;
    }

    nav a:hover {
        color: red;
    }

    nav h2 {
        font-family: Impact, serif;
        font-size: 2.3em;
        margin: 5px 3em 0 3em;
        font-style: italic;
        color: white;
    }
</style>