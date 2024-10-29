<script>
    let isDarkMode=false
    const toggleTheme= () => {
        isDarkMode = !isDarkMode
    }
        
</script>

<div
    class:dark-mode={isDarkMode}
    class:light-mode={!isDarkMode}>
    <h1>
        I change my color
    </h1>
</div>
    <button on:click={toggleTheme}>Toggle</button>

<style>
    .light-mode {
        color: black;
        background-color: white;
    }
    .dark-mode {
        color: white;
        background-color: black;
    }

    button{
        width: 100px;
        height: 60px;
        background-color: red;
    }


</style>
