import { URL } from '../Common/ddata';

const ProductService = {
    findByCategory: function (categoryId) {
        return fetch(URL + "/product/category/" + categoryId, {
            method: "GET",
        }).then((data) => { return data.json() })
    },

    findById: function (id) {
        return fetch(URL + "/product/id/" + id, {
            method: "GET",
        }).then((data) => { return data.json() });
    },

    // findLevelCategoriesById: function (id) {
    //     return fetch(URL + "/category/by/rows-parent-id/" + id, {
    //         method: "GET",
    //     }).then((data) => { return data.json() });
    // },

    // findFirstLevelRowsByChildId: function (childId) {
    //     return fetch(URL + "/category/by/first-level-rows-by-child-id/" + childId, {
    //         method: "GET",
    //     }).then((data) => { return data.json() });
    // }
    
};

export default ProductService;