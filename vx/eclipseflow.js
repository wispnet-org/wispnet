 const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    document.body.style.background = "black";
    
    document.body.appendChild(canvas);
    
    const circles = [];
    
    function createCircle() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        circles.push({ x, y, radius: 10, alpha: 1 });
    }
    
    function drawCircles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < circles.length; i++) {
            let c = circles[i];
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${c.alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            c.radius += 0.5;
            c.alpha -= 0.01;
            if (c.alpha <= 0) circles.splice(i, 1);
        }
    }
    
    function animate() {
        drawCircles();
        if (Math.random() < 0.1) createCircle();
        requestAnimationFrame(animate);
    }
    
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    animate();