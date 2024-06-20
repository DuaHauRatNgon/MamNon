document.getElementById('logout-btn').addEventListener('click', async function (event) {
    event.preventDefault();
    
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            alert('Logout successful');
            window.location.href = '/index.html'; // Chuyển hướng đến trang login.html sau khi đăng xuất thành công
        } else {
            const data = await response.json();
            alert(`Logout failed: ${data.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during logout');
    }
});