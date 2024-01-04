import { URL } from '../Common/ddata';

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


    create: function (bodyValue) {
        return fetch(URL + "/category", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(bodyValue),
        }).then((data) => { return data.json() });
    },

    update: function (bodyValue) {
        return fetch(URL + "/category", {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(bodyValue),
        }).then((data) => { return data.json() });
    },

    findLevelCategoriesById: function (id) {
        return fetch(URL + "/category/by/rows-parent-id/" + id, {
            method: "GET",
        }).then((data) => { return data.json() });
    },

    findFirstLevelRowsByChildId: function (childId) {
        return fetch(URL + "/category/by/first-level-rows-by-child-id/" + childId, {
            method: "GET",
        }).then((data) => { return data.json() });
    },
    
    remove: function (id) {
        return fetch(URL + "/category/" + id, {
            method: "DELETE",
        }).then((data) => { return data.json() });
    }
    
};

export default CategoryService;