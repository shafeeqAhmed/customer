import Repository, {
    serializeQuery,
    baseUrl
} from '~/repositories/Repository.js';
import Cookies from 'js-cookie';

export const state = () => ({
    isLoggedIn: false
});

export const mutations = {
    setIsLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    }
};

export const actions = {
     login({ commit, state }, payload) {
         const reponse =  Repository.post(`${baseUrl}/login`, payload)
             .then(response => {
                 if (response.data.status) {
                     const data = response.data.data
                 Cookies.set('accessToken', data.accessToken)
                 Cookies.set('refreshToken', data.refreshToken)
                 Cookies.set('userData', JSON.stringify(data.userData))
                 commit('setIsLoggedIn', true)
                 const cookieParams = {
                    isLoggedIn: state.isLoggedIn
                };
                this.$cookies.set('auth', cookieParams, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
                });
                }
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
            return reponse;
        
    },
     register({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
        Repository
          .post(`${baseUrl}/register`, payload)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })    
    },
    forgot({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
        Repository
          .post(`${baseUrl}/forgot-password`, payload)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })    
    },
   reset({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
        Repository
          .post(`${baseUrl}/reset-password`, payload)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })    
    },
    setAuthStatus({state}, payload) {
        commit('setIsLoggedIn', payload)
    },
    logout({ commit }) {
        commit('setIsLoggedIn', false)
        Cookies.remove('auth')
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('userData')
    }
};
