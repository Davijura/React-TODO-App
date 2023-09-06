import { useState } from 'react'
import { useAppDispatch } from '@/redux/store'
import { createTodo } from '@/redux/todosSlices'
import React from 'react'
import dayjs from 'dayjs'

const useAddTodo = () => {
    const dispatch = useAppDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
    const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs | null>(null)

    const addTodo = async () => {
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
