const uploadDocumentForm = document.getElementById('uploadDocumentForm');
const documentsList = document.getElementById('documentsList');
const notification = document.getElementById('notification');

// Load documents from localStorage
document.addEventListener('DOMContentLoaded', loadDocuments);

// Show upload form
function showUploadForm() {
    document.getElementById('uploadForm').classList.toggle('hidden');
}

// Event listener for the form submission
uploadDocumentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('docTitle').value;
    const description = document.getElementById('docDescription').value;
    const file = document.getElementById('docFile').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const document = {
            title: title,
            description: description,
            file: e.target.result,
            date: new Date().toLocaleDateString(),
            size: file.size
        };
        
        saveDocument(document);
        showNotification('Tải lên thành công!');
        uploadDocumentForm.reset();
        loadDocuments();
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
        card.className = 'document-card';
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

// Show notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}


// Function to view deleted documents
function viewDeletedDocuments() {
    // Logic to view deleted documents (not implemented here)
    showNotification('Chức năng xem tài liệu đã xóa chưa được triển khai!');
}

// Function to add folder
function addFolder() {
    // Logic to add folder (not implemented here)
    showNotification('Chức năng thêm thư mục chưa được triển khai!');
}

// Kéo Thả Tài Liệu
const dropZone = document.getElementById('dropZone');
dropZone.addEventListener('drop', handleDrop);

function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileUpload(file); // Hàm xử lý file tải lên
}
function debounce(func, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
}
searchInput.addEventListener('input', debounce(handleSearch, 300));



// thêm phân trang hoặc lazy loading
let currentPage = 1;
const pageSize = 10;
function loadDocuments(page) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const documentsToShow = documents.slice(start, end);
    // Hiển thị tài liệu...
}

// Thêm mã xử lý đầu vào để tránh XSS
function sanitizeInput(input) {
    return input.replace(/[<>"'&]/g, (char) => ({
        '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '&': '&amp;'
    })[char]);
}

//thêm chức năng chỉnh sửa tại chỗ
function editDocument(title) {
    const documentCard = document.querySelector(`.document-card[data-title="${title}"]`);
    const titleField = documentCard.querySelector('.title-edit');
    titleField.classList.toggle('hidden'); // Hiển thị ô input để chỉnh sửa
    titleField.addEventListener('blur', () => {
        const updatedTitle = titleField.value;
        const documents = getDocuments();
        const document = documents.find(doc => doc.title === title);
        document.title = updatedTitle; // Cập nhật dữ liệu
        localStorage.setItem('documents', JSON.stringify(documents));
        loadDocuments();
    });
}

//Thêm sắp xếp và lọc tài liệu 
function sortDocuments(criterion) {
    const documents = getDocuments();
    if (criterion === 'title') {
        documents.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criterion === 'date') {
        documents.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    renderDocuments(documents); // Hiển thị lại danh sách đã sắp xếp
}

function filterDocuments(fileType) {
    const documents = getDocuments().filter(doc => doc.file.endsWith(fileType));
    renderDocuments(documents);
}

//Thêm chuyển đổi chế độ hiển thị 
function toggleViewMode(mode) {
    const documentList = document.getElementById('documentsList');
    if (mode === 'grid') {
        documentList.classList.add('grid-view');
        documentList.classList.remove('list-view');
    } else {
        documentList.classList.add('list-view');
        documentList.classList.remove('grid-view');
    }
}

