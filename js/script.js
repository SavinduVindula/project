
// ================= OPENING SCREEN =================

const video = document.getElementById("intro-video");
const btn = document.getElementById("enter-btn");
const screen = document.getElementById("opening-screen");
const bgMusic = document.getElementById("bg-music");

// Show button and stop video 2 seconds before the end
video.addEventListener("timeupdate", () => {
    if (video.duration > 0 && video.currentTime >= video.duration - 2) {
        video.pause();
        btn.style.opacity = "1";
    }
});

// Fallback just in case
video.addEventListener("ended", () => {
    btn.style.opacity = "1";
});

// Click to enter
btn.addEventListener("click", () => {
    screen.style.opacity = "0";

    // Play background music
    if (bgMusic) {
        bgMusic.play().catch(e => console.log("Audio play failed: ", e));
    }

    setTimeout(() => {
        screen.style.display = "none";
        document.body.classList.remove("no-scroll");
    }, 800);
});

// ================= CALENDAR =================
// ================= MUSIC BUTTON TOGGLE =================

const musicBtn = document.getElementById("musicBtn");

if (musicBtn && bgMusic) {
    musicBtn.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.classList.add("playing");
        } else {
            bgMusic.pause();
            musicBtn.classList.remove("playing");
        }
    });
}

// ================= RSVP (Google Sheets) =================

const scriptURL = "https://script.google.com/macros/s/AKfycbwQ0QWLOogmvv0mi4LjHL4mx8dtQDh-vL-rYUxaeqLwGf63nPLPWaKIC0vdyeDOzJgVDw/exec"; // paste here

document.getElementById("rsvpForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        attending: formData.get("attending")
    };

    const msg = document.getElementById("form-msg");

    msg.innerText = "Sending...";

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(() => {
            msg.innerText = "Thank you! ❤️";
            this.reset();
        })
        .catch(() => {
            msg.innerText = "Something went wrong!";
        });
});