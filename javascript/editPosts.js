let editing = false;
let commenting = false;

postsContainer.addEventListener("click", (e) => {
    if (e.target.classList == 'postEdit') {
        let childrenOfContainer = e.target.parentNode.children;
        let editArea = document.createElement("textarea");
        if (!editing) {
            e.target.classList.toggle("pHide");
            editing = true;
            for (let i = 0; i < childrenOfContainer.length; i++) {
                const element = childrenOfContainer[i];
                if (element.classList.contains("postContent")) {
                    element.parentNode.insertBefore(editArea, element);
                    // editArea.style.minHeight = "30px";
                    // editArea.style.minWidth = "256px";
                    // editArea.style.maxHeight = "300px";
                    // editArea.style.maxWidth = "256px";

                    // editArea.style.height = element.offsetHeight.toString() + 30 + "px";
                    // editArea.style.width = element.offsetWidth.toString() + "px";

                    editArea.value = element.innerText;
                    editArea.classList.add('editText');
                    element.style.display = "none";
                    let pConfirm = document.createElement("p"),
                        pDiscard = document.createElement("p"),
                        pDelete = document.createElement('p');

                    pDelete.classList.add('postDelete');
                    pConfirm.classList.add("pConfirm");
                    pDiscard.classList.add("pDiscard");
                    pConfirm.innerText = "Confirm";
                    pDiscard.innerText = "Discard";
                    pDelete.innerText = "Delete Post";

                    element.parentNode.appendChild(pDelete);
                    element.parentNode.appendChild(pConfirm);
                    element.parentNode.appendChild(pDiscard);

                    pDiscard.addEventListener("click", () => {
                        editArea.parentNode.removeChild(pConfirm);
                        editArea.parentNode.removeChild(pDiscard);
                        editArea.parentNode.removeChild(pDelete);
                        editArea.parentNode.removeChild(editArea);
                        element.style.display = "block";
                        e.target.classList.toggle("pHide");
                        editing = false;
                    });

                    pConfirm.addEventListener("click", () => {
                        if (editArea.value !== element.innerText) {

                            let xmlhttp = new XMLHttpRequest();
                            xmlhttp.open("POST", "./updatePost", true);
                            xmlhttp.setRequestHeader("Content-Type", "application/json");

                            let data = JSON.stringify({
                                "postContent": `${editArea.value}`,
                                "postId": `${editArea.parentNode.id}`
                            });

                            xmlhttp.send(data);
                            setTimeout(getPosts, 500);
                        }

                        editArea.parentNode.removeChild(pConfirm);
                        editArea.parentNode.removeChild(pDiscard);
                        editArea.parentNode.removeChild(editArea);
                        element.style.display = "block";
                        e.target.classList.toggle("pHide");
                        editing = false;
                    })

                    pDelete.addEventListener("click", () => {
                        let xmlhttp = new XMLHttpRequest();
                        xmlhttp.open("POST", "./deletePost", true);
                        xmlhttp.setRequestHeader("Content-Type", "application/json");

                        let data = JSON.stringify({
                            "postId": `${editArea.parentNode.id}`
                        });

                        xmlhttp.send(data);
                        setTimeout(getPosts, 500);
                        setTimeout(getComments, 500);
                        editing = false;
                        commenting = false;
                    })

                    return;
                }
            }
        }
    }

    if (e.target.classList == 'commentImg') {
        if (!commenting) {

            if (userLogged) {
                commenting = true;
                let commentArea = document.createElement("textarea");
                commentArea.classList.add("commentArea");
                e.target.parentNode.appendChild(commentArea);

                e.target.parentNode.style.marginBottom = "10rem";

                let commentSend = document.createElement("p"),
                    commentDiscard = document.createElement("p");

                commentSend.classList.add("commentSend");
                commentDiscard.classList.add("commentDiscard");

                commentSend.classList.add("commentButtons");
                commentDiscard.classList.add("commentButtons");

                commentSend.innerText = "Send";
                commentDiscard.innerText = "Discard";

                e.target.parentNode.appendChild(commentDiscard);
                e.target.parentNode.appendChild(commentSend);


                commentDiscard.addEventListener("click", () => {
                    e.target.parentNode.removeChild(commentDiscard);
                    e.target.parentNode.removeChild(commentSend);
                    e.target.parentNode.removeChild(commentArea);
                    e.target.parentNode.removeAttribute("style");
                    commenting = false;

                })

                commentSend.addEventListener("click", () => {
                    if (commentArea.value !== "") {

                        let xmlhttp = new XMLHttpRequest();
                        xmlhttp.open("POST", "./sendComment", true);
                        xmlhttp.setRequestHeader("Content-Type", "application/json");

                        let data = JSON.stringify({
                            "commentContent": `${commentArea.value}`,
                            "postId": `${e.target.parentNode.id}`
                        });
                        xmlhttp.send(data);

                        e.target.parentNode.removeChild(commentDiscard);
                        e.target.parentNode.removeChild(commentSend);
                        e.target.parentNode.removeChild(commentArea);
                        e.target.parentNode.removeAttribute("style");
                        commenting = false;
                        setTimeout(getComments, 500);
                    }



                })
            }
            else {
                window.location.href = "./login";
            }
        }
    }
})
