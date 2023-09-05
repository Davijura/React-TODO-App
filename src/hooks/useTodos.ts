import { useState, useEffect } from 'react';
import { Timestamp, collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { projectFirestore } from '@/firebase/config';

type TodoType = {
  id: string;
  name: string;
  description: string;
  time: string;
};

const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    const todoCollection = collection(projectFirestore, 'todos');
    const unsubscribe = onSnapshot(todoCollection, (snapshot) => {
      const todoList: TodoType[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TodoType));
      setTodos(todoList);
    });

    // Když se komponenta odstraní z DOM, odebere posluchače, aby se předešlo úniku paměti.
    return () => unsubscribe();
  }, []);

  const deleteTodo = async (id: string) => {
    try {
      const todoRef = doc(projectFirestore, 'todos', id);
      await deleteDoc(todoRef);
      // Zde se aktualizuje seznam TODO, ale posluchač `onSnapshot` by měl již automaticky aktualizovat seznam pro vás.
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Chyba při mazání TODO:", error);
    }
  }

  return { todos, deleteTodo }; // Vracíme jak todos tak deleteTodo
};

export default useTodos;