<script>
    export let tooltip = false
    export let marginRight;

</script>

<div data-tooltip={tooltip} style="--marginR: {marginRight}" class="circle">?</div>

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
        margin-right: var(--marginR);
    }

    .circle:hover {
        background-color: #777;
    }

</style>