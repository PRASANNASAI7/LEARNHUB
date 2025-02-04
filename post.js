// Sample Data for Different Posts
const posts = {
    "1": {
        title: "Full Stack Web Development",
        instructor: "John Doe",
        startDate: "March 1, 2025",
        endDate: "June 30, 2025",
        image: "assets/img/attractive-guy-shirt-isolated-white-background_185193-73694.jpg",
        description: "This course will cover both frontend and backend web development technologies, including HTML, CSS, JavaScript, Node.js, and more.",
        details: [
            { label: "Duration", value: "4 months" },
            { label: "Prerequisites", value: "Basic knowledge of HTML/CSS" },
            { label: "Mode", value: "Online" },
            { label: "Location", value: "LearnHub Virtual Classroom" }
        ],
        syllabus: [
            "Module 1: Introduction to Web Development",
            "Module 2: HTML & CSS Basics",
            "Module 3: JavaScript Fundamentals",
            "Module 4: Node.js & Backend Development",
            "Module 5: MongoDB and Database Integration",
            "Module 6: Building Full Stack Applications"
        ],
        enrollLink: "enroll.html"
    },
    "3": {
        title: "How to Build a Responsive Mobile App Development",
        instructor: "Alex Turner",
        startDate: "May 1, 2025",
        endDate: "August 1, 2025",
        image: "assets/img/a.avif",
        description: "Learn how to build responsive and high-performance mobile applications for both iOS and Android. This course covers UI/UX design, React Native, and more.",
        details: [
            { label: "Duration", value: "3 months" },
            { label: "Prerequisites", value: "Basic knowledge of JavaScript" },
            { label: "Mode", value: "Online" },
            { label: "Location", value: "LearnHub Virtual Classroom" }
        ],
        syllabus: [
            "Module 1: Introduction to Mobile App Development",
            "Module 2: React Native Basics",
            "Module 3: UI/UX Design Principles",
            "Module 4: Cross-Platform App Development",
            "Module 5: Testing and Debugging Apps",
            "Module 6: Publishing Mobile Apps"
        ],
        enrollLink: "enroll.html"
    },
    "2": {
        title: "Data Science",
        instructor: "Jane Smith",
        startDate: "April 15, 2025",
        endDate: "August 15, 2025",
        image: "assets/img/man-freelancer-coder-holding-laptop-smiling-looking-camera-white-background_567313-324.jpg",
        description: "Learn Data Science using Python. This course will teach you Python programming, machine learning, data analysis, and visualization techniques.",
        details: [
            { label: "Duration", value: "4 months" },
            { label: "Prerequisites", value: "Basic Python knowledge" },
            { label: "Mode", value: "Online" },
            { label: "Location", value: "LearnHub Virtual Classroom" }
        ],
        syllabus: [
            "Module 1: Introduction to Python",
            "Module 2: Data Analysis with Pandas",
            "Module 3: Machine Learning Basics",
            "Module 4: Deep Learning Fundamentals",
            "Module 5: Data Visualization with Matplotlib",
            "Module 6: Real-world Data Science Projects"
        ],
        enrollLink: "enroll.html"
    }
    
};

// Function to load the post content based on post ID
function loadPost(postId) {
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

