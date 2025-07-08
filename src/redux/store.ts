import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "./api/projectApi";
import { contactApi } from "./api/contactApi";


export const store = configureStore({
    reducer: {
        [projectApi.reducerPath]: projectApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        // other reducers...
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(projectApi.middleware)
            .concat(contactApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
