import Repository, {
    serializeQuery,
    baseUrl
} from '~/repositories/Repository.js';

export const state = () => ({
    collections: [],
    categories: null,
    queries: null,
    menuCategories: [],
    appearanceCategory: [],
    categoryProducts: {},
});

export const mutations = {
    setCollections(state, payload) {
        state.collections = payload;
    },

    setCategories(state, payload) {
        state.categories = payload;
    },
    setQueries(state, payload) {
        state.queries = payload;
    },
    setMenuCategories(state, payload) {
        state.menuCategories = payload;
    },
    setAppearanceCategory(state, payload) {
        state.appearanceCategory = payload;
    },
    setCategoryProducts(state, payload) {
        state.categoryProducts = payload;
    }
};

export const actions = {
    async getCollectionsBySlugs({ commit }, payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/collections?${query}`)
            .then(response => {
                commit('setCollections', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },
    async getCategoriesBySlugs({ commit }, payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?${query}`
        )
            .then(response => {
                commit('setCategories', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },
    async getAppearanceCategory({ commit }) {
        const reponse = await Repository.get(
            `${baseUrl}/apperance-category`
        )
            .then(response => {
                commit('setAppearanceCategory', response.data.data.apperanceCategory);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },
     async getMenuCategories({ commit }) {
        const reponse = await Repository.get(
            `${baseUrl}/customer-parent-categories`
        )
            .then(res => {
                const categories = res.data.data.categories
                commit('setCategories', categories)
                if (categories.length > 0) {
                    const list = categories.map(category => (
                        {
                            icon: 'icon-star',
                            text: category.name,
                            slug: category.slug,
                            url: '/shop'
                        }
                    ))
                    commit('setMenuCategories', list)
                }
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },
     async getCategoryProducts({ commit }, slug) {
        const reponse = await Repository.get(
            `${baseUrl}/category-products/${slug}`
        )
            .then(response => {
                commit('setCategoryProducts', response.data.data.categoryProducts);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },
};
