import { URL } from '../Common/ddata';
import AuthService from './AuthService';

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

    create: function (product) {
        return fetch(URL + "/private/product", {
            method: "POST",
            headers: { 
                "content-type": "application/json",
                'Authorization': 'Bearer ' + AuthService.token()
            },
            body: JSON.stringify(product),
        }).then(result => result.json());
    },

    update: function (product) {
        return fetch(URL + "/private/product", {
            method: "PUT",
            headers: { 
                "content-type": "application/json",
                'Authorization': 'Bearer ' + AuthService.token()
            },
            body: JSON.stringify(product),
        }).then(result => result.json());
    },

    getProducts: function (size) {
        return fetch(URL + "/private/product/page?size=" + size, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + AuthService.token()
            },
        }).then(res => res.json());
    }
};

export default ProductService;