import { Footer } from "@/components/footer/Footer"
import { Header } from "@/components/header/Header"
import TodoCreateForm from "@/components/todolist/TodoCreateForm"
import Todos from "@/components/todos/Todos"
import { Box } from "@mui/material"

export const Dashboard = () => {
    return (
        <Box>
            <Header />
            <TodoCreateForm />
            <Todos />
        </Box>
    )
}
