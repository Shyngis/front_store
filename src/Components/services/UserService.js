import { URL } from '../Common/ddata';

const UserService = {

    login: function (formData) {
        let url = URL.replace('/api', '');
        console.log('url', url);
        return fetch(url + '/login', {
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