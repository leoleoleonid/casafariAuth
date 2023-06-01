import $api from "../../http";

const authApi = {
    login: async (email, password) => {
        return $api.post(`/auth/user/login`, {email, password})
    },
    signIn: async (email, password) => {
        return $api.post(`/auth/user/sign-in`, {email, password})
    },
}
export default authApi;