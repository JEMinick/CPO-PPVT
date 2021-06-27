// click to ADD a pet...

const userAddPet = function () {
  document.location.replace('/addNewPet');
};

// console.log( `Waiting for 'addPet!'` );

document
  .querySelector('#addpetbtn')
  .addEventListener('click', userAddPet );
