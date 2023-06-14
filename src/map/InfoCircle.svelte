<script>
    export let tooltip = false

</script>

<div data-tooltip={tooltip} class="circle">?</div>

<style>
    .circle {
        display: flex;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #999;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        float: right;
        margin-right: 15px;
    }

    .circle:hover {
        background-color: #777;
    }

</style>