<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import GameOfLife from '@/game-of-life';
import drawLine from '@/canvas/draw';
import ClearIcon from '@/components/icons/ClearIcon.vue';
import PauseIcon from '@/components/icons/PauseIcon.vue';
import RandomIcon from '@/components/icons/RandomIcon.vue';
import PlayIcon from '@/components/icons/PlayIcon.vue';

const canvas = ref();
const timer = ref(null);
const deltaTime = ref(100);

const isRunning = ref(false);

const sizePixel = 20;

const width = Math.floor(window.innerWidth / sizePixel) + 5;
// 16:9 aspect ratio
const height = Math.floor(width * 9 / 16); // Math.floor(window.innerHeight / sizePixel),
const rect = {
    width,
    height,
};

const gameOfLife = GameOfLife(rect.width, rect.height);

onMounted(() => {
    canvas.value.width = Math.floor(rect.width * sizePixel);
    canvas.value.height = Math.floor(rect.height * sizePixel);

    draw();
});

onBeforeUnmount(() => {
    clearInterval(timer.value);
});

const stop = () => {
    clearInterval(timer.value);
    isRunning.value = false;
    draw();
};

const start = () => {
    if (!isRunning.value) {
        isRunning.value = true;
        runGameOfLife();
        timer.value = setInterval(() => {
            runGameOfLife();
        }, deltaTime.value);
    }
};

const clear = () => {
    gameOfLife.clear();
    draw();
};

const random = () => {
    gameOfLife.random();
    draw();
};

const runGameOfLife = () => {
    draw();
    gameOfLife.next();
};

const addCell = () => {
    if (!isRunning.value) {
        var canvasRect = canvas.value.getBoundingClientRect();

        const xRaw = event.clientX - canvasRect.left;
        const yRaw = event.clientY - canvasRect.top;

        const y = Math.floor(xRaw / sizePixel);
        const x = Math.floor(yRaw / sizePixel);

        gameOfLife.toggleCell(x, y);

        draw();
    }
};

const onMouseMove = () => {
    if (!isRunning.value) {
        var canvasRect = canvas.value.getBoundingClientRect();

        const xRaw = event.clientX - canvasRect.left;
        const yRaw = event.clientY - canvasRect.top;

        const x = Math.floor(xRaw / sizePixel);
        const y = Math.floor(yRaw / sizePixel);

        draw({ x, y });
    }
};

const onMouseLeave = () => {
    if (!isRunning.value) {
        draw();
    }
};

const draw = (withPixel: any | null = null) => {
    const ctx = canvas.value.getContext('2d');

    ctx.clearRect(0, 0, rect.width * sizePixel, rect.height * sizePixel);

    const backgroundColor = 'rgba(0, 0, 0, 0.1)';
    for (let i = 0; i <= rect.width; i++) {
        drawLine(ctx, i * sizePixel, 0, i * sizePixel, rect.height * sizePixel, backgroundColor, 1);
    }
    for (let i = 0; i <= rect.height; i++) {
        drawLine(ctx, 0, i * sizePixel, rect.width * sizePixel, i * sizePixel, backgroundColor, 1);
    }

    const cells = gameOfLife.cells();

    for (let row = 0; row < rect.height; row++) {
        for (let col = 0; col < rect.width; col++) {
            const index = (row * rect.width) + col;
            if (cells[index] === 1) {
                ctx.fillStyle = "rgba(114, 2, 250, 0.7)";
                ctx.fillRect(
                    col * sizePixel,
                    row * sizePixel,
                    sizePixel,
                    sizePixel
                );
            }
        }
    }

    if (withPixel) {
        ctx.fillStyle = "rgba(250, 246, 2, 0.3)";
        ctx.fillRect(
            withPixel.x * sizePixel,
            withPixel.y * sizePixel,
            sizePixel,
            sizePixel
        );
    }
};
</script>

<template>
    <div id="gol-dashboard">
        <div class="controls">
            <button type="button" v-if="isRunning" @click="stop" title="stop the simulation">
                <PauseIcon />
            </button>
            <button type="button" v-else @click="start" title="execute the simulation">
                <PlayIcon />
            </button>
            <button type="button" :disabled="isRunning" @click="clear" title="clear the tab">
                <ClearIcon />
            </button>
            <button type="button" :disabled="isRunning" @click="random" title="random">
                <RandomIcon />
            </button>
        </div>
        <div class="canvas-container">
            <canvas id="game-of-life-component-canvas" ref="canvas" width="1" height="1" @click="addCell"
                @mousemove="onMouseMove" @mouseleave="onMouseLeave"></canvas>
        </div>
    </div>
</template>

<style lang="scss">
#gol-dashboard {
    position: absolute;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 10;

    & .controls {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1000;

        & button {
            background: transparent;
            border: none;
            padding: 5px;

            &:hover {
                background-color: rgba(114, 2, 250, 0.2);
            }

            &:disabled {
                background-color: transparent;
                opacity: 0.3;
            }
        }
    }

    & .canvas-container {
        opacity: 0.3;
        overflow: hidden;
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>