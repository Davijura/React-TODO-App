import { Footer } from "@/components/footer/Footer"
import { Header } from "@/components/header/Header"
import TodoList from "@/components/todolist/TodoList"
import Todos from "@/components/todos/Todos"
import { Box } from "@mui/material"

export const Dashboard = () => {
    return (
        <Box>
            <Header />
            <TodoList />
            <Todos />
        </Box>
          
         
       

    )
}
