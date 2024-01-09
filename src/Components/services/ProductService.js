import { URL } from '../Common/ddata';

const ProductService = {
    findByCategory: function (categoryId) {
        return fetch(URL + "/product/category/" + categoryId, {
            method: "GET",
        }).then((data) => { return data.json() })
    },

    findByCategoryAndParams: function (categoryId, isSantec, isValtec) {
        return fetch(URL + `/product/category/${categoryId}/?isSantec=${isSantec}&isValtec=${isValtec}`, {
            method: "GET",
        }).then((data) => { return data.json() })
    },

    findById: function (id) {
        return fetch(URL + "/product/id/" + id, {
            method: "GET",
        }).then((data) => { return data.json() });
    },

};

export default ProductService;