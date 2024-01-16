import { URL } from '../Common/ddata';
import AuthService from './AuthService';

const CategoryService = {
    findByParentId: function (id) {
        return fetch(URL + "/category/parent/" + id, {
            method: "GET",
        }).then((data) => { return data.json() })
    },

    findByParentAndImageId: function (id) {
        return fetch(URL + "/category/extended/parent/" + id, {
            method: "GET",
        }).then((data) => { return data.json() })
    },

    findLevelCategoriesById: function (id) {
        return fetch(URL + "/category/by/rows-parent-id/" + id, {
            method: "GET",
        }).then((data) => { return data.json() });
    },



    findByParentIdPrivate: function (id) {
        return fetch(URL + "/private/category/parent/" + id, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + AuthService.token()
            },
        }).then((data) => { return data.json() })
    },

    create: function (bodyValue) {
        return fetch(URL + "/private/category", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + AuthService.token()
            },
            body: JSON.stringify(bodyValue),
        }).then((data) => { return data.json() });
    },

    update: function (bodyValue) {
        return fetch(URL + "/private/category", {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + AuthService.token()
            },
            body: JSON.stringify(bodyValue),
        }).then((data) => { return data.json() });
    },

    remove: function (id) {
        return fetch(URL + "/private/category/" + id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + AuthService.token()
            },
        }).then((data) => { return data.json() });
    }


};

export default CategoryService;