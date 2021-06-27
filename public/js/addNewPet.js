const addNewPet = async (event) => {
    event.preventDefault();

    // petname :: NOT NULL
    // pet_license_no
    // license_exp_date
    // breed
    // dob
    // pet_photo

    // <label for="pet-title" class="form-label">Pet Name</label>
    // <input type="text" id="pet-name" name="pet-title" class="form-input" />

    // <label class="form-label" for="license-no">License number:</label>
    // <input id="pet-license-no" name="license-no" class="form-input" />

    // <label class="form-label" for="lic-exp-date">License Expiration:</label>
    // <input id="lic-exp-date" name="lic-exp-date" class="form-input" />

    // <label class="form-label" for="pet-breed">Breed:</label>
    // <input id="pet-breed" name="pet-breed" class="form-input" />

    // <label class="form-label" for="pet-dob">Date of Birth:</label>
    // <input id="pet-dob" name="pet-dob" class="form-input" />


    const petname = document.querySelector('#pet-name').value.trim();
    const pet_license_no = document.querySelector('#pet-license-no').value.trim();
    const license_exp_date = document.querySelector('#lic-exp-date').value.trim();
    const breed = document.querySelector('#pet-breed').value.trim();
    const dob = document.querySelector('#pet-dob').value.trim();
  
    if ( petname ) {

      let file = document.getElementById("upload-file").files[0];
      console.log( `Uploading image: [${file.name}]` );

      let pet_photo = file.name;
      
      // let formData = new FormData();
      // formData.append("file", file);
      // const response1 = await fetch('/uploadimg', {
      //     method: "POST", 
      //     body: formData
      // });
      // const {data} = await response1.json()
      // // console.log(data)
      // pet_photo = JSON.stringify(data);
      // // console.log( `Pet Image: [${pet_photo}]` );

      console.log( "Attempting to add pet: [" 
        + JSON.stringify(
          { petname, 
            pet_license_no, 
            license_exp_date,
            breed,
            dob,
            pet_photo
          }) 
        + "]" );
  
      const response2 = await fetch('/api/pets', {
        method: 'POST',
        body: JSON.stringify(
            { petname, 
              pet_license_no,
              license_exp_date,
              breed,
              dob,
              pet_photo
            }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response2.ok) {
        // document.location.replace('/');
      } else {
        // alert(response.statusText);
        alert( JSON.stringify(response2.statusText) );
      }
    }
  };

  document
    .querySelector( '#addPetBtn' )
    // .addEventListener( 'submit', addNewPet );
    .addEventListener( 'click', addNewPet );
  