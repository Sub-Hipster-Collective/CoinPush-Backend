const admin = require('firebase-admin');
const serviceAccount = require('./coin-push-firebase-adminsdk-5s3qb-8b77683674.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://coin-push.firebaseio.com'
});
// Get a database reference to our posts
const db = admin.database();
const ref = db.ref(admin.databaseURL);
 
if (require.main === module)
{
    ref.child('users').orderByKey().once('value', (users) => {
        users.forEach((user) => {
            user.child('conversions').forEach((conversion) => {
                console.log('user: ' + user.key + '\nconversion: ' + conversion.key);
                if(conversion.child('pushDecreased').val())
                    console.log("pushDecreased is true\n");
                else
                    console.log("pushDecreased is false\n");
            });
        });
    });
}
