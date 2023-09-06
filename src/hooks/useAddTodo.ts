import { useState } from 'react'
import { useAppDispatch } from '@/redux/store'
import { createTodo } from '@/redux/todosSlices'
import { serverTimestamp } from 'firebase/firestore'

const useAddTodo = () => {
    const dispatch = useAppDispatch()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

    const addTodo = async () => {
        try {
            const newTodo = {
                name,
                description,
                time: serverTimestamp(),
            }
            await dispatch(createTodo(newTodo))
            setSnackbarMessage('Todo successfully created!')
            setSnackbarSeverity('success')
            setIsSnackbarOpen(true)
            setName('')
            setDescription('')
        } catch (error) {
            setSnackbarMessage('Error while adding todo.')
            setSnackbarSeverity('error')
            setIsSnackbarOpen(true)
            console.error('Error adding todo: ', error)
        }
    }

    const closeSnackbar = () => {
        setIsSnackbarOpen(false)
    }

    return {
        name,
        setName,
        description,
        setDescription,
        addTodo,
        isSnackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        closeSnackbar,
    }
}

export default useAddTodo
