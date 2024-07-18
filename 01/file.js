const FS = require('fs');

//Synchronous call
// FS.writeFileSync('./test.txt', 'Hello Irfan Learner SYNC');


//Asynchronous call
// FS.writeFile('./test.txt', 'Hello Irfan Learner ASYNC', err => {});


// const result = FS.readFileSync('./contact-us.txt', 'utf-8');
// console.log(result);


// FS.readFile('./contact-us.txt', 'utf-8', (err, result) => {
//     if (err) {
//         console.log('Error', err);
//     } else {
//         console.log(result);
//     }
// })


FS.appendFileSync(`./contact-us.txt`, `${new Date().getDate().toLocaleString()}Hey There\n`);


FS.cpSync("./contact-us.txt", './copy.txt');