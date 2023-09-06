import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { projectFirestore } from '@/firebase/config';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { ReducerEnvelope } from "./envelope.interface"

type TodoType = {
  id: string;
  name: string;
  description: string;
  time: string;
};

type TodosState = ReducerEnvelope & {
  data: TodoType[];
};

const initialState: TodosState = {
  data: [],
  isFetching: false,
  error: null,
  error_code: null,
  status: 'ok',
};

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
    time: new Date().toISOString(),
  });
  return { id: docRef.id, ...todo, time: new Date().toISOString() } as TodoType;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isFetching = true;
      state.error = null;
      state.error_code = null;
      state.status = 'ok';
    });

    builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<TodoType[]>) => {
      state.data = action.payload;
      state.isFetching = false;
    });

    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.error.message;
      state.status = 'fail';
    });

    builder.addCase(createTodo.pending, (state) => {
      state.isFetching = true;
      state.error = null;
      state.error_code = null;
      state.status = 'ok';
    });

    builder.addCase(createTodo.fulfilled, (state, action: PayloadAction<TodoType>) => {
      state.data.push(action.payload);
      state.isFetching = false;
    });

    builder.addCase(createTodo.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.error.message;
      state.status = 'fail';
    });
  },
});

export default todosSlice.reducer;
