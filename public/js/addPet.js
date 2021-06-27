// button to ADD a new pet...

const userAddPet = function () {
  document.location.replace('/addNewPet');
};

// console.log( `Waiting for 'addPet!'` );

document
  .querySelector('#addpetbtn')
  .addEventListener('click', userAddPet );
