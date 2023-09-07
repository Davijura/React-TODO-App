import { useState } from 'react'
import { useAppDispatch } from '@/redux/store'
import { createTodo } from '@/redux/todosSlices'
import dayjs from 'dayjs'

const useAddTodo = () => {
    const dispatch = useAppDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [nameError, setNameError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)

    const addTodo = async () => {
        let hasError = false

        if (name.length < 2) {
            setNameError(true)
            hasError = true
        } else {
            setNameError(false)
        }

        if (description.length < 2) {
            setDescriptionError(true)
            hasError = true
        } else {
            setDescriptionError(false)
        }

        if (hasError) {
            setSnackbarMessage('Name and Description must be at least 2 characters long.')
            setSnackbarSeverity('error')
            setIsSnackbarOpen(true)
            return
        }

        try {
            const newTodo = {
                name,
                description,
                time: selectedDate ? selectedDate.format('YYYY-MM-DD HH:mm:ss') : null,
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
        nameError,
        descriptionError,
        addTodo,
        isSnackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        closeSnackbar,
        selectedDate,
        setSelectedDate,
    }
}

export default useAddTodo
