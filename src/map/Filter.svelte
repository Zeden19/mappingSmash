<!-- Sidebar.svelte -->
<script>
    import Sidebar from "./Sidebar.svelte";

    export let open = false;
    export let mapResult;
    export let startDate;
    export let endDate;
    export let country;
    export let minAttendees = 0;

</script>

<div style="position: absolute; top: 115px">
    {#if open}
		<Sidebar bind:mapResult bind:startDate bind:endDate bind:country bind:minAttendees/>
    {/if}
    <button class:selected={open} on:click={() => open = !open}>Search</button>
</div>

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
        transition: right 0.5s ease-in-out;
    }

  div {
      text-align: left;
      display: flex;
      height: 100%;
  }

  button:hover {
        background-color: #555;
    }

  .selected {
      background-color: #555;
  }

  .selected:hover {
      background-color: black;
  }

</style>
