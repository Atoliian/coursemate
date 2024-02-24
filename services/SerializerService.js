class SerializerService {

    /**
     * 
     * @param {user[]} users
     * @param {array} data
     * @returns 
     */
    async userSerialize(users, data){
        const resultat = [];
        users.map(user => (
            Object.keys(user).forEach(key => {
                if (data.includes(key)) {
                    const obj = {};
                    obj[key] = user[key];
                    resultat.push(obj);
                }
            })
        ));
        return resultat;
    }

   

    

}

module.exports = SerializerService;