const createPostBtn = document.querySelector(".createPostButton"),
    createPostInput = document.querySelector(".createPostText"),
    postButtons = document.querySelectorAll(".postBtn"),
    closeBtn = document.querySelector(".close"),
    createPostCont = document.querySelector(".createPost");


createPostBtn.addEventListener("click", () => {
    showPostCreation();
    createPostCont.classList.toggle("extendMargin");

})

closeBtn.addEventListener("click", () => {
    showPostCreation();
    setTimeout(() => {
        createPostCont.classList.toggle("extendMargin");
    }, 200);
})


function showPostCreation() {
    createPostBtn.classList.toggle("hideBtn");
    createPostInput.value = '';
    createPostInput.classList.toggle("showInp");
    postButtons.forEach(element => {
        element.classList.toggle("showBtn");
    });
}