const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const folder = './jwt';


const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    }
});

// Créer les fichiers et écrire les clés dans chacun
for (let i = 1; i <= 2; i++) {
    
    let filename = '';
    i === 1 ? filename = "private.pem" : filename = "public.pem";
    const path = `${folder}/${filename}`;

    i === 1 ? fs.writeFileSync(path, privateKey) : fs.writeFileSync(path, publicKey);
    console.log(`Le fichier ${filename} a été créé avec succès.`);
}
