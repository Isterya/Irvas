import checkNumInputs from './checkNumInputs';

const forms = (state) => {
   const form = document.querySelectorAll('form'),
      inputs = document.querySelectorAll('input'),
      windows = document.querySelectorAll('[data-modal]');

   checkNumInputs('input[name="user_phone"]');

   const message = {
      success: 'Спасибо! Скоро мы с вами свяжемся.',
      loading: 'Происходит загрузка...',
      failure: 'Что-то пошло не так...',
   };

   const postData = async (url, data) => {
      document.querySelector('.status').textContent = message.loading;
      let res = await fetch(url, {
         method: 'POST',
         body: data,
      });

      return await res.text();
   };

   const clearInputs = () => {
      inputs.forEach((item) => {
         item.value = '';
      });
   };

   form.forEach((item) => {
      item.addEventListener('submit', (e) => {
         e.preventDefault();

         let statusMessage = document.createElement('div');
         statusMessage.classList.add('status');
         item.appendChild(statusMessage);

         const formData = new FormData(item);
         if (item.getAttribute('data-calc') === 'end') {
            for (let key in state) {
               formData.append(key, state[key]);
            }
         }
         postData('assets/server.php', formData)
            .then((res) => {
               console.log(res);
               statusMessage.textContent = message.success;
            })
            .catch(() => {
               statusMessage.textContent = message.failure;
            })
            .finally(() => {
               clearInputs();
               Object.keys(state).forEach((key) => delete state[key]);

               setTimeout(() => {
                  statusMessage.remove();
                  windows.forEach((item) => {
                     item.style.display = 'none';
                     document.body.style.overflow = '';
                  });
               }, 3000);
            });
      });
   });
};

export default forms;
