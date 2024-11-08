const documentForm = document.getElementById('documentForm');
const documentsList = document.getElementById('documents');
const notification = document.getElementById('notification');

// Load documents from localStorage
document.addEventListener('DOMContentLoaded', loadDocuments);

// Event listener for the form submission
documentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const file = document.getElementById('file').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const document = {
            title: title,
            description: description,
            file: e.target.result
        };
        
        saveDocument(document);
        documentForm.reset();
        loadDocuments();
        showNotification('Tài liệu đã được đăng tải!');
    };
    
    reader.readAsDataURL(file);
});

// Function to save document to localStorage
function saveDocument(document) {
    const documents = getDocuments();
    documents.push(document);
    localStorage.setItem('documents', JSON.stringify(documents));
}

// Function to load documents from localStorage
function loadDocuments() {
    const documents = getDocuments();
    documentsList.innerHTML = '';
    
    documents.forEach((doc) => {
        const card = document.createElement('div');
        card.className = 'document-card';  // Áp dụng class cho thẻ nhỏ gọn
        card.innerHTML = `
            <h3>${doc.title}</h3>
            <p>${doc.description}</p>
            <a href="${doc.file}" download="${doc.filename}">Tải về</a>
            <button onclick="editDocument('${doc.title}')">Chỉnh sửa</button>
            <button onclick="deleteDocument('${doc.title}')">Xóa</button>
        `;
        documentsList.appendChild(card);
    });
}


// Function to get documents from localStorage
function getDocuments() {
    return JSON.parse(localStorage.getItem('documents')) || [];
}

// Function to edit document
function editDocument(title) {
    const documents = getDocuments();
    const documentToEdit = documents.find(doc => doc.title === title);
    const newTitle = prompt('Nhập tiêu đề mới', documentToEdit.title);
    const newDescription = prompt('Nhập mô tả mới', documentToEdit.description);
    
    if (newTitle && newDescription) {
        documentToEdit.title = newTitle;
        documentToEdit.description = newDescription;
        localStorage.setItem('documents', JSON.stringify(documents));
        loadDocuments();
        showNotification('Tài liệu đã được chỉnh sửa!');
    }
}

// Function to delete document
function deleteDocument(title) {
    if (confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) {
        const documents = getDocuments().filter(doc => doc.title !== title);
        localStorage.setItem('documents', JSON.stringify(documents));
        loadDocuments();
        showNotification('Tài liệu đã được xóa!');
    }
}

// Function to show notifications
function showNotification(message) {
    notification.textContent = message;
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}
