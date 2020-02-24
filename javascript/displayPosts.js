const postsContainer = document.querySelector('.posts-container'),
    createPostBtn = document.querySelector(".createPostButton"),
    createPostInput = document.querySelector(".createPostText"),
    postButtons = document.querySelectorAll(".postBtn"),
    closeBtn = document.querySelector(".closePost"),
    createPostCont = document.querySelector(".createPost"),
    sendPostBtn = document.querySelector(".sendPost");


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

sendPostBtn.addEventListener("click", () => {
    if (createPostInput.value !== '') {
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "./sendPost", true);
        xhttp.setRequestHeader("Content-Type", "application/json");

        let data = JSON.stringify({ "postContent": `${createPostInput.value}` });

        xhttp.send(data);

        showPostCreation();
        setTimeout(() => {
            createPostCont.classList.toggle("extendMargin");
        }, 200);

        setTimeout(getPosts, 500);
    }

})


function showPostCreation() {
    createPostBtn.classList.toggle("hideBtn");
    createPostInput.value = '';
    createPostInput.classList.toggle("showInp");
    postButtons.forEach(element => {
        element.classList.toggle("showBtn");
    });
}

function getPosts() {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "./getPosts?name=posts", true);

    xmlhttp.onload = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let result = JSON.parse(this.response);
            createPosts(result.data);
        }

    }

    xmlhttp.send();
}

function getComments() {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "./getComments?name=comments", true);

    xmlhttp.onload = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let result = JSON.parse(this.response);
            createComments(result.data);
        }

    }

    xmlhttp.send();
}


function createPosts(posts) {
    let existingPosts = document.querySelectorAll(".post");
    existingPosts.forEach(element => {
        element.parentNode.removeChild(element);
    });

    editing = false;
    commenting = false;

    for (let index = posts.length - 1; index >= 0; index--) {
        const element = posts[index];

        let postCard = document.createElement('div'),
            div = document.createElement('div'),
            pContent = document.createElement('p'),
            pUser = document.createElement('p'),
            pTime = document.createElement('p'),
            thumbUp = document.createElement('img'),
            thumbDown = document.createElement('img'),
            commentImg = document.createElement('img');

        thumbUp.setAttribute("src", "https://img.icons8.com/windows/96/000000/facebook-like.png");
        // thumbDown.setAttribute("src", "https://img.icons8.com/windows/96/000000/middle-finger.png");
        commentImg.setAttribute("src", "https://img.icons8.com/windows/32/000000/topic.png");


        postCard.classList.add('postCard');
        div.classList.add('post');
        pContent.classList.add('postContent');
        pUser.classList.add('postUser');
        pTime.classList.add('postDate');
        thumbUp.classList.add('thumbImg');
        thumbUp.classList.add('thumbImgLeft');
        commentImg.classList.add('commentImg');

        thumbDown.classList.add('thumbImg');
        thumbDown.classList.add('thumbImgRight');

        pContent.innerText = element['post_content'];
        pUser.innerText = "Posted by " + element['user_name'];
        pTime.innerText = `on ${timeConverter(element['date_created'])}`;
        div.id = element['post_id'];

        div.appendChild(pContent);
        div.appendChild(thumbUp);
        // div.appendChild(thumbDown);
        div.appendChild(commentImg);
        div.appendChild(pUser);
        div.appendChild(pTime);
        postCard.appendChild(div);
        postsContainer.appendChild(postCard);

        if (element['user_type'] === 'owner') {
            let pEdit = document.createElement('p');
            pEdit.classList.add('postEdit');
            pEdit.innerText = "Edit";
            div.appendChild(pEdit);
        }
    }

    getComments();
}

function createComments(comments) {
    let posts = document.querySelectorAll(".post");

    let existingComments = document.querySelectorAll(".comments"),
        showComments = document.querySelectorAll(".showComments"),
        hideComments = document.querySelectorAll(".hideComments");

    existingComments.forEach(element => {
        element.parentNode.removeChild(element);
    });
    showComments.forEach(element => {
        element.parentNode.removeChild(element);
    });
    hideComments.forEach(element => {
        element.parentNode.removeChild(element);
    });

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        let showingComments = false;
        // let commentOffsetPosition = 35;
        let dComments = document.createElement("div");

        for (let j = 0; j < comments.length; j++) {
            const comment = comments[j];

            if (post.id == comment['comment_post_id']) {

                let dCommentContainer = document.createElement("div"),
                    pCommentUser = document.createElement("p"),
                    pCommentContent = document.createElement("p"),
                    pCommentDate = document.createElement("p");

                if (!showingComments) {
                    let pShowComments = document.createElement("p");
                    pShowComments.classList.add("showComments");
                    pShowComments.innerText = "Show comments";
                    post.appendChild(pShowComments);

                    let hideComments = document.createElement("p");
                    hideComments.classList.add("hideComments");
                    hideComments.innerText = "Hide comments";
                    post.appendChild(hideComments);

                    showingComments = true;


                    pShowComments.addEventListener("click", (e) => {
                        showComments(e);
                    });

                    hideComments.addEventListener("click", (e) => {
                        showComments(e);
                    });

                    function showComments(e) {
                        let comments = document.querySelectorAll('.comments');
                        pShowComments.classList.toggle("pHide");
                        hideComments.classList.toggle("pShow");

                        for (let i = 0; i < comments.length; i++) {
                            const comment = comments[i];

                            if (e.target.parentNode.parentNode == comment.parentNode) {
                                comment.classList.toggle("display");
                            }
                        }
                    }
                }

                dComments.classList.add("comments");
                dCommentContainer.classList.add("commentContainer");
                pCommentUser.classList.add("commentUser");
                pCommentContent.classList.add("commentContent");
                pCommentDate.classList.add("commentDate");

                pCommentUser.innerText = comment['user_name']
                pCommentDate.innerText = `on ${timeConverter(comment['date_created'])}`;
                pCommentContent.innerText = comment['comment_content'];

                dCommentContainer.appendChild(pCommentContent);
                dCommentContainer.appendChild(pCommentUser);
                dCommentContainer.appendChild(pCommentDate);
                dComments.appendChild(dCommentContainer);
                post.parentNode.appendChild(dComments);

            }
        }
    }
}

function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

