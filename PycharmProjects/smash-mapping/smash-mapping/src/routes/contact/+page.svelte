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
        <img style="height: 200px; width: 200px" alt="reimu-standing-gif" class="reimu" src="reimu-standing.gif">
    </div>
</div>

</body>

<style>
    div {
        background-color: #2c343c;
        height: fit-content(100%);
        padding: 10px;
        margin: 10px 2em;
    }

    h2 {
        letter-spacing: 1px;
        text-align: center;
        font-family: 'Impact', sans-serif;
        font-size: 50px;
        color: white;
        font-style: italic;
        background-color: #2c343c;
        margin: 5px 2em 0;
        padding: 10px;
    }

    p {
        text-align: center;

        color: white;
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
    }

    .share-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        gap: 10px;
    }

    .reimu-div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        margin-right: 1.7em;
        margin-left: 0;
    }

    .reimu {
        border: none;
    }
</style>
