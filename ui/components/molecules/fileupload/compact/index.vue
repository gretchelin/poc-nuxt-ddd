<template>
  <div>
    <Label
      :for="id"
      :text="label"
    />
    <div class="flex items-center space-x-2 justify-between border p-2 rounded">
      <div class="flex space-x-2">
        <Button
          v-if="fileName"
          color="secondary"
          size="small"
          type="button"
        >
          <Icon
            name="mdi-file"
            width="20"
            height="20"
            mode="svg"
            class="text-gray-400"
          />
        </Button>
        <Button
          v-else
          color="default"
          size="small"
          type="button"
          class="inline-flex items-center justify-center px-4 py-2 text-sm bg-brand-primary"
        >
          <Icon
            name="mdi-upload"
            width="20"
            height="20"
            mode="svg"
            class="text-teal-500"
          />
        </Button>
        <div class="flex flex-col text-xs">
          <span>{{ fileName ? fileName : 'Upload File' }}</span>
          <span class="text-gray-400">{{ fileType.toUpperCase() }}</span>
        </div>
      </div>

      <Icon
        v-if="fileName"
        name="mdi-delete"
        width="25"
        height="20"
        mode="svg"
        class="text-gray-400 cursor-pointer"
        @click="handleDeleteFile"
      />
      <Button
        v-else
        color="default"
        variant="outlined"
        size="small"
        type="button"
        class="inline-flex items-center justify-center px-4 py-2 text-sm bg-white border-teal-500 text-teal-500 font-semibold rounded-md"
        @click="handleFileUpload"
      >
        <Icon
          name="mdi-upload"
          width="25"
          height="20"
          mode="svg"
          class="text-teal-500"
        />
        Upload
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Label from '#ui/components/atoms/form/label';
import Button from '#ui/components/atoms/button';

interface IProps {
  id: string;
  label: string;
  value: string;
  fileType: string;
  accept: string;
  handleFileUpload: (file: File) => void;
}

const props = withDefaults(defineProps<IProps>(), {
  id: '',
  label: '',
  fileType: '',
});

const fileName = ref<string | null>(null);
const file = ref<File | null>(null);

watchEffect(() => {
  if (props.value) {
    console.log(props.value);
    fileName.value = props.value;
  }
});

const handleFileUpload = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  // fileInput.accept = type === 'pdf' ? '.pdf' : '.ppt';
  fileInput.accept = props.accept;
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files[0]) {
      file.value = fileInput.files[0];
      fileName.value = fileInput.files[0].name;
      if (props.handleFileUpload) {
        props.handleFileUpload(fileInput.files[0]);
      }
    }
  });
  fileInput.click();
};

const handleDeleteFile = () => {
  fileName.value = '';
};
</script>
