const questionForm = document.getElementById('questionForm');
const questionsList = document.getElementById('questions');

// Load questions from localStorage
document.addEventListener('DOMContentLoaded', loadQuestions);

// Event listener for the form submission
questionForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('questionTitle').value;
    const content = document.getElementById('questionContent').value;

    const question = {
        title: title,
        content: content,
        comments: []
    };
    
    saveQuestion(question);
    questionForm.reset();
    loadQuestions();
});

// Function to save question to localStorage
function saveQuestion(question) {
    const questions = getQuestions();
    questions.push(question);
    localStorage.setItem('questions', JSON.stringify(questions));
}

// Function to load questions from localStorage
function loadQuestions() {
    const questions = getQuestions();
    questionsList.innerHTML = '';
    
    questions.forEach((q, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <button class="delete-question" onclick="deleteQuestion(${index})">X</button>
            <h3>${q.title}</h3>
            <p>${q.content}</p>
            <small>${q.comments.length} bình luận</small>
            <div class="comments-list">
                ${q.comments.map((comment, commentIndex) => `
                    <div class="comment-card">
                        <button class="delete-comment" onclick="deleteComment(${index}, ${commentIndex})">&times;</button>
                        <p>${comment}</p>
                    </div>
                `).join('')}
            </div>
            <form class="comment-form" onsubmit="addComment(event, ${index})">
                <input type="text" placeholder="Thêm bình luận..." required>
                <button type="submit">Gửi</button>
            </form>
        `;
        questionsList.appendChild(card);
    });
}

// Function to get questions from localStorage
function getQuestions() {
    return JSON.parse(localStorage.getItem('questions')) || [];
}

// Function to add a comment
function addComment(event, questionIndex) {
    event.preventDefault();
    
    const comment = event.target.querySelector('input').value;
    const questions = getQuestions();
    questions[questionIndex].comments.push(comment);
    localStorage.setItem('questions', JSON.stringify(questions));
    loadQuestions();
}

// Function to delete a comment
function deleteComment(questionIndex, commentIndex) {
    const questions = getQuestions();
    questions[questionIndex].comments.splice(commentIndex, 1); // Xóa bình luận
    localStorage.setItem('questions', JSON.stringify(questions));
    loadQuestions(); // Tải lại danh sách câu hỏi và bình luận sau khi xóa
}

// Function to delete a question
function deleteQuestion(questionIndex) {
    if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
        const questions = getQuestions();
        questions.splice(questionIndex, 1); // Xóa câu hỏi
        localStorage.setItem('questions', JSON.stringify(questions));
        loadQuestions(); // Tải lại danh sách câu hỏi
    }
}



// Function to get questions from localStorage
function getQuestions() {
    return JSON.parse(localStorage.getItem('questions')) || [];
}

document.getElementById('questionForm').addEventListener('input', () => {
    localStorage.setItem('draftQuestion', JSON.stringify({
        title: document.getElementById('questionTitle').value,
        content: document.getElementById('questionContent').value
    }));
});

