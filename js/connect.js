//Thêm chức năng tạo nhóm       
function filterUsers() {
    const name = document.getElementById('searchName').value.toLowerCase();
    const interests = document.getElementById('searchInterests').value.toLowerCase();
    const users = getUsers().filter(user => 
        user.name.toLowerCase().includes(name) && 
        user.interests.toLowerCase().includes(interests)
    );
    renderUsers(users);
}
