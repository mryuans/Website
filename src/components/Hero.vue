<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import * as THREE from "three";
import gsap from "gsap";

const container = ref<HTMLElement>();
const animeText = ref<HTMLElement>();
const textSpan = ref<HTMLElement>();

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.OrthographicCamera;
let animationFrameId: number;

const fullText = "Hello Wooorld....";
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
let lineEdgeColor = 0x0
if (isDarkMode) {
    lineEdgeColor = 0xffffff; 
} else {
    lineEdgeColor = 0x000000;
}

onMounted(() => {
    if (!container.value) return;

    // ==========================================
    // 1. Scene & Camera Setup
    // ==========================================
    scene = new THREE.Scene();
    const d = 12; 
    
    // We want the hero canvas to span the full window width/height
    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;
    const aspect = viewWidth / viewHeight;
    
    camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    camera.position.set(0, 0, 50); 
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(viewWidth, viewHeight);
    renderer.setPixelRatio(window.devicePixelRatio); 
    container.value.appendChild(renderer.domElement);

    // ==========================================
    // 2. Lighting
    // ==========================================
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    // ==========================================
    // 3. Penrose Blocks Building
    // ==========================================
    const group = new THREE.Group();
    const blockSize = 2.1;
    const numBlocks = 5; 
    const blocks: THREE.Mesh[] = [];
    const edges: THREE.LineSegments[] = [];

    function createBlock(x: number, y: number, z: number) {
        const geo = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
        
        // Solid Material (initial opacity 0)
        const mat = new THREE.MeshLambertMaterial({
            color: 0x60a5fa, 
            transparent: true,
            opacity: 0 
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x * blockSize, y * blockSize, z * blockSize);
        group.add(mesh);
        blocks.push(mesh);

        // Edge Material
        const edgesGeo = new THREE.EdgesGeometry(geo);
        const edgesMat = new THREE.LineBasicMaterial({
            color: lineEdgeColor,
            transparent: true,
            linewidth: 5,
            opacity: 1 
        });
        const line = new THREE.LineSegments(edgesGeo, edgesMat);
        
        // Start completely hidden
        line.geometry.setDrawRange(0, 0); 
        line.userData = { drawCount: 0 }; 

        mesh.add(line);
        edges.push(line);
    }

    // U-shaped path
    for (let i = 0; i < numBlocks; i++) createBlock(i, 0, 0); 
    for (let i = 1; i < numBlocks; i++) createBlock(numBlocks - 1, i, 0); 
    for (let i = 1; i < numBlocks; i++) createBlock(numBlocks - 1, numBlocks - 1, i); 

    const offset = ((numBlocks - 1) * blockSize) / 2;
    group.position.set(-offset, -offset, -offset);

    const wrapper = new THREE.Group();
    wrapper.add(group);
    scene.add(wrapper);

    wrapper.rotation.order = 'YXZ';

    // ==========================================
    // 4. GSAP Timeline
    // ==========================================
    const easeType = "power2.inOut"; 
    const tl = gsap.timeline({ delay: 0.5 }); 

    // Step 1: Draw Skeleton
    tl.to(edges.map(e => e.userData), {
        drawCount: 24,
        duration: 2.5,
        ease: easeType,
        stagger: { each: 0.1, from: "start" },
        onUpdate: () => {
            edges.forEach(line => {
                const currentCount = Math.floor(line.userData.drawCount / 2) * 2;
                line.geometry.setDrawRange(0, currentCount);
            });
        }
    });

    // Step 2: Fill and Fade Edges
    tl.to(blocks.map(b => (b.material as THREE.Material)), {
        opacity: 1,
        duration: 1.5,
        ease: easeType,
        stagger: 0.05 
    }, "-=1");

    tl.to(edges.map(e => (e.material as THREE.Material)), { 
        opacity: 0.2, 
        duration: 1.2 
    }, "<"); 

    // Step 3: Rotate into Penrose Loop
    tl.to(wrapper.rotation, {
        x: Math.atan(1 / Math.sqrt(2)) + 0.03, 
        y: -Math.PI / 4,                
        z: 0,                           
        duration: 1.5,
        ease: easeType
    });

    // Step 3.5: Remove edges
    tl.to(edges.map(e => (e.material as THREE.Material)), {
        opacity: 0, 
        duration: 1, 
        ease: "sine.out" 
    }, "+=0.05"); 

    // Step 4: Shrink and Move Left
    tl.to(wrapper.position, {
        x: -d * 0.6, 
        duration: 1.4,
        ease: easeType
    }, "+=0.2"); 
    
    tl.to(wrapper.scale, {
        x: 0.7, y: 0.7, z: 0.7,
        duration: 1.4,
        ease: easeType,
        onComplete: () => {
            // Typing Animation begins right after movement completes
            startTyping();
        }
    }, "<"); 

    // Step 5: Infinite hover
    tl.add(() => {
        gsap.to(wrapper.position, {
            y: "+=0.8", 
            duration: 2,
            ease: "sine.inOut", 
            yoyo: true,         
            repeat: -1          
        });
    });

    // ==========================================
    // 5. Render Loop & Resize
    // ==========================================
    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
        const aspect = window.innerWidth / window.innerHeight;
        camera.left = -d * aspect;
        camera.right = d * aspect;
        camera.top = d;
        camera.bottom = -d;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // 6. Typwriter Logic
    // ==========================================

    // initial idea from: https://juejin.cn/post/6996448238618312711
    let charIndex = 0;
    const speed = 130; 

    function startTyping() {
        if (!animeText.value) return;
        animeText.value.style.opacity = "1";
        typeWriter();
    }

    function typeWriter() {
        if (textSpan.value && charIndex < fullText.length) {
            textSpan.value.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, speed);
        }
    }
});

onUnmounted(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (renderer) renderer.dispose();
    // Assuming cleanup for event listeners etc.
    window.removeEventListener('resize', () => {});
});
</script>

<template>
    <div id="hero-wrapper">
        <div ref="container" id="canvas-container"></div>
        <div ref="animeText" id="animeText">
            <span ref="textSpan"></span><span id="cursor">_</span>
        </div>
        
        <!-- Animated scroll down indicator -->
        <div id="scroll-indicator">
            <font-awesome-icon :icon="['fas', 'angle-down']" class="scroll-icon" />
        </div>
    </div>
</template>

<style scoped lang="stylus">
#hero-wrapper
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0; /* Changed from -1 so it stays ABOVE body background */
    pointer-events: none; /* Let clicks pass through if needed, though they shouldn't block content below */
    display: flex;
    justify-content: center;
    align-items: center;

#canvas-container
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;

#animeText
    position: absolute;
    right: 25vw; /* Positioned nicely to the right */
    z-index: 2;
    opacity: 0; 
    transition: opacity 0.5s;
    font-family: "Libertinus Serif", serif;
    font-style: italic;
    font-size: 40px; 
    color: var(--body-text-color);
    white-space: nowrap; 

#cursor
    vertical-align: text-bottom;
    animation: cursorBlink 1s infinite;

@keyframes cursorBlink
    0%, 100%
        opacity: 0;
    50%
        opacity: 1;

#scroll-indicator
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2rem;
    color: var(--body-text-color);
    opacity: 0.7;
    animation: bounceDown 2s infinite ease-in-out;
    z-index: 20;

@keyframes bounceDown
    0%, 100%
        transform: translate(-50%, 0);
    50%
        transform: translate(-50%, 15px);

@media (max-width: 768px)
    #animeText
        font-size: 40px;
        right: 5vw;
        top: 60vh;
</style>
