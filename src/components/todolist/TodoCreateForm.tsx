import { Alert, Box, Button, Card, CardContent, Container, Snackbar, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import useAddTodo from '@/hooks/useAddTodo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '@/redux/todosSlices';
import { RootState } from '@/redux/store';
import dayjs from 'dayjs';

import React from 'react';

export default function TodoList() {
    const { name, setName, description, setDescription, nameError, descriptionError, addTodo, isSnackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar, selectedDate, setSelectedDate } = useAddTodo();
    const todos = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();

    const addTodoWithFeedback = async () => {
        try {
            await addTodo();
        } catch (error) {
            console.log("Error while creating new todo:", error);
        }
    };

    React.useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <Container maxWidth="md">
            <Box mt={5} display='flex' flexDirection='column' alignItems='center'>
                <Card sx={{ minWidth: { xs: '100%', sm: 450 } }}>
                    <CardContent>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                fullWidth
                                id="outlined-todo"
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={nameError}
                                helperText={nameError ? "Name must be at least 2 characters." : ""}
                            />
                            <TextField
                                fullWidth
                                id="outlined-description"
                                label="Description"
                                variant="outlined"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                error={descriptionError}
                                helperText={descriptionError ? "Description must be at least 2 characters." : ""}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Select Date and Time"
                                    value={selectedDate}
                                    onChange={(date: dayjs.Dayjs | null) => {
                                        setSelectedDate(date);
                                    }}
                                />
                            </LocalizationProvider>
                            <Button variant="contained" onClick={addTodoWithFeedback}>Add new todo!</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={2000}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={closeSnackbar} severity={snackbarSeverity} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}