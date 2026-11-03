const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

/* Example project data.
   Replace image URLs and links with your real GitHub/project sources. */
const projects = [
  {
    kicker: "WEB APPLICATION",
    title: "i-Team Web-Based Application",
    description: "A full-featured web application using React, TypeScript, Tailwind CSS and Supabase, with responsive UI and modern application logic.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Figma"],
    link: "https://iteamsociety.netlify.app",
    images: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=90"
    ]
  },
  {
    kicker: "AI / HACKATHON",
    title: "AI-Driven Chatbot",
    description: "Conversational chatbot concept using Flask, LangChain, HuggingFace embeddings and FAISS for document retrieval.",
    tech: ["Python", "Flask", "LangChain", "FAISS"],
    link: "https://github.com/your-github/chatbot",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=90"
    ]
  },
  {
    kicker: "JAVA APPLICATION",
    title: "Electricity Bill Management System",
    description: "A Java-based application concept for automating electricity bill calculations with application logic and data handling.",
    tech: ["Java", "Application", "Database"],
    link: "https://github.com/your-github/electricity-bill",
    images: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=90"
    ]
  },
  {
    kicker: "EXPERT SYSTEM",
    title: "Campus Tour Guide Expert System",
    description: "An interactive campus guide concept using rule-based reasoning, Prolog and IoT-related concepts.",
    tech: ["Java", "Prolog", "IoT"],
    link: "https://github.com/your-github/campus-guide",
    images: [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=90"
    ]
  }
];

/* =========================================
   PROFILE IMAGE SLIDER
========================================= */


const profileImages = [

    "./images/Prasha_01.png",
    "./images/Prasha_04.png",
    "./images/Prasha_02.jpg",
    "./images/Prasha_03.jpg",
];


const profileSliderImage =
    document.getElementById("profileSliderImage");


const currentProfileNumber =
    document.getElementById("currentProfileNumber");


/*
   Start from first image
*/

let currentProfileImage = 0;


/*
   Change image function
*/

function changeProfileImage() {

    /*
       Start fade-out animation
    */

    profileSliderImage.classList.add("image-changing");


    /*
       Wait for fade-out
    */

    setTimeout(() => {

        /*
           Move to next image
        */

        currentProfileImage++;

        /*
           If we reach image 3,
           go back to image 1
        */

        if (
            currentProfileImage >= profileImages.length
        ) {

            currentProfileImage = 0;

        }


        /*
           Change image
        */

        profileSliderImage.src =
            profileImages[currentProfileImage];


        /*
           Change counter

           01
           02
           03
        */

        currentProfileNumber.textContent =
            String(currentProfileImage + 1)
                .padStart(2, "0");


        /*
           Fade image back in
        */

        setTimeout(() => {

            profileSliderImage.classList.remove(
                "image-changing"
            );

        }, 100);

    }, 700);

}


/*
   CHANGE EVERY 15 SECONDS

   15000 milliseconds = 15 seconds
*/

setInterval(
    changeProfileImage,
    5000
);
/*idea for profile picture*/

const projectImage = document.getElementById("projectImage");
const imageIndex = document.getElementById("imageIndex");
const imageTotal = document.getElementById("imageTotal");
const thumbnailRow = document.getElementById("thumbnailRow");
const projectKicker = document.getElementById("projectKicker");
const projectTitle = document.getElementById("projectTitle");
const projectDescription = document.getElementById("projectDescription");
const projectTech = document.getElementById("projectTech");
const projectLink = document.getElementById("projectLink");
const projectProgress = document.getElementById("projectProgress");

let currentProject = 0;
let currentImage = 0;
let imageTimer;

function renderProject(index) {
  const project = projects[index];
  currentProject = index;
  currentImage = 0;

  projectKicker.textContent = project.kicker;
  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;
  projectLink.href = project.link;

  projectTech.innerHTML = project.tech
    .map(item => `<span>${item}</span>`)
    .join("");

  imageTotal.textContent = String(project.images.length).padStart(2, "0");

  renderThumbnails(project);
  showProjectImage(0);

  const percentage = ((index + 1) / projects.length) * 100;
  projectProgress.style.width = `${percentage}%`;
}

function renderThumbnails(project) {
  thumbnailRow.innerHTML = project.images.map((src, index) => `
    <button class="thumbnail ${index === 0 ? "active" : ""}" data-index="${index}" aria-label="Show screenshot ${index + 1}">
      <img src="${src}" alt="Project screenshot ${index + 1}">
    </button>
  `).join("");

  thumbnailRow.querySelectorAll(".thumbnail").forEach(button => {
    button.addEventListener("click", () => {
      showProjectImage(Number(button.dataset.index));
      restartImageTimer();
    });
  });
}

function showProjectImage(index) {
  const images = projects[currentProject].images;
  currentImage = index;

  projectImage.style.animation = "none";
  void projectImage.offsetWidth;
  projectImage.style.animation = "imagePop .6s ease";

  projectImage.src = images[index];
  imageIndex.textContent = String(index + 1).padStart(2, "0");

  thumbnailRow.querySelectorAll(".thumbnail").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
}

function nextImage() {
  const total = projects[currentProject].images.length;
  showProjectImage((currentImage + 1) % total);
}

function restartImageTimer() {
  clearInterval(imageTimer);
  imageTimer = setInterval(nextImage, 3000);
}

document.getElementById("nextProject").addEventListener("click", () => {
  renderProject((currentProject + 1) % projects.length);
  restartImageTimer();
});

document.getElementById("prevProject").addEventListener("click", () => {
  renderProject((currentProject - 1 + projects.length) % projects.length);
  restartImageTimer();
});

renderProject(0);
restartImageTimer();

/* Auto-change project every 9 seconds */
setInterval(() => {
  renderProject((currentProject + 1) % projects.length);
  restartImageTimer();
}, 9000);

/* Scroll reveal */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* Subtle mouse glow */
const glow = document.querySelector(".cursor-glow");
window.addEventListener("mousemove", e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});
