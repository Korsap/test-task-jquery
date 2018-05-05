var express = require('express');
var path = require('path');

// var config = require('./config');

var buildDir = './build';
var port = '3014';

var server = express();

server.set("view options", { layout: false });

server.use(express.static(path.resolve(path.join(__dirname, buildDir))));

server.get('/', function (req, res) {
    res.render(path.join(buildDir, 'index.html'));
});

server.get('/get-slides', function (req, res) {
    res.send([
        {
            title: 'В августе скидка 50% на доставку документов',
            text: 'Весь месяц экспресс-доставка документов вдвое дешевле',
            image: '../images/slide-1.png',
            active: true,
            order: 10,
            startDate: 1531471919,
            endDate: 1557737519,
        },
        {
            title: 'Подписание договора за 1 час',
            text: 'В течение часа наш курьер заберет вашу посылку и подпишет с Вами договор о предоставлении услуг.',
            image: '../images/slide-2.png',
            active: true,
            order: 9,
            startDate: 1084438319,
            endDate: 1557737519,
        },
        {
            title: 'Срочная доставка день в день',
            text: 'Для тех, кто не может ждать, у нас есть услуга срочной курьерской доставки корреспондеции и других видов отправлений.',
            image: '../images/slide-1.png',
            active: true,
            order: 7,
            startDate: 1084438319,
            endDate: 1557737519,
        },
        {
            title: 'УДОЛИ',
            text: 'Тестовый текст тестового слайда',
            image: '../images/slide-1.png',
            active: false,
            order: 1,
            startDate: 1084438319,
            endDate: 1557737519,
        },
        {
            title: 'Страхование отправлений',
            text: 'Все наши отправления бесплатно страхуются на 100 000 рублей',
            image: '../images/slide-2.png',
            active: true,
            order: 2,
            startDate: 1084438319,
            endDate: 1518511919,
        },
        {
            title: 'В сентябре скидка 30% на доставку учебников',
            text: 'Здесь какой-то текст об акции, придумать срочно',
            image: '../images/slide-1.png',
            active: false,
            order: 11,
            startDate: 1084438319,
            endDate: 1557737519,
        },
    ]);
});

server.listen(port, function () {
    console.log('Server listening on port ' + port + '!');
});
