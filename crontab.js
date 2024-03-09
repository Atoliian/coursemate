const cron = require('node-cron');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'cronlog.log');

if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, '');
}

function logger(message, code=null) {
  const timestamp = new Date().toISOString();
  const status = code==null ? 200 : code;
  const logMessage = `${timestamp}[${status}]: ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
}

// renew the log file
cron.schedule('0 1 1 * *', () => {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Erreur lors de la suppression du fichier :', err);
        } else {
          console.log('Le fichier a été supprimé avec succès.');
        }
      });
    } else {
      console.log('Le fichier n\'existe pas.');
    }
  });
});


// Deleting expired brackets
cron.schedule('0 2 * * *', () => {
  let ids = [];
  try {
    prisma.bracket.findMany().then((brackets) => {
      brackets.map((bracket) => {
        if(bracket.expiredAt < Date.now()){
          ids.push(bracket.id);
        }
      });
      prisma.bracket.deleteMany({
        where: {
          id: {
            in: ids
          }
        }
      }).then(() => {
        if(Array.isArray(ids) && ids.length === 0){
          logger(`No brackets to delete !`);
        } else {
          logger(`Expired brackets deleting ok ! => [${ids}]`);
        }
        
      });
    });
  } catch(error){
    logger("An error is produced while deleting expired bracket !", error.code);
  }
  
});

// Deleting expired users
cron.schedule('0 1 1 * *', () => {
  let ids = [];
  const deletionThreshold = 48 * 60 * 60 * 1000;
  try {
    prisma.user.findMany({
      where: {
        active: 0,
        magikLink: null
      }
    }).then((users) => {
      users.map((user) => {
        let limitDate = new Date(user.createdAt.getTime() + deletionThreshold);
        if(Date.now() > limitDate){
          ids.push(user.id);
        }
      });
      prisma.user.deleteMany({
        where: {
          id: {
            in: ids
          }
        }
      }).then(() => {
        if(Array.isArray(ids) && ids.length === 0){
          logger(`No users to delete !`);
        } else {
          logger(`Expired users deleting ok ! => [${ids}]`);
        }
        
      });
    });
  } catch(error){
    logger("An error is produced while deleting expired users !", error.code);
  }
  
});