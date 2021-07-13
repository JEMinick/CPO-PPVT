const editVaccine = async (event) => {
    event.preventDefault();

    // ------------------------------
    // VACCINE model:
    // ------------------------------
    // id               :: NOT NULL
    // vaccine_name     :: NOT NULL
    // date_of_vaccine  :: NOT NULL
    // vaccine_exp_date :: NOT NULL
    // veterinarian
    // vaccine_license_file
    // user_id          :: NOT NULL
    // pet_id           :: NOT NULL
    // date_created
    // ------------------------------

    let file;
    let fieldSel;

    // If editing an existing vaccine record, we require the vaccine-id.
    // If this is an "add", this value will be zero:
    const iVaccineID = document.querySelector('input[name="vaccine-id"]').value;

    // If this is an "add" vaccine record for an existing pet/user,
    // we require the user-id and pet-id due to the relationship:
    const iUserID = document.querySelector('input[name="user-id"]').value;
    const iPetID = document.querySelector('input[name="pet-id"]').value;

    // console.log( `ADD/EDIT VACCINE: VaccineID:[${iVaccineID}], PetID:[${iPetID}], UserID[${iUserID}]` );

    let vaccine_name;
    fieldSel = document.getElementById('vaccine-name');
    if ( fieldSel ) {
      if ( fieldSel.value ) {
        vaccine_name = fieldSel.value.trim();
      }
    }

    let date_of_vaccine;
    fieldSel = document.getElementById('vaccine-date');
    if ( fieldSel ) {
      if ( fieldSel.value ) {
        date_of_vaccine = fieldSel.value.trim();
      }
    }

    let vaccine_exp_date;
    fieldSel = document.getElementById('vaccine-exp-date');
    if ( fieldSel ) {
      if ( fieldSel.value ) {
        vaccine_exp_date = fieldSel.value.trim();
      }
    }

    let veterinarian;
    fieldSel = document.getElementById('vet-name');
    if ( fieldSel ) {
      if ( fieldSel.value ) {
        veterinarian = fieldSel.value.trim();
      }
    }

    if ( vaccine_name ) {

      let vaccine_license_file;
      fieldSel = document.getElementById("upload-license");
      if ( fieldSel ) {
        file = fieldSel.files[0];
        if ( file ) {
          vaccine_license_file = file.name
        }
      }

      if ( vaccine_license_file ) {

        // console.log( `Uploading image: [${vaccine_license_file}]` );

        let formLicenseData = new FormData()
        formLicenseData.append("file", file)
        const response = await fetch('/uploadimages', {
            method: "POST", 
            body: formLicenseData
        })
        const {data} = await response.json();
        vaccine_license_file = data;
      }

      // if ( iVaccineID > 0 ) {
      //   console.log( `Attempting to update vaccine: [ID:${iVaccineID}]` );
      // } else {
      //   console.log( `Attempting to add a new vaccine...` );
      // }

      // console.log(
      //     { vaccine_name, 
      //       date_of_vaccine, 
      //       vaccine_exp_date,
      //       veterinarian,
      //       vaccine_license_file,
      //       iUserID,
      //       iPetID
      //     });

      let response2;
      if ( iVaccineID > 0 ) {
        response2 = await fetch(`/api/vaccines/${iVaccineID}`, {
          method: 'PUT',
          body: JSON.stringify(
            { vaccine_name, 
              date_of_vaccine, 
              vaccine_exp_date,
              veterinarian,
              vaccine_license_file
            }),
            headers: { 'Content-Type': 'application/json' },
        });
      } else {
        response2 = await fetch(`/api/vaccines/add`, {
          method: 'POST',
          body: JSON.stringify(
              { vaccine_name, 
                date_of_vaccine, 
                vaccine_exp_date,
                veterinarian,
                vaccine_license_file,
                iUserID,
                iPetID
              }),
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (response2) {
        if (response2.ok) {
          document.location.replace('/');
        } else {
          alert(response2.statusText);
        }
      }

    }
  };

  function cancelVaccineEdit() {
    document.location.replace('/');
  }

  // =========================================================================
  
  document
    .querySelector( '#cancelVaccineEdit' )
    .addEventListener( 'click', cancelVaccineEdit )

  document
    .querySelector( '.edit-vaccine-form' )
    .addEventListener( 'submit', editVaccine )
