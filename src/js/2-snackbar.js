import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formSnackbar = document.querySelector('.form');

formSnackbar.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(event.target.delay.value.trim());
  const state = event.target.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        backgroundColor: 'green',
        messageColor: 'white',
        position: 'topRight',
      });
    })
    .catch(delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: 'red',
        messageColor: 'white',
        position: 'topRight',
      });
    });
});
