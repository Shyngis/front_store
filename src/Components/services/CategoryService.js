import React, { useState, useEffect } from 'react';
import { URL } from '../Common/ddata';

const CategoryService = {
    findByParentId: function (id) {
        return fetch(URL + "/category/parent/" + id, {
            method: "GET",
        }).then((data) => { return data.json() })
    },

    create: function (bodyValue) {
        return fetch(URL + "/category", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(bodyValue),
        }).then((data) => { return data.json() });
    }
};

export default CategoryService;