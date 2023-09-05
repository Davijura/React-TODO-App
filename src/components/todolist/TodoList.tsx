import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import useAddTodo from '@/hooks/useAddTodo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, createTodo } from '@/redux/todosSlices';
import { RootState } from '@/redux/store';
import React from 'react';

export default function TodoList() {

    const { name, setName, description, setDescription, addTodo } = useAddTodo();
    const todos = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();
  
    React.useEffect(() => {
      dispatch(fetchTodos());
    }, [dispatch]);
  
    const handleAddTodo = (name: string, description: string) => {
      dispatch(createTodo({ name, description }));
    };

    return (
        <>
            <Box>
                <Box display='flex' flex='1' justifyContent='center'>
                    <Card sx={{ marginTop: 5, minWidth: 450 }}>
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
                                    id="outlined-todo" 
                                    label="Name" 
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <TextField 
                                    id="outlined-description" 
                                    label="Description" 
                                    variant="outlined"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <Button variant="contained" onClick={addTodo}>Add new todo !</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </>
    );
}
