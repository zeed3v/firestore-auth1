<template>
  <CargandoView v-if="loading" class="mt-5"/>
  <div v-else>
    <NavbarView />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavbarView from '@/components/NavbarView.vue'
import CargandoView from '@/components/CargandoView.vue'
import {firebase} from '@/firebase'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
  components: {NavbarView, CargandoView},
  setup() {
    const loading = ref(false)

    onMounted(async() => {
      loading.value = true
      await firebase.getCurrentUser()
      loading.value = false
    })

    return{loading}
  },
}
</script>