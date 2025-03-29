document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript Loaded");

    // ✅ Toggle Mobile Navigation
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }


    document.getElementById("signupForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim(); // Add confirm password field
    
        // ✅ Check if passwords match
        if (password !== confirmPassword) {
            alert("❌ Passwords do not match! Please try again.");
            return; // Stop form submission
        }
    
        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert("✅ Signup successful!");
                window.location.href = "login.html";
            } else {
                alert("❌ " + data.message);
            }
        } catch (error) {
            console.error("❌ Signup error:", error);
            alert("❌ Server not responding! Please try again.");
        }
    });
    

    
    // ✅ Handle Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("token"); // ✅ Remove JWT token
            alert("✅ Logged out successfully!");
            window.location.href = "index.html";
        });
    }

    // ✅ Toggle Course Modules
    const moduleHeaders = document.querySelectorAll(".module-header");
    moduleHeaders.forEach(header => {
        header.addEventListener("click", function () {
            const content = this.nextElementSibling;
            document.querySelectorAll(".module-content").forEach(item => {
                if (item !== content) item.style.display = "none";
            });
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });

    // ✅ Lightbox Functionality for Gallery
    window.openLightbox = function (imageSrc) {
        const lightboxModal = document.getElementById("lightbox-modal");
        const lightboxImg = document.getElementById("lightbox-img");
        if (lightboxModal && lightboxImg) {
            lightboxImg.src = `assets/img/${imageSrc}`;
            lightboxModal.style.display = "flex";
        }
    };

    window.closeLightbox = function () {
        const lightboxModal = document.getElementById("lightbox-modal");
        if (lightboxModal) lightboxModal.style.display = "none";
    };

    // ✅ Load Post Content Dynamically
    function loadPost(postId) {
        const posts = {
            '1': {
                title: 'Course 1 Title',
                instructor: 'Instructor Name',
                startDate: '2025-02-01',
                endDate: '2025-05-01',
                image: 'course1.jpg',
                description: 'Detailed description of Course 1...',
                details: [
                    { label: 'Duration', value: '4 months' },
                    { label: 'Level', value: 'Beginner' }
                ],
                syllabus: ['Module 1', 'Module 2', 'Module 3'],
                enrollLink: 'enroll-now.html'
            }
        };

        const post = posts[postId];
        if (!post) {
            document.querySelector('.post-container').innerHTML = '<h2>❌ Post not found</h2>';
            return;
        }

        document.getElementById('post-header').innerHTML = `
            <h1>${post.title}</h1>
            <p><strong>Instructor:</strong> ${post.instructor}</p>
            <p><strong>Start Date:</strong> ${post.startDate}</p>
            <p><strong>End Date:</strong> ${post.endDate}</p>
        `;
        document.getElementById('post-image').src = post.image;
        document.getElementById('post-description').innerHTML = `<h2>Course Overview</h2><p>${post.description}</p>`;
        document.getElementById('post-details').innerHTML = `<h2>Course Details</h2><ul>${post.details.map(detail => `<li><strong>${detail.label}:</strong> ${detail.value}</li>`).join('')}</ul>`;
        document.getElementById('post-syllabus').innerHTML = `<h2>Syllabus</h2><ul>${post.syllabus.map(module => `<li>${module}</li>`).join('')}</ul>`;
        document.getElementById('post-enroll').innerHTML = `<p>Don't miss your chance to be part of this exciting course! Enroll now.</p><a href="${post.enrollLink}" class="enroll-button">Enroll Now</a>`;
    }

    // ✅ Load Post Based on URL Parameter
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post') || '1';
    loadPost(postId);
});
 // script.js

// Function to load HTML content into a specified element
function loadHTML(elementId, fileName) {
    fetch(fileName)
        .then(response => response.text())
        .then(data => document.getElementById(elementId).innerHTML = data)
        .catch(error => console.error('Error loading the file:', error));
}

// Load the navbar and footer
window.onload = function() {
    loadHTML('navbar', 'navbar.html');
    loadHTML('footer', 'footer.html');
};
