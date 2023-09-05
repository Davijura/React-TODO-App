import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { projectFirestore } from '@/firebase/config';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

type TodoType = {
  id: string;
  name: string;
  description: string;
  time: string;
};

// Tuto funkci umístěte na začátek souboru za definicí typu TodoType
const timestampToString = (timestamp: Timestamp) => timestamp.toDate().toISOString();

// Asynchronní akce pro načtení todos z Firestore
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const todoCollection = collection(projectFirestore, 'todos');
  const todoSnapshot = await getDocs(todoCollection);
  return todoSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
      time: timestampToString(data.createdAt),
      id: doc.id
    };
  }) as TodoType[];
});

// Asynchronní akce pro přidání todo do Firestore
export const createTodo = createAsyncThunk('todos/createTodo', async (todo: { name: string; description: string }) => {
  const todosCollection = collection(projectFirestore, 'todos');
  const docRef = await addDoc(todosCollection, {
    ...todo,
    time: new Date().toISOString(),  // převedení na řetězec pro konzistenci
  });
  return { id: docRef.id, ...todo, time: new Date().toISOString() } as TodoType;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as TodoType[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<TodoType[]>) => {
      return action.payload;
    });
    builder.addCase(createTodo.fulfilled, (state, action: PayloadAction<TodoType>) => {
      state.push(action.payload);
    });
  },
});

export default todosSlice.reducer;
