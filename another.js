// Typewriter effect
    const texts = ["Web Developer", "IoT Enthusiast", "UI Designer", "Tech Explorer"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    const el = document.getElementById("changing-text");

    function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    el.textContent = letter;

if (letter.length === currentText.length) {
    setTimeout(() => {
    index = 0;
    count++;
    type();
}, 2000);
} else {
setTimeout(type, 100);
}
}
type();

// Fade-in scroll effect
const sections = document.querySelectorAll(".fade-section");
const observer = new IntersectionObserver(
entries => {
    entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
    });
},
    { threshold: 0.1 }
    );
    sections.forEach(section => observer.observe(section));

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

    // Modal logic
    const modal = document.getElementById("project-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-description");
    const modalTech = document.getElementById("modal-tech");
    const viewProjectBtn = document.getElementById("view-project-btn");

function openModal(projectId) {
    const data = {
    project1: {
    title: "Smart Medicine Dispenser",
        desc: "An IoT-based medicine dispenser that automatically releases prescribed doses at scheduled times. Built using ARDUINO microcontroller, real-time clock (RTC) module, and stepper motor for precise dispensing. Features include mobile app integration for remote monitoring and dosage adjustments.",
        tech: ["Arduino", "ARDUINO", "C++", "IoT", "Mobile App"],
        link: "#"
    },
        project2: {
        title: "Library System",
        desc: "A comprehensive Library Management System developed in C++ with file handling capabilities. Includes features like book borrowing/returning, user management, search functionality, and overdue fine calculations. Designed with a user-friendly console interface.",
        tech: ["C++", "File Handling", "Data Structures"],
        link: "#"
        },
        project3: {
        title: "Portfolio Website",
        desc: "A fully responsive portfolio website featuring a modern glassmorphism design. Built with HTML, CSS, and JavaScript, showcasing projects with interactive elements and smooth animations. Optimized for all devices and browsers.",
        tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
        link: "#"
        }
    };

const proj = data[projectId];
    modalTitle.textContent = proj.title;
    modalDesc.textContent = proj.desc;
      // Set the project link
viewProjectBtn.onclick = function() {
        window.open(proj.link, '_blank');
};
    // Clear previous tech tags
    modalTech.innerHTML = '';

     // Add tech tags
    proj.tech.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        modalTech.appendChild(tag);
    });

modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    }

    function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    }

    // Close modal when clicking outside the content
    modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
    });

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
e.preventDefault();
alert('Thank you for your message! I will get back to you soon.');
this.reset();
});