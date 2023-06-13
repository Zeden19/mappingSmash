<script>
    import {slide} from 'svelte/transition';
    export let activePage;

</script>


<div>
    <button onclick="help_dialog.showModal()">Help</button>
</div>

<dialog style="width: 30%" id="help_dialog">
    <p>Hi there, thanks for visiting! <br><br>

        This website is a tool that allows individuals to find in-person Melee and Ultimate tournaments easier. <br><br>

        To start, the search button on the right allows you to set filters and then search; the tournaments will appear
        on the map below as markers that look like this:
        <img style="vertical-align: middle;" src="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
             alt="red-pointer"><br><br>

        Clicking on a marker will bring up a window with more information about the tournament. <br><br>

        Clicking on the "legend" button on the right will show what the colors of the markers mean. <br><br>

        I hope you enjoy using this website! <br><br>
        
        Found a bug? <a style="cursor: pointer" on:click={() => activePage="contact"}>Contact</a> me
    </p>
    <button onclick="help_dialog.close()">Close</button>
</dialog>


<style>
    button {
        background-color: black;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin-bottom: 3px;
        border-radius: 20%;
        height: 40px;
    }

    div {
        text-align: left;
        display: flex;
        position: absolute;
        right: 0.3%;
        top: 8%;
    }

    dialog {
        border-radius: 10px;
        border: 5px solid black;
    }

    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.5);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

</style>