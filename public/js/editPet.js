const editPet = async (event) => {
    event.preventDefault();

    // ----------------------------
    // PET model:
    // ----------------------------
    // id
    // petname :: NOT NULL
    // pet_license_no
    // license_exp_date
    // breed
    // dob
    // pet_photo
    // pet_license_file
    // date_created :: default: NOW
    // user_id
    // ----------------------------

    let fieldSel;

    const iPetID = document.querySelector('input[name="pet-id"]').value;

    let petname;
    fieldSel = document.getElementById('pet-name');
    if ( fieldSel ) {
      if ( fieldSel.value ) {
        petname = fieldSel.value.trim();
      }
    }

    let pet_license_no;
    fieldSel = document.getElementById('pet-license-no');
    if ( fieldSel ) {
      if ( fieldSel.value ) {
        pet_license_no = fieldSel.value.trim();
      }
    }

    let license_exp_date;
    fieldSel = document.getElementById('lic-exp-date');
    if ( fieldSel ) {
      if ( fieldSel.value ) {
         license_exp_date = fieldSel.value.trim();
      }
    }

    let breed;
    fieldSel = document.getElementById('pet-breed');
    if ( fieldSel ) {
      if ( fieldSel.value ) {
         breed = fieldSel.value.trim();
      }
    }

    let dob;
    fieldSel = document.getElementById('pet-dob');
    if ( fieldSel ) {
      if ( fieldSel.value ) {
         dob = fieldSel.value.trim();
      }
    }

    let file;
    let pet_photo;

    if ( petname ) {

      fieldSel = document.getElementById("upload-image");
      if ( fieldSel ) {
        file = fieldSel.files[0];
        if ( file ) {
          pet_photo = file.name
        }
      }

      if ( pet_photo ) {
        // console.log( `Uploading image: [${pet_photo}]` );
        let formPhotoImage = new FormData()
        formPhotoImage.append("file", file)
        const response = await fetch('/uploadimages', {
            method: "POST", 
            body: formPhotoImage
        })
        const {data} = await response.json();
        pet_photo = data;
      }

      let pet_license_file;
      fieldSel = document.getElementById("upload-license");
      if ( fieldSel ) {
        file = fieldSel.files[0];
        if ( file ) {
          pet_license_file = file.name
        }
      }

      if ( pet_license_file ) {
        // console.log( `Uploading image: [${pet_license_file}]` );
        let formLicenseData = new FormData()
        formLicenseData.append("file", file)
        const response = await fetch('/uploadimages', {
            method: "POST", 
            body: formLicenseData
        })
        const {data} = await response.json();
        pet_license_file = data;
      }

      let response2;
      if ( iPetID > 0 ) {
        response2 = await fetch(`/api/pets/${iPetID}`, {
          method: 'PUT',
          body: JSON.stringify(
              { petname, 
                pet_license_no,
                license_exp_date,
                breed,
                dob,
                pet_photo,
                pet_license_file
              }),
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        response2 = await fetch(`/api/pets/add`, {
          method: 'POST',
          body: JSON.stringify(
              { petname, 
                pet_license_no,
                license_exp_date,
                breed,
                dob,
                pet_photo,
                pet_license_file
              }),
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (response2.ok) {
        document.location.replace('/');
      } else {
        alert(response2.statusText);
      }

    }
  };

  function cancelPetEdit() {
    document.location.replace('/');
  }

  document
    .querySelector( '#cancelPetEdit' )
    .addEventListener( 'click', cancelPetEdit )

  document
    .querySelector( '.edit-pet-form' )
    .addEventListener( 'submit', editPet )
