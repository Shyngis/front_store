import { URL } from '../Common/ddata';

const UserService = {

    login: function (formData) {
        // return fetch(URL + "/login", {
        return fetch("http://localhost:8180/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formData),
        }).then(response => {
            if (!response.ok) { throw response }
            return response.json()
        });
    },

};

export default UserService;