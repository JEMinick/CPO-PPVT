// button to ADD a new pet...

const userAddPet = function () {
  document.location.replace('/add-pet');
};

document
  .querySelector('#addpetbtn')
  .addEventListener('click', userAddPet );
