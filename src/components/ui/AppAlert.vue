<!-- src/components/ui/AppAlert.vue -->
<template>
  <Transition name="slide-fade">
    <div 
      v-if="visible" 
      class="fixed bottom-4 right-4 z-50 max-w-sm"
      role="alert"
      aria-live="polite"
    >
      <div :class="[
        'flex items-start gap-3 p-4 rounded-lg shadow-lg border',
        variantClasses[type]
      ]">
        <!-- Icon -->
        <component :is="icons[type]" class="h-5 w-5 shrink-0 mt-0.5" />
        
        <!-- Content -->
        <div class="flex-1 min-w-0">
          <p class="font-medium text-sm">{{ title }}</p>
          <p class="text-sm opacity-90 mt-0.5">{{ message }}</p>
        </div>
        
        <!-- Close button -->
        <button 
          @click="close"
          class="p-1 hover:bg-black/10 rounded transition-colors"
          aria-label="Tutup notifikasi"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ type: 'info', message: '' })
  },
  duration: {
    type: Number,
    default: 4000
  }
})

const emit = defineEmits(['update:modelValue'])

const visible = ref(false)
const title = ref('')
const message = ref('')
const type = ref('info')

// Variant classes untuk styling
const variantClasses = {
  success: 'bg-green-50 border-green-200 text-green-900',
  warning: 'bg-amber-50 border-amber-200 text-amber-900',
  error: 'bg-red-50 border-red-200 text-red-900',
  info: 'bg-blue-50 border-blue-200 text-blue-900'
}

// Icons mapping
const icons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info
}

// Watch untuk auto-show/hide
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal?.message) {
      type.value = newVal.type || 'info'
      title.value = getTitleByType(type.value)
      message.value = newVal.message
      visible.value = true
      
      // Auto-hide setelah duration
      if (props.duration > 0) {
        setTimeout(() => {
          visible.value = false
        }, props.duration)
      }
    } else {
      visible.value = false
    }
  },
  { immediate: true }
)

function getTitleByType(type) {
  const titles = {
    success: 'Berhasil!',
    warning: 'Perhatian!',
    error: 'Error!',
    info: 'Info'
  }
  return titles[type] || 'Info'
}

function close() {
  visible.value = false
  emit('update:modelValue', { type: type.value, message: '' })
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>