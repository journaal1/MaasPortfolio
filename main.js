var jsonDir = "public/config.json";
var imageDir = "public/images/mainPage";
var imageContainer = document.querySelector("#imageHolder");
var fileextension = ".jpg";
var checking = true;
var images = [];
var projects = [];

function fetchJSONData() {
    fetch(jsonDir)
        .then(response => {
            return response.json();
        })
        .then(data => {
            readJSONData(data);
        })
        .catch(error => console.error('Failed to fetch data:', error));
}

function readJSONData(data) {
    if (data.images && Array.isArray(data.images)) {
        data.images.forEach(image => {
            if (image.image_title) {
                images.push(image);
            }
        });
    } else {
        console.error('Invalid JSON structure: "images" array not found.');
    }

    if (data.project && Array.isArray(data.project)) {
        data.project.forEach(project => {
            if (project.title) {
                projects.push(project);
            }
        });
    }


    loadAndDisplayImages();
    loadAndDisplayProjectInfo();
}


function loadAndDisplayImages() {
    const imageElements = [];

    images.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = `${imageDir}/${image.image_title}${fileextension}`;
        imgElement.alt = image.image_title;
        imgElement.classList.add("border-2", "mb-4");
        let hoverTimeout;
        imgElement.addEventListener("mouseenter", () => {
            hoverTimeout = setTimeout(() => {
                showImageLabel(image);
            }, 100);
        });

        imgElement.addEventListener("mousemove", (event) => {
            if (hoverTimeout) {
                updateLabelPosition(event);
            }
        });

        imgElement.addEventListener("mouseleave", () => {
            clearTimeout(hoverTimeout);
            hideImageLabel();
        });

        imageElements.push(imgElement);
    });


    const randomizedImages = shuffleArray(imageElements);

    randomizedImages.forEach((img) => {
        imageContainer.appendChild(img);
    });
}

function loadAndDisplayProjectInfo() {
    const imgElement = document.getElementById("projectImageTitle");
    const projectTitle = document.getElementById("imageTitle");
    const projectInfo = document.getElementById("projectDescription");


    projectTitle.textContent = `${projects[0].title}`;
    projectInfo.textContent = `${projects[0].description}`;
    imgElement.src = `${imageDir}/${images[projects[0].imageId].image_title}${fileextension}`;
}



function showImageLabel(image) {
    const imageLabel = document.getElementById("imageLabel");
    const imageTitle = document.getElementById("imageTitle");
    const imageInfo = document.getElementById("imageDate");

    imageTitle.textContent = `${image.image_title}`;
    imageInfo.textContent = `${image.description} - ${image.date}`;

    imageLabel.classList.remove("hidden");
}


function updateLabelPosition(event) {
    const imageLabel = document.getElementById("imageLabel");
    const offset = 10;

    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    imageLabel.style.top = `${event.clientY + scrollY + offset}px`;
    imageLabel.style.left = `${event.clientX + scrollX + offset}px`;
}

function hideImageLabel() {
    const imageLabel = document.getElementById("imageLabel");
    imageLabel.classList.add("hidden");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

fetchJSONData();



document.getElementById("scrollToBottom").addEventListener("click", function () {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
});

let isScrolling;

window.addEventListener("scroll", () => {
    hideImageLabel();

    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
        console.log("Scrolling has stopped");
    }, 100);
});

