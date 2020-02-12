const root = document.querySelector("#root");

function load() {
    createHeader();
    createFooter();
    startPhpSession();
    getPhpSessionStatus();
}

function createHeader() {
    let header = document.createElement("header"),
        nav = document.createElement("nav"),
        divLogo = document.createElement("div"),
        divNav = document.createElement("div"),
        logoLink = document.createElement("a"),
        loginLink = document.createElement("a"),
        signUpLink = document.createElement("a");

    divLogo.classList.add("logo");
    divNav.classList.add("navigation");
    logoLink.classList.add("logo-link");
    loginLink.classList.add("nav-link");
    signUpLink.classList.add("nav-link");

    logoLink.innerText = "jokes";
    logoLink.setAttribute("href", "./");

    loginLink.innerText = "Login";
    loginLink.setAttribute("href", "./login.html");

    signUpLink.innerText = "Sign up";
    signUpLink.setAttribute("href", "./signup.html");

    header.appendChild(nav);
    nav.appendChild(divLogo);
    nav.appendChild(divNav);
    divLogo.appendChild(logoLink);
    divNav.appendChild(loginLink);
    divNav.appendChild(signUpLink);

    root.insertBefore(header, root.childNodes[0]);
}

function createFooter() {
    let footer = document.createElement("footer"),
        p = document.createElement("p");

    p.innerHTML = "&copy; 2020 Adrian Bulciu";
    footer.appendChild(p);

    root.appendChild(footer);
}

function startPhpSession() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "./phpSession/startSession.php");
    xhttp.send();

}

function getPhpSessionStatus() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./phpSession/sessionStatus.php");
    xhttp.send();
}