<script xmlns="http://www.w3.org/1999/html">
    import TwitterFollow from "./TwitterFollow.svelte";
    import MailTo from "./MailTo.svelte";
</script>
<svelte:head>
    <title>Smash Mapping: Contact</title>
</svelte:head>

<body>
<h2>Contact</h2>


<div>

    <p>Below you'll find links to contact me, please contact if you have bug reports, suggestions, or any other
        inquiries.</p>
    <br>

    <p>Twitter is my main form of contact, and its also where I post development updates, but you're more than welcome
        to contact me with any of the other methods</p>


    <div class="share-buttons">
        <TwitterFollow/>
        <MailTo/>
    </div>

    <div class="reimu-div">
        <img alt="reimu-gif" class="reimu" src="reimu.gif">
    </div>

</div>

</body>

<style>
    div {
        background-color: #cccccc;
        border: black solid 2px;
        height: fit-content(100%);
        padding: 10px;
        margin: 10px 2em;
    }

    h2 {
        text-align: center;
        font-family: 'Impact', sans-serif;
        font-size: 50px;
        color: black;
        font-style: italic;
        background-color: #999;
        margin: 0 1.5em;
        padding: 10px;
        border-top: grey 10px solid;
    }

    p {
        text-align: center;
        font-size: 1.1em;
        color: black;
    }

    img {
        float: right;
        border: black solid 3px;
        margin-right: 5px;
        margin-left: 10px;
    }

    body {
        background-color: gray;
    }

    * {
        margin: 0;
        padding: 0;
    }

    .share-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        gap: 10px;
    }

    .reimu {
        border: none;
        margin-top: 15px;
        margin-left: 0;
        margin-right: 0;
    }

    .reimu-div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        margin-right: 1.7em;
        margin-left: 0;
    }
</style>
