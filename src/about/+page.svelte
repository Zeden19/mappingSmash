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


    <img height="70%" width="65%" src="example-image.png"
         alt="example-image">
    At Smash Mapping, the goal is to make finding in-person tournaments far easier than current methods. Smash Mapping
    physically maps tournaments that are listed on <a target="_blank" href="https://www.start.gg/">Start.gg</a> so you
    can easily see what tournaments are near you. By using the filters, you can easily search for tournaments that you
    specifically want, when you want. <br><br>


    But this doesn't only help individuals looking for tournaments, it also helps <b>tournament organizers</b>. The
    whole reason
    why its so hard to find tournaments is because organizers don't have a good way to show their tournaments to the
    public.
    Hopefully, if Smash Mapping becomes widespread, tournament organizers won't have to worry about advertising
    tournaments, people can just use Smash Mapping and find it themselves. Easy! <br><br>

    <b>Smash Mapping is currently in beta, so there may (and probably will) be bugs. If you find any, please report them
        to me by <a style="cursor: pointer" on:click={()=>activePage="contact"}>contacting.</a></b>
</p>

</body>


<style>
    h2 {
        text-align: center;
        font-family: 'Impact', sans-serif;
        font-size: 3em;
        color: black;
        font-style: italic;
        background-color: #999;
        margin: 0 2em;
        padding: 10px;
        border-top: grey 10px solid;
    }

    p {
        text-align: left;
        font-size: 1em;
        color: black;
        background-color: #cccccc;
        border: black solid 2px;
        height: fit-content(100%);
        padding: 10px;
        margin: 10px 1em;
        overflow: hidden;
    }

    img {
        float: right;
        border: black solid 3px;
        margin-right: 5px;
        margin-left: 10px;
    }

    body {
        background-color: gray;
        height: fit-content(100%);
    }

    * {
        margin: 0;
        padding: 0;
    }

</style>