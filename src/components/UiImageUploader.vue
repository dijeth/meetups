<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': state === StateType.UPLOADING }"
      :style="state === StateType.UPLOADED ? `--bg-url: url('${image}')` : ''"
      @click="clickHandler"
    >
      <span class="image-uploader__text">{{ title }}</span>
      <input
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        ref="inputRef"
        @change="changeHandler"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const StateType = {
  UPLOADING: 'UPLOADING',
  UPLOADED: 'UPLOADED',
  EMPTY: 'EMPTY',
} as const;

const props = defineProps<{
  preview?: string;
  uploader?: (f: File) => Promise<any>;
}>();

defineOptions({ inheritAttrs: false });
const emit = defineEmits(['select', 'upload', 'error', 'remove']);

const state = ref<(typeof StateType)[keyof typeof StateType]>(props.preview ? StateType.UPLOADED : StateType.EMPTY);
const image = ref<string>(props.preview || '');
const inputRef = ref<HTMLInputElement>();

const title = computed((): string => {
  switch (state.value) {
    case StateType.EMPTY:
      return 'Загрузить изображение';

    case StateType.UPLOADING:
      return 'Загрузка...';

    default:
    case StateType.UPLOADED:
      return 'Удалить изображение';
  }
});

const clickHandler = computed(() => {
  return state.value === StateType.UPLOADED ? removeHandler : undefined;
});

const removeHandler = (event: MouseEvent) => {
  event.preventDefault();
  state.value = StateType.EMPTY;
  inputRef.value!.value = '';
  emit('remove');
};

const changeHandler = async (event: Event) => {
  const { files } = event.target as HTMLInputElement;
  if (!files) {
    return;
  }

  image.value = URL.createObjectURL(files[0]);
  emit('select', files[0]);

  if (!props.uploader) {
    state.value = StateType.UPLOADED;
    return;
  }

  const storedState = state.value;
  state.value = StateType.UPLOADING;
  try {
    const response = await props.uploader(files[0]);
    state.value = StateType.UPLOADED;
    emit('upload', response);
  } catch (err) {
    inputRef.value!.value = '';
    state.value = storedState;
    emit('error', err);
  }
};
</script>

<style scoped>
.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
