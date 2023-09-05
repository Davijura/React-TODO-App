import { useState } from 'react';
import { projectFirestore } from '@/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const useAddTodo = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const addTodo = async () => {
        try {
            const todosCollection = collection(projectFirestore, 'todos');
            await addDoc(todosCollection, {
                name,
                description,
                time: new Date()
            });
            console.log('Todo added successfully!');
            setName(''); // Resetujte pole "Name" po úspěšném přidání
            setDescription(''); // Resetujte pole "Description" po úspěšném přidání
        } catch (error) {
            console.error('Error adding todo: ', error);
        }
    };

    return {
        name,
        setName,
        description,
        setDescription,
        addTodo
    };
}

export default useAddTodo;