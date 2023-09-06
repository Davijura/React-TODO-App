import { Alert, Box, Card, CardContent, Container, Snackbar, Typography } from '@mui/material';
import useTodos from '@/hooks/useTodos';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Timestamp } from 'firebase/firestore';

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
                            <Card key={todo.id} sx={{ padding: 2, marginBottom: 2, width: { xs: '100%', sm: 'auto' } }}>
                                <Box display="flex">
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        gap={2}
                                        flexGrow={1}
                                    >
                                        <Typography component="h2">
                                            Name: {todo.name}
                                        </Typography>

                                        <Typography component="h2">
                                            Description: {todo.description}
                                        </Typography>

                                        <Typography component="h2">
                                            Time: {todo.time instanceof Timestamp ? todo.time.toDate().toLocaleString() : ''}
                                        </Typography>

                                    </Box>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        flex="1"
                                        color="red"
                                    >
                                        <ClearOutlinedIcon
                                            cursor="pointer"
                                            fontSize="large"
                                            onClick={() => deleteTodo(todo.id)}
                                        />
                                    </Box>
                                </Box>

                            </Card>
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
                <Alert onClose={closeSnackbar} severity="info" variant="filled">
                    Todo has been removed!
                </Alert>
            </Snackbar>
        </Container>
    );
}