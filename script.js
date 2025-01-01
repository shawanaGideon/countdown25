class Countdown {
    constructor(el) {
        this.el = el;
        this.targetDate = new Date(el.getAttribute("datetime")); // Corrected attribute reference
        this.createCountDownParts();
        this.countdownFunction();
        this.countdownLoopId = setInterval(this.countdownFunction.bind(this), 1000);
    }

    createCountDownParts() {
        ["days", "hours", "minutes", "seconds"].forEach(part => {
            const partEl = document.createElement("div");
            partEl.classList.add("part", part);
            const textEl = document.createElement("div");
            textEl.classList.add("text");
            textEl.innerText = part;
            const numberEl = document.createElement("div");
            numberEl.classList.add("number");
            numberEl.innerText = 0;
            partEl.append(numberEl, textEl);
            this.el.append(partEl);
            this[part] = numberEl;
        });
    }

    countdownFunction() {
        const currentDate = new Date();
        if (currentDate > this.targetDate) {
            clearInterval(this.countdownLoopId);
            this.showFireworks(); // Trigger fireworks when countdown ends
            return;
        }
        const remaining = this.getRemaining(this.targetDate, currentDate);
        Object.entries(remaining).forEach(([part, value]) => {
            this[part].style.setProperty("--value", value);
            this[part].innerText = value;
        });
    }

    getRemaining(target, now) {
        let seconds = Math.floor((target - now) / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
        return { days, hours, minutes, seconds };
    }

    showFireworks() {
        const container = document.getElementById("fireworks-container");
        const fireworks = new Fireworks(container, {
            rocketsPoint: 50, // Adjust the point of origin
            speed: 2,
            acceleration: 1.95,
            friction: 0.98,
            gravity: 1.5,
            particles: 50,
            traceLength: 3,
            flicker: true,
            explosion: 10,
        });
        fireworks.start();

        // Stop fireworks after 10 seconds
        setTimeout(() => fireworks.stop(), 10000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const countdownEls = document.querySelectorAll(".countdown") || [];
    countdownEls.forEach(countdownEl => new Countdown(countdownEl));
});