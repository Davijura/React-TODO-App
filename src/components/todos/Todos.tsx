import { Box, Card, CardContent, Typography } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import useTodos from '@/hooks/useTodos';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export default function Todos() {
    const { todos, deleteTodo } = useTodos();

    return (
        <>
            <Box display='flex' flex='1' justifyContent='center'>
                <Card sx={{ marginTop: 5, marginBottom: 5, minWidth: 450 }}>
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14, textAlign: 'center' }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Your Todos
                        </Typography>

                        {todos.map(todo => (
                            <Card key={todo.id} sx={{ padding: 2, marginBottom: 2 }}>
                                <Box display="flex">
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        gap={2}
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
                                    {/* Zde je upravený Box pro zarovnání ikony */}
                                    <Box display="flex" justifyContent="center" alignItems="center" flex="1" color="red">
                                        <ClearOutlinedIcon cursor="pointer" fontSize="large" onClick={() => deleteTodo(todo.id)} />
                                    </Box>
                                </Box>

                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
