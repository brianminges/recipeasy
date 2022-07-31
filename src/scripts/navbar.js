export const navBar = () => {
    let html= `
    <header>
        <nav class="navbar">
            <div id="nav_logo"><a href="index.html"><h4><span class="title_start">Recip</span>EZ</h4></a></div>
            <ul class="navbar_items">
                <li class="navbar_item"><a href="index.html">HOME</a></li>
                <li class="navbar_item"><a href="#" id="search_button">SEARCH</a></li>
                <li class="navbar_item"><a href="#" id="save_button">SAVE</a></li>
            </ul>
        </nav>
    </header>
    `
    return html
}
 