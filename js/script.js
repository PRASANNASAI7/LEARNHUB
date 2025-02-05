document.addEventListener("DOMContentLoaded", function () {
 

    document.addEventListener("DOMContentLoaded", function() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
      
        hamburger.addEventListener('click', () => {
          navLinks.classList.toggle('active'); // Toggle the active class
        });
      });
    // Handle Login Form Submission
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();  // Prevent the default form submission

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Replace with your authentication logic
            if (email === "test@example.com" && password === "password") {
                alert("Login successful!");

                // Redirect to index.html after successful login
                window.location.replace("index.html");  // This will navigate to index.html
            } else {
                alert("Invalid credentials. Please try again.");
            }
        });
    }

    // Handle Sign Up Form Submission
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission for validation

            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            // Check if passwords match
            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return;
            }

            // Proceed with the signup logic (e.g., send data to the server)
            alert("Sign-up successful!");

            // Redirect to login page after successful sign-up
            window.location.href = "login.html"; // Change to the desired redirect URL
        });
    }

    // Handle Forgot Password Submission
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("forgotEmail").value;

            if (email) {
                alert(`If the email exists, a reset link has been sent to ${email}`);
                window.location.href = "login.html"; 
            } else {
                alert("Please enter your registered email address.");
            }
        });
    }

    // Handle Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            alert("Logged out successfully!");
            window.location.href = "index.html";
        });
    }

    // Toggle Course Modules
    const moduleHeaders = document.querySelectorAll(".module-header");
    if (moduleHeaders.length > 0) {
        moduleHeaders.forEach(header => {
            header.addEventListener("click", function () {
                const content = this.nextElementSibling;
                document.querySelectorAll(".module-content").forEach(item => {
                    if (item !== content) {
                        item.style.display = "none";
                    }
                });
                content.style.display = content.style.display === "block" ? "none" : "block";
            });
        });
    }

    // Lightbox Functionality for Gallery
    window.openLightbox = function (imageSrc) {
        const lightboxModal = document.getElementById("lightbox-modal");
        const lightboxImg = document.getElementById("lightbox-img");
        lightboxImg.src = `assets/img/${imageSrc}`;
        lightboxModal.style.display = "flex";
    };

    window.closeLightbox = function () {
        const lightboxModal = document.getElementById("lightbox-modal");
        lightboxModal.style.display = "none";
    };

    // Function to load the post content based on post ID
    function loadPost(postId) {
        // Assuming posts is an object with post data
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
            },
            // Add other posts as necessary
        };
        
        const post = posts[postId];

        if (!post) {
            document.querySelector('.post-container').innerHTML = '<h2>Post not found</h2>';
            return;
        }

        // Update Post Header
        document.getElementById('post-header').innerHTML = `
            <h1>${post.title}</h1>
            <p><strong>Instructor:</strong> ${post.instructor}</p>
            <p><strong>Start Date:</strong> ${post.startDate}</p>
            <p><strong>End Date:</strong> ${post.endDate}</p>
        `;

        // Update Post Image
        document.getElementById('post-image').src = post.image;

        // Update Description
        document.getElementById('post-description').innerHTML = `
            <h2>Course Overview</h2>
            <p>${post.description}</p>
        `;

        // Update Course Details
        let detailsHTML = `<h2>Course Details</h2><ul>`;
        post.details.forEach(detail => {
            detailsHTML += `<li><strong>${detail.label}:</strong> ${detail.value}</li>`;
        });
        detailsHTML += `</ul>`;
        document.getElementById('post-details').innerHTML = detailsHTML;

        // Update Syllabus
        let syllabusHTML = `<h2>Syllabus</h2><ul>`;
        post.syllabus.forEach(module => {
            syllabusHTML += `<li>${module}</li>`;
        });
        syllabusHTML += `</ul>`;
        document.getElementById('post-syllabus').innerHTML = syllabusHTML;

        // Update Enroll Button
        document.getElementById('post-enroll').innerHTML = `
            <p>Don't miss your chance to be part of this exciting course! Enroll now.</p>
            <a href="${post.enrollLink}" class="enroll-button">Enroll Now</a>
        `;
    }

    // Get the post ID from the URL (e.g., post1.html?post=1)
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post') || '1';  // Default to post 1 if no ID is provided

    // Load the selected post
    loadPost(postId);
});
