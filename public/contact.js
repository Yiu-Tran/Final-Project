document.getElementById('addPost').onclick = () => {
    document.getElementById('addPostModal').style.display = 'block';
    document.getElementById('modalBackdrop').style.display = 'block';
}

document.getElementById('modalCloseButton').onclick = () => {
    document.getElementById('addPostModal').style.display = 'none';
    document.getElementById('modalBackdrop').style.display = 'none';
}

document.getElementById('modalCancelButton').onclick = () => {
    document.getElementById('addPostModal').style.display = 'none';
    document.getElementById('modalBackdrop').style.display = 'none';
}

// document.getElementById('modalAcceptButton').onclick = () => {
//     const title = document.getElementById('modalTitleInput').value;
//     const text = document.getElementById('modalTextInput').value;
//     const author = document.getElementById('modalAuthorInput').value;

//     document.getElementById('addPostModal').style.display = 'none';
//     document.getElementById('modalBackdrop').style.display = 'none';
// }

const posts = document.getElementsByClassName('postFlexWrapper');
for(let i = 0; i < posts.length; i++) {
    posts[i].onclick = () => {
        window.location.href = `/contact/${posts[i].getAttribute('data-value')}`;
    }
}