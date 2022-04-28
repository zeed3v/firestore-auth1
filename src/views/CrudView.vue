<template>
    <div v-if="isAuthenticated">
        <h1>Crud</h1>
        <CargandoView v-if="cargando" />
        <div v-else>
            <ErrorView v-if="pintarError"/>
            <TodoForm />
            <TodoPintar 
                v-for="todo in todos" :key="todo.id" :todo="todo"
            />
            <p v-if="todos.length === 0">
                Sin tareas pendientes
            </p>
        </div>
    </div>
</template>

<script>
import {useAuth} from '@vueuse/firebase'
import {useDb} from '../composables/useDb'

import CargandoView from '../components/CargandoView.vue'
import ErrorView from '../components/ErrorView.vue'
import TodoForm from '../components/TodoForm.vue'
import TodoPintar from '../components/TodoPintar.vue'


import { computed, onMounted, provide, ref } from '@vue/runtime-core'
export default {
    components: {CargandoView, ErrorView, TodoForm, TodoPintar},
    setup() {
        const {isAuthenticated} = useAuth()
        const {getTodos, cargando} = useDb()
        const todos = ref ([])
        const error = ref(null)

        provide('error', error)
        provide('todos', todos)

        const pintarError = computed(() => error.value ? true:false)

        onMounted(async() => {
            todos.value = await getTodos()
            if(todos.value.res){
                console.log(todos.value.error)
                error.value = todos.value.error
            }
        })

        return {isAuthenticated, todos, cargando, pintarError}
    },
}
</script>