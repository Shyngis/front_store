import { URL } from '../Common/ddata';
import AuthService from './AuthService';

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

        return fetch(URL + "/private/upload/image/", {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + AuthService.token()
            },
        }).then((data) => { return data.json() })
    },

    syncUpload: function (data) {
        return fetch(URL + "/private/upload/image", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + AuthService.token()
            },
            body: data,
        });
    },

    syncUploadDocument: function (data) {
        return fetch(URL + "/private/upload/document", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + AuthService.token()
            },
            body: data,
        });
    },


    findById: function (id) {
        return fetch(URL + "/upload/image/id/" + id, {
            method: "GET",
        }).then((data) => { return data.json() });
    },

    findDocumentByContainerId: function (id) {
        return fetch(URL + "/upload/file/container/" + id + "/container-class/Document", {
            method: "GET",
        }).then((data) => { return data.json() });
    },

    removeById: function (id) {
        return fetch(URL + "/private/upload/file/" + id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + AuthService.token()
            },
        }).then((data) => { return data.json() });
    },

    updateDescription: function (data) {
        return fetch(URL + "/private/upload/document/description", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + AuthService.token()
            },
        }).then((response) => response.json())
    }
};

export default FileService;