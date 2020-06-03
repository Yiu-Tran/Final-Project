let formAction;

document.getElementById('addPost').onclick = () => {
    document.getElementById('modalTitleInput').value = '';
    document.getElementById('modalTextInput').value = '';
    document.getElementById('modalAuthorInput').value = '';
    document.getElementById('addPostModal').style.display = 'block';
    document.getElementById('modalBackdrop').style.display = 'block';
    document.getElementById('modalAcceptButton').innerText = 'Add Post';
    formAction = 'addPost';
}

document.getElementById('modalCloseButton').onclick = () => {
    document.getElementById('addPostModal').style.display = 'none';
    document.getElementById('modalBackdrop').style.display = 'none';
}

document.getElementById('modalCancelButton').onclick = () => {
    document.getElementById('addPostModal').style.display = 'none';
    document.getElementById('modalBackdrop').style.display = 'none';
}

document.getElementById('modalAcceptButton').onclick = () => {
    const modalTitle = document.getElementById('modalTitleInput').value;
    const modalText = document.getElementById('modalTextInput').value;
    const modalAuthor = document.getElementById('modalAuthorInput').value;
    if(modalTitle === '' || modalText === '' || modalAuthor === '') {
        alert('Please enter a title, a question, and an author');
    } else {
        document.getElementById('addPostModal').style.display = 'none';
        document.getElementById('modalBackdrop').style.display = 'none';
        const form = document.getElementById('addPostModal');
        form.action = formAction;
        form.submit();
    }
}

const postEditIcons = document.getElementsByClassName('postEditIcon');
for(let i = 0; i < postEditIcons.length; i++) {
    postEditIcons[i].onclick = e => {
        const postID = e.currentTarget.getAttribute('data-value');
        document.getElementsByClassName('modalPostID')[0].value = postID;
        document.getElementById('addPostModal').style.display = 'block';
        document.getElementById('modalBackdrop').style.display = 'block';
        const post = e.currentTarget.parentNode.childNodes[1];
        document.getElementById('modalTitleInput').value = post.childNodes[1].innerHTML;
        document.getElementById('modalTextInput').value = post.childNodes[3].innerHTML;
        document.getElementById('modalAuthorInput').value = post.childNodes[5].childNodes[1].innerHTML.slice(0, -8);
        document.getElementById('modalAcceptButton').innerText = 'Edit Post';
        formAction = 'editPost';
    }
}

const postDeleteIcons = document.getElementsByClassName('postDeleteIcon');
for(let i = 0; i < postDeleteIcons.length; i++) {
    postDeleteIcons[i].onclick = e => {
        const postID = e.currentTarget.getAttribute('data-value');
        document.getElementsByClassName('modalPostID')[0].value = postID;
        const form = document.getElementById('addPostModal');
        console.log('hit delete')
        form.action = 'deletePost';
        form.submit();
    }
}

const posts = document.getElementsByClassName('postTitle');
for(let i = 0; i < posts.length; i++) {
    posts[i].onclick = () => {
        window.location.href = `/contact/${posts[i].getAttribute('data-value')}`;
    }
}