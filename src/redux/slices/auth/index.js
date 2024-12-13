import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{

    },
    userData:{

    }
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuth(state,{payload}) {
            state.user = payload.user;
        },
        setUserData(state,{payload}){
            state.userData = payload.userData;
        }
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const {setAuth,setUserData} = authSlice.actions;
export default authSlice.reducer;