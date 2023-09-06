import { useState, useEffect } from 'react'
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { projectFirestore } from '@/firebase/config'

export type TodoType = {
    id: string
    name: string
    description: string
    time: string
}

const useTodos = () => {
    const [todos, setTodos] = useState<TodoType[]>([])
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

    useEffect(() => {
        const todoCollection = collection(projectFirestore, 'todos')
        const unsubscribe = onSnapshot(todoCollection, (snapshot) => {
            const todoList: TodoType[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TodoType))

            const sortedTodos = todoList.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

            setTodos(sortedTodos)
        })

        return () => unsubscribe()
    }, [])

    const deleteTodo = async (id: string) => {
        try {
            const todoRef = doc(projectFirestore, 'todos', id)
            await deleteDoc(todoRef)
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
            setIsSnackbarOpen(true)
        } catch (error) {
            console.error('Chyba při mazání TODO:', error)
        }
    }

    const closeSnackbar = () => {
        setIsSnackbarOpen(false)
    }

    return { todos, deleteTodo, isSnackbarOpen, closeSnackbar }
}

export default useTodos
