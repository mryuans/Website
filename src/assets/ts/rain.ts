import confetti from "canvas-confetti";

let isRaining = false;
let myConfetti: any = null;

export const toggleRain = () => {
    isRaining = !isRaining;

    if (isRaining) {
        if (!myConfetti) {
            const canvas = document.createElement("canvas");
            canvas.style.position = "fixed";
            canvas.style.top = "0";
            canvas.style.left = "0";
            canvas.style.width = "100vw";
            canvas.style.height = "100vh";
            canvas.style.zIndex = "-10"; // Very important: Behind Leftbar/Rightbar but above bg-layer
            canvas.style.opacity = "0.35"; // Soft blend
            canvas.style.pointerEvents = "none";
            document.body.appendChild(canvas);
            myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
        }

        const colors = [
            "#3b82f6", // Blue
            "#60a5fa", // Light blue
            "#a78bfa", // Purple
            "#f472b6", // Pink
            "#ffffff"  // White
        ];

        const frame = () => {
            if (!isRaining) return;

            myConfetti({
                particleCount: 2,
                startVelocity: 0,
                ticks: 500,
                gravity: 0.5, // Slow falling
                origin: {
                    x: Math.random(),
                    // Since particles fall down, start a bit higher than the top edge
                    y: Math.random() * -0.2
                },
                colors: colors,
                shapes: ["circle", "square"],
                scalar: Math.random() * 0.5 + 0.5,
                spread: 10,
                drift: Math.random() - 0.5
            });

            requestAnimationFrame(frame);
        };

        frame();
    }
};
