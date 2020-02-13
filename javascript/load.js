const root = document.querySelector("#root");

// Moved here instead to be accessible inside phpSessionStatus()
let header = document.createElement("header"),
    nav = document.createElement("nav"),
    divLogo = document.createElement("div"),
    divNav = document.createElement("div"),
    logoLink = document.createElement("a"),
    loginLink = document.createElement("a"),
    signUpLink = document.createElement("a"),
    signOutLink = document.createElement("a");

function load() {
    phpSessionStatus();
    createHeader();
    createFooter();
}

function createHeader() {
    // let header = document.createElement("header"),
    //     nav = document.createElement("nav"),
    //     divLogo = document.createElement("div"),
    //     divNav = document.createElement("div"),
    //     logoLink = document.createElement("a"),
    //     loginLink = document.createElement("a"),
    //     signUpLink = document.createElement("a"),
    //     signOutLink = document.createElement("a");

    divLogo.classList.add("logo");
    divNav.classList.add("navigation");
    logoLink.classList.add("logo-link");
    loginLink.classList.add("nav-link");
    signUpLink.classList.add("nav-link");
    signOutLink.classList.add("nav-link");

    logoLink.innerText = "jokes";
    logoLink.setAttribute("href", "./");

    loginLink.innerText = "Login";
    loginLink.setAttribute("href", "./login");

    signUpLink.innerText = "Sign up";
    signUpLink.setAttribute("href", "./signup");

    signOutLink.innerText = "Sign out";
    signOutLink.setAttribute("href", "./sessionClose");

    header.appendChild(nav);
    nav.appendChild(divLogo);
    nav.appendChild(divNav);
    divLogo.appendChild(logoLink);

    root.insertBefore(header, root.childNodes[0]);
}

function createFooter() {
    let footer = document.createElement("footer"),
        p = document.createElement("p");

    p.innerHTML = "&copy; 2020 Adrian Bulciu";
    footer.appendChild(p);

    root.appendChild(footer);
}

function phpSessionStatus() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "./sessionStatus", true);

    xhttp.onload = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let data = JSON.parse(this.response);
            if (data.userLogged) {
                divNav.appendChild(signOutLink);
            }
            else {
                divNav.appendChild(loginLink);
                divNav.appendChild(signUpLink);
            }
        }
        else {
            divNav.appendChild(loginLink);
            divNav.appendChild(signUpLink);
        }
    }

    xhttp.send();
}