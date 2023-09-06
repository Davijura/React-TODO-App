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

// Asynchronous action to fetch todos from Firestore
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

// Asynchronous action to add a todo to Firestore
export const createTodo = createAsyncThunk('todos/createTodo', async (todo: { name: string; description: string; time: string | null }) => {
  const todosCollection = collection(projectFirestore, 'todos');
  const docRef = await addDoc(todosCollection, todo);
  return { id: docRef.id, ...todo } as TodoType;
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

    builder.addCase(createTodo.fulfilled, (state, action: PayloadAction<TodoType>) => {
      state.data = [action.payload, ...state.data];
      state.isFetching = false;
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

    builder.addCase(createTodo.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.error.message;
      state.status = 'fail';
    });
  },
});

export default todosSlice.reducer;
