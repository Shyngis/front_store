

const AuthService = {

    token: function () {
        const item = localStorage.getItem('santec_items');
        if (item) {
            const parsed = JSON.parse(item);
            return parsed.access_token;
        }
        return '';
    }
};

export default AuthService;