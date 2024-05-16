const disabledModal = (
   mainEventListener,
   btnSelector,
   elemSelectorWidth,
   elemSelectorHeight,
   elemSelectorType,
   elemSelectorProfile,
   event
) => {
   const button = document.querySelector(btnSelector),
      mainEvent = document.querySelectorAll(mainEventListener),
      widthElem = document.querySelector(elemSelectorWidth),
      heightElem = document.querySelector(elemSelectorHeight),
      typeElem = document.querySelector(elemSelectorType),
      profileElem = document.querySelector(elemSelectorProfile);

   button.setAttribute('disabled', true);

   mainEvent.forEach((item) => {
      item.addEventListener(event, (e) => {
         if (e.target.id === 'width' || e.target.id === 'height') {
            if (heightElem.value !== '' && widthElem.value !== '') {
               button.disabled = false;
            } else {
               return;
            }
         }
         if (e.target.id === 'view_type') {
            if (typeElem.value !== '' && profileElem.checked) {
               button.disabled = false;
            } else {
               return;
            }
         }
      });
   });
};

export default disabledModal;
