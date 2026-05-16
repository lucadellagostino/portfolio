const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
});

const hoverElements = document.querySelectorAll("a, button");

hoverElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
    });

    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
    });
});

function downloadCV(e) {
  e.preventDefault();

  const link = document.createElement('a');
  link.href = "assets/download/luca_dell'agostino_cv.pdf";
  link.download = "luca_dellagostino_cv.pdf";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const floatingNav = document.querySelector(".floating-nav");
const floatingAnchor = document.querySelector(".floating-nav-anchor");
const stopElement = document.querySelector("#footer");

const navBottom =
    window.innerWidth <= 768 ? 20 :
    window.innerWidth <= 1200 ? 25 :
    35;
const appearBefore =
    window.innerWidth <= 768 ? 60 :
    window.innerWidth <= 1200 ? 70 :
    80;

const stopBeforeFooter =
    window.innerWidth <= 768 ? 60 :
    window.innerWidth <= 1200 ? 90 :
    120;

window.addEventListener("scroll", () => {

    const anchorRect = floatingAnchor.getBoundingClientRect();
    const stopRect = stopElement.getBoundingClientRect();

    const navNaturalBottom = anchorRect.bottom;
    const fixedBottomLine = window.innerHeight - navBottom;

    if (navNaturalBottom > window.innerHeight + appearBefore) {
        floatingNav.classList.add("hidden");
        floatingNav.classList.remove("fixed");
        floatingNav.style.transform = "translateY(0)";
        return;
    }

    floatingNav.classList.remove("hidden");

    if (navNaturalBottom <= fixedBottomLine) {
        floatingNav.classList.add("fixed");
    } else {
        floatingNav.classList.remove("fixed");
        floatingNav.style.transform = "translateY(0)";
        return;
    }

    const navHeight = floatingNav.offsetHeight;

    const overlap =
    window.innerHeight - stopRect.top + stopBeforeFooter;

    if (overlap > 0) {
    floatingNav.style.transform = `translateY(-${overlap}px)`;
    } else {
    floatingNav.style.transform = "translateY(0)";
    }
});

const projects = document.querySelectorAll(".project");
const prevBtn = document.querySelector(".nav-prev");
const nextBtn = document.querySelector(".nav-next");

function getCurrentProjectIndex() {

    let currentIndex = 0;

    projects.forEach((project, index) => {

        const rect = project.getBoundingClientRect();

        if (rect.top <= window.innerHeight / 2) {
            currentIndex = index;
        }

    });

    return currentIndex;
}

function updateNavLinks() {

    const currentIndex = getCurrentProjectIndex();

    const prevProject = projects[currentIndex - 1];
    const nextProject = projects[currentIndex + 1];


    if (prevProject) {

        prevBtn.href = `#${prevProject.id}`;
        prevBtn.style.opacity = "1";
        prevBtn.style.pointerEvents = "auto";

    } else {

        prevBtn.href = "#top";
        prevBtn.style.opacity = "1";
        prevBtn.style.pointerEvents = "auto";

    }

    if (nextProject) {

        nextBtn.href = `#${nextProject.id}`;
        nextBtn.style.opacity = "1";
        nextBtn.style.pointerEvents = "auto";

    } else {

        nextBtn.href = "#footer";
        nextBtn.style.opacity = "1";
        nextBtn.style.pointerEvents = "auto";

    }

}

window.addEventListener("scroll", updateNavLinks);
window.addEventListener("load", updateNavLinks);


const openProjectMenu = document.getElementById("openProjectMenu");
const closeProjectMenu = document.getElementById("closeProjectMenu");
const projectMenu = document.getElementById("projectMenu");

projectMenu.classList.add("no-transition");
projectMenu.classList.remove("is-open");
document.body.classList.remove("menu-open");

requestAnimationFrame(() => {
    projectMenu.classList.remove("no-transition");
});

openProjectMenu.addEventListener("click", () => {
    projectMenu.classList.add("is-open");
    document.body.classList.add("menu-open");
});

closeProjectMenu.addEventListener("click", () => {
    projectMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
});

const projectLinks = document.querySelectorAll(".project-menu-list a");

projectLinks.forEach(link => {
    link.addEventListener("click", () => {
        projectMenu.classList.remove("is-open");
        document.body.classList.remove("menu-open");
    });
});