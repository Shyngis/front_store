import { URL } from '../Common/ddata';

const FileService = {

    findImagesByContainerId: function (containerId) {
        return fetch(URL + "/upload/image/" + containerId, {
            method: "GET",
        }).then((data) => { return data.json() })
    },


    uploadEasy: function (productId, file) {
        const formData = new FormData();
        formData.append("container", productId);
        formData.append("file", file);

        return fetch(URL + "/upload/image/", {
            method: "POST",
            body: formData,
            headers: {
                'Content-type': 'application/json',
            },
        }).then((data) => { return data.json() })
    },


    findById: function (id) {
        return fetch(URL + "/upload/image/id/" + id, {
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

export default FileService;