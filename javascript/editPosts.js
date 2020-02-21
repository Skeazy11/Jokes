let editing = false;

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
                    editArea.style.minHeight = "30px";
                    editArea.style.minWidth = "256px";
                    editArea.style.maxHeight = "300px";
                    editArea.style.maxWidth = "256px";

                    editArea.style.height = element.offsetHeight.toString() + 30 + "px";
                    editArea.style.width = element.offsetWidth.toString() + "px";

                    editArea.value = element.innerText;
                    editArea.classList.add('editText');
                    element.style.display = "none";
                    let pConfirm = document.createElement("p"),
                        pDiscard = document.createElement("p");

                    pConfirm.classList.add("pConfirm");
                    pDiscard.classList.add("pDiscard");
                    pConfirm.innerText = "Confirm";
                    pDiscard.innerText = "Discard";

                    element.parentNode.appendChild(pConfirm);
                    element.parentNode.appendChild(pDiscard);

                    pDiscard.addEventListener("click", () => {
                        editArea.parentNode.removeChild(pConfirm);
                        editArea.parentNode.removeChild(pDiscard);
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

                    return;
                }
            }
        }
    }
})
