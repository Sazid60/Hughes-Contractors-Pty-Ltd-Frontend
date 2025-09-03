import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "./api/projectApi";
import { contactApi } from "./api/contactApi";
import { reviewApi } from "./api/reviewApi";

export const store = configureStore({
    reducer: {
        [projectApi.reducerPath]: projectApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(projectApi.middleware)
            .concat(contactApi.middleware)
            .concat(reviewApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
