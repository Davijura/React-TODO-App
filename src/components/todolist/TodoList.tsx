import { Alert, Box, Button, Card, CardContent, Container, Snackbar, TextField, Typography } from '@mui/material';
import useAddTodo from '@/hooks/useAddTodo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, createTodo } from '@/redux/todosSlices';
import { RootState } from '@/redux/store';
import React from 'react';

export default function TodoList() {
    const { name, setName, description, setDescription, addTodo, isSnackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar } = useAddTodo();
    const todos = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();

    const addTodoWithFeedback = async () => {
        try {
            await addTodo();
        } catch (error) {
            // handle error as per your requirements
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
                        <Typography
                            sx={{ fontSize: 14, textAlign: 'center' }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Todo App
                        </Typography>

                        <Box
                            display="flex"
                            flexDirection="column"
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                id="outlined-todo"
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                id="outlined-description"
                                label="Description"
                                variant="outlined"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
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