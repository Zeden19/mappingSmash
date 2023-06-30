<script>
    export let activePage;

</script>


<svelte:head>
    <title>Smash Mapping: About</title>
</svelte:head>

<body>

<h2>About</h2>

<p>
    A while back when I first moved out for my first year at university, I was looking for local Smash bros tournaments
    to attend. What I found out was that there was extreme difficulty finding in person tournaments, there was no way
    to just "see" tournaments in your area. I eventually found my local scene but that difficulty always stuck with me.
    <br><br>

    <img height="70%" width="65%" src="example.png"
         alt="example-image">
    At Smash Mapping, the goal is to make finding in-person tournaments far easier than current methods. Smash Mapping
    physically maps tournaments that are listed on <a target="_blank" href="https://www.start.gg/">Start.gg</a> so you
    can easily see what tournaments are near you. By using the filters, you can easily search for tournaments that you
    specifically want, when you want. <br><br>


    But this doesn't only help individuals looking for tournaments, it also helps <b>tournament organizers</b>. The
    whole reason why its so hard to find tournaments is because organizers don't have a good way to show their
    tournaments to the public. Hopefully, if Smash Mapping becomes widespread, tournament organizers won't have to worry
    about advertising tournaments, people can just use Smash Mapping and find it themselves. Easy! <br><br>

    <b>Smash Mapping is currently in beta, so there may (and probably will) be bugs. If you find any, please report them
        to me by <a style="cursor: pointer" href="/contact">contacting.</a></b>
</p>

</body>


<style>
    h2 {
        text-align: center;
        letter-spacing: 1px;
        font-family: 'Impact', sans-serif;
        font-size: 3em;
        color: white;
        font-style: italic;
        background-color: #2c343c;
        padding: 10px;
        margin: 5px 2em 0;
    }

    p {
        text-align: left;
        color: white;
        background-color: #2c343c;
        height: fit-content(100%);
        padding: 10px;
        margin: 10px 1em;
        overflow: hidden;
    }

    a {
        color: red;
        background: none;
        text-decoration: underline 0.15em #FF000000;
        transition: text-decoration-color 300ms;
        text-underline-offset: 5px;
    }

    a:hover {
        color: #c40707;
        background: none;
        text-decoration-color: #FF0000FF;
    }

    img {
        float: right;
        border: black solid 3px;
        margin-right: 5px;
        margin-left: 10px;
    }

    body {
        background-color: #26282B;
        height: 100vh;
    }

    * {
        margin: 0;
        padding: 0;
        background-color: #26282B;
    }

</style>