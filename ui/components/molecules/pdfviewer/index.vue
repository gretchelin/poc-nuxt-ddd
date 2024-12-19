<template>
  <div class="pdf-viewer--container">
    <!-- Navigation Controls -->
    <div class="pdf-viewer--navigation">
      <img
        src="public/img/logo/logo-mydigilearn.svg"
        alt="mydigilearn"
        class="ml-4"
      >
      <div class="flex items-center gap-2">
        <!-- Previous Page Button -->
        <Icon
          name="mdi-arrow-back"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-white rounded-md cursor-pointer"
          @click="goToPreviousPage"
        />

        <!-- Page Number Display -->
        <span class="mx-2">{{ currentPage }} / {{ totalPages }}</span>

        <!-- Next Page Button -->
        <Icon
          name="mdi-arrow-forward"
          class="px-4 py-2 text-white rounded-md cursor-pointer"
          @click="goToNextPage"
        />

        <span class="mx-2 font-light">|</span>

        <!-- Zoom Controls -->
        <div class="flex items-center space-x-2">
          <span
            class="px-4 py-2 text-lg text-white rounded-md cursor-pointer"
            @click="zoomOut"
          >
            -
          </span>
          <span>{{ zoomLevel }}%</span>
          <span
            class="px-4 py-2 text-lg text-white rounded-md cursor-pointer"
            @click="zoomIn"
          >
            +
          </span>
        </div>
      </div>
    </div>

    <!-- PDF Canvas -->
    <div class="m-4">
      <canvas
        ref="pdfCanvas"
        class="w-full border border-gray-300 rounded-md"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';

// PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface IProps {
  pdfUrl: string;
}

const props = withDefaults(defineProps<IProps>(), {
  pdfUrl: '',
});

// Reactive states
const currentPage = ref(1);
const totalPages = ref(0);
const zoomLevel = ref(100);
let pdfDoc;
const pdfCanvas = ref<HTMLCanvasElement | null>(null);

// Initialize PDF document
const loadPdf = async () => {
  try {
    fetch(props.pdfUrl)
      .then((res) => {
        return res.arrayBuffer();
      })
      .then(async (res) => {
        const loadingTask = pdfjsLib.getDocument(res);
        pdfDoc = await loadingTask.promise;
        totalPages.value = pdfDoc.numPages;
        renderPage(currentPage.value);
      });
  }
  catch (error) {
    console.error('Error loading PDF:', error);
  }
};

// Render specific page
const renderPage = async (pageNum: number) => {
  if (!pdfDoc || !pdfCanvas.value) return;

  try {
    const page = await pdfDoc.getPage(pageNum);
    const context = pdfCanvas.value.getContext('2d');
    const viewport = page.getViewport({ scale: zoomLevel.value / 100 });

    pdfCanvas.value.height = viewport.height;
    pdfCanvas.value.width = viewport.width;

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;
  }
  catch (error) {
    console.error('Error rendering page:', error);
  }
};

// Page navigation handlers
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Zoom handlers
const zoomIn = () => {
  if (zoomLevel.value < 200) {
    zoomLevel.value += 10;
  }
};

const zoomOut = () => {
  if (zoomLevel.value > 50) {
    zoomLevel.value -= 10;
  }
};

// Watchers
watch(currentPage, () => {
  renderPage(currentPage.value);
});

watch(zoomLevel, () => {
  renderPage(currentPage.value);
});

// On mounted
onMounted(() => {
  loadPdf();
});
</script>

<style scoped>
.pdf-viewer--container {
  @apply border w-full bg-gray-200 rounded-xl;
  margin: 0 auto;
}

.pdf-viewer--navigation {
  @apply flex justify-between items-center mb-4 bg-gray-800 text-white p-2 rounded-t-xl;
}

.pdf-viewer--container canvas {
  display: block;
  margin: 0 auto;
  background-color: #f0f0f0;
}
</style>
