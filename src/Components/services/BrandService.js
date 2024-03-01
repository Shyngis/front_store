import { URL } from '../Common/ddata';
import AuthService from './AuthService';

const BrandService = {

    getBrands: function () {
        return fetch(URL + '/brand/all', {
            method: "GET",
            headers: { 
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + AuthService.token()
            }
        }).then((data) => { return data.json() })
    },

};

export default BrandService;