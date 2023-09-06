import { Box, Card, Typography } from '@mui/material';
import { TodoType } from '@/hooks/useTodos';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import dayjs from 'dayjs';

interface TodosItemProps {
    todo: TodoType;
    onDelete: (id: string) => void;
}

function TodosItem({ todo, onDelete }: TodosItemProps) {
    return (
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
                        Time: {todo.time ? dayjs(todo.time).format('dddd, MM/DD/YYYY, hh:mm A') : ''}
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
                        onClick={() => onDelete(todo.id)}
                    />
                </Box>
            </Box>
        </Card>
    );
}

export default TodosItem;