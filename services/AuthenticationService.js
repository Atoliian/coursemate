const bcrypt = require('bcryptjs');
const slugify = require('slugify');
const crypto = require('crypto');
const NodeRSA = require('node-rsa');
require('dotenv').config();
const fs = require('fs');
var jwt = require('jsonwebtoken');



class AuthenticationService {

    /**
     * 
     * @param {string} pass 
     * @returns 
     */
    async cryptPassword(pass){
        const password = pass.trim();
        if(password.length >= 10){
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, salt);
        }
        
        return {"code" : 500, "message": "Your password must be 10 characters minimum"};
    }

    /**
     * Generates an identifier from the name
     * [RETURN STRING]
     * @param {string} name 
     * @returns 
     */
    async generateIdentifier(name){
        let string = slugify(name, '-');
        let randomNumber = Math.floor(Math.random() * 9999) + 1;
        let result = randomNumber.toString().padStart(4, '0');
        return `${result}#${string}`;
    }

    async createTokenJWT(data){
        const keys = await this.getKeys();
        return jwt.sign({
            'email': data.email,
            'username': data.identifier,
            'roles': data.roles
        }, keys.private, { algorithm : 'RS256', expiresIn : '2h' });
    }
    
    async createMagiklinktoken(){
        const magikToken = crypto.createHash('sha256', `MagikToken for coursemate: ${new Date()}`);
        return magikToken.digest('hex');
    }

    async getKeys(){
        const paths = ["./" + process.env.JWT_PRIVATE_KEY,"./" + process.env.JWT_PUBLIC_KEY];
       // Charger le contenu du fichier private.pem
        const privateKeyData = fs.readFileSync("./" + process.env.JWT_PRIVATE_KEY, 'utf8');
        const publicKeyData = fs.readFileSync("./" + process.env.JWT_PUBLIC_KEY, 'utf8');

        return {
            "private" : privateKeyData,
            "public" : publicKeyData
        };
    }

    

}

module.exports = AuthenticationService;