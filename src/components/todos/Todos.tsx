import { Alert, Box, Card, CardContent, Container, Snackbar, Typography } from '@mui/material';
import useTodos from '@/hooks/useTodos';
import TodosItem from './TodoItem';

export default function Todos() {
    const { todos, deleteTodo, isSnackbarOpen, closeSnackbar } = useTodos();

    return (
        <Container maxWidth="md">
            <Box mt={5} mb={5} display='flex' flexDirection='column' alignItems='center'>
                <Card sx={{ minWidth: { xs: '100%', sm: 450 } }}>
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14, textAlign: 'center' }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Your Todos
                        </Typography>

                        {todos.map(todo => (
                            <TodosItem
                                key={todo.id}
                                todo={todo}
                                onDelete={deleteTodo}
                            />
                        ))}
                    </CardContent>
                </Card>
            </Box>

            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={2000}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={closeSnackbar}
                    severity="info"
                    variant="filled">
                    Todo has been removed!
                </Alert>
            </Snackbar>
        </Container>
    );
}