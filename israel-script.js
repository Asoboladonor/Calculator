const screen = document.getElementById("screen");

// All operators the calculator should treat as operators:
const operators = ["+", "-", "*", "/", "×", "÷"];

//reset if screen contains ERROR
function resetIfError() {
    if (screen.value === "Error") screen.value = "";
}

// ----- NUMBERS -----
document.querySelectorAll(".num").forEach(btn => {
    btn.addEventListener("click", () => {
        resetIfError();
        screen.value += btn.dataset.val;
    });
});

// ----- OPERATORS (ANY operator, with replace-if-last-is-operator logic) -----
document.querySelectorAll(".op").forEach(btn => {
    btn.addEventListener("click", () => {
        resetIfError();

        let last = screen.value.slice(-1);
        let op = btn.dataset.op;

        if (operators.includes(last)) {
            // replace old operator with new one
            screen.value = screen.value.slice(0, -1) + op;
        } else {
            screen.value += op;
        }
    });
});

// ----- CLEAR -----
document.getElementById("clear").addEventListener("click", () => {
    screen.value = "";
});

// ----- DELETE LAST -----
document.getElementById("delete").addEventListener("click", () => {
    resetIfError();
    screen.value = screen.value.slice(0, -1);
});

// ----- PERCENT -----
document.getElementById("percent").addEventListener("click", () => {
    resetIfError();
    try {
        screen.value = eval(
            screen.value.replace(/×/g, "*").replace(/÷/g, "/")
        ) / 100;
    } catch {
        screen.value = "Error";
    }
});

// ----- EQUALS -----
document.getElementById("equals").addEventListener("click", () => {
    resetIfError();
    try {
        const expression = screen.value
            .replace(/×/g, "*")
            .replace(/÷/g, "/");

        screen.value = eval(expression);
    } catch {
        screen.value = "Error";
    }
});

//bs
const brandBtn = document.getElementById('brandBtn');
const contactWidget = document.getElementById('contactWidget');

// Animate from top-center to top-right after 2 seconds
setTimeout(() => {
  brandBtn.classList.add('moved');
}, 2000);

// Toggle contact widget on click
brandBtn.addEventListener('click', () => {
  contactWidget.style.display = contactWidget.style.display === 'block' ? 'none' : 'block';
});

/* Ghost banner */
window.addEventListener("load", () => {
    const banner = document.getElementById("ghost-banner");

    // Fade in after 200ms
    setTimeout(() => {
        banner.style.opacity = "1";
        banner.style.transform = "translateY(0)";
    }, 200);

    // Fade out after 1.5 seconds
    setTimeout(() => {
        banner.style.opacity = "0";
        banner.style.transform = "translateY(10px)";
    }, 1700);

    // Remove from DOM completely after animation
    setTimeout(() => {
        banner.remove();
    }, 2600);
});

//more bs
// Open when button clicked
brandBtn.addEventListener("click", (e) => {
    e.stopPropagation();         // Prevent click from bubbling and closing immediately
    contactWidget.classList.add("open");
});

// Close when clicking anywhere outside widget
document.addEventListener("click", (e) => {
    if (!contactWidget.contains(e.target) && !brandBtn.contains(e.target)) {
        contactWidget.classList.remove("open");
    }
});