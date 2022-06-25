const toastButton= document.getElementById('button');
const toastMessage= document.getElementById('toast');

toastButton.addEventListener('click', showToast);

function showToast(){
    toastMessage.classList.add('show-toast');
}

