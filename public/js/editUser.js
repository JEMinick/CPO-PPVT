
const editUser = async (event) => {
  event.preventDefault();

  // ---------------------
  // USER model:
  // ---------------------
  // id  :: NOT NULL
  // username :: NOT NULL
  // email :: NOT NULL
  // password :: NOT NULL
  // ---------------------

  let fieldSel;

  const iUserID = document.querySelector('input[name="user-id"]').value;

  if ( iUserID > 0 ) {

    let username;
    fieldSel = document.getElementById('user-name');
    if ( fieldSel ) {
      if ( fieldSel.value ) {
        username = fieldSel.value.trim();
      }
    }

    let email;
    fieldSel = document.getElementById('user-email');
    if ( fieldSel ) {
      if ( fieldSel.value ) {
        email = fieldSel.value.trim();
      }
    }

    let file;
    let user_photo;

    if ( username ) {

      fieldSel = document.getElementById("upload-image");
      if ( fieldSel ) {
        file = fieldSel.files[0];
        if ( file ) {
          user_photo = file.name
        }
      }

      if ( user_photo ) {

        // console.log( `Uploading image: [${user_photo}]` );

        let formPhotoImage = new FormData()
        formPhotoImage.append("file", file)
        const response = await fetch('/uploadimages', {
            method: "POST", 
            body: formPhotoImage
        })
        const {data} = await response.json();
        user_photo = data;
      }

      // if ( iUserID > 0 ) {
      //   console.log( `Attempting to update user: [ID:${iUserID}]` );
      // } else {
      //   console.log( `Attempting to add a new user...` );
      // }

      // console.log(
      //     { iUserID, 
      //       username, 
      //       email
      //     });

      let response2;
      if ( iUserID > 0 ) {
        response2 = await fetch(`/api/users/${iUserID}`, {
          method: 'PUT',
          body: JSON.stringify(
              { username, 
                email
              }),
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        response2 = await fetch(`/api/users/add`, {
          method: 'POST',
          body: JSON.stringify(
              { username, 
                email
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
  }
  else {
    // Unable to retrieve the users.id ...
    document.location.replace('/');
  }
};

const deleteUserProfile = async (event) => {
  const iUserID = document.querySelector('input[name="user-id"]').value;
  if ( iUserID > 0 ) {
    console.log( `Initiating routing request to delete user# [${iUserID}]` );
    let response = await fetch(`/api/users/retrieve/${iUserID}`, {
      method: 'GET'
    })

    if ( response.ok ) {

      let jResponse = await response.json();
      console.log( `USER RECORD:` );
      console.log( jResponse );

      let file='';

      let iTotalPets=jResponse.user_pets.length;
      console.log( `Pets associated to user#${iUserID}: [${iTotalPets}]` );

      for( var iPetIdx=0; ( iPetIdx < iTotalPets ); iPetIdx++ )
      {
        let iPetID = jResponse.user_pets[iPetIdx].id;
        if ( iPetID > 0 ) {
          console.log( `\n[${iPetIdx}]: ${jResponse.user_pets[iPetIdx].petname} with id: ${iPetID}` );
          if ( jResponse.user_pets[iPetIdx].pet_photo ) {
            if ( jResponse.user_pets[iPetIdx].pet_photo.length ) {
              file = jResponse.user_pets[iPetIdx].pet_photo
              console.log( `   Deleting image: [${file}]` );
              let formLicenseData = new FormData()
              formLicenseData.append("file", file)
              const response = await fetch('/uploadimages', {
                  method: "DELETE", 
                  body: formLicenseData
              })
              const {data} = await response.json();
            }
          }
          if ( jResponse.user_pets[iPetIdx].pet_license_file ) {
            if ( jResponse.user_pets[iPetIdx].pet_license_file.length ) {
              file = jResponse.user_pets[iPetIdx].pet_license_file;
              console.log( `   Deleting image: [${file}]` );
              let formLicenseData = new FormData()
              formLicenseData.append("file", file)
              const response = await fetch('/uploadimages', {
                  method: "DELETE", 
                  body: formLicenseData
              })
              const {data} = await response.json();
            }
          }

          let iTotalVaccines=jResponse.user_pets[iPetIdx].pet_vaccines.length
          console.log( `Vaccines associated to pet#${iPetID}: [${iTotalVaccines}]` );

          for( var iVacIdx=0; ( iVacIdx < iTotalVaccines ); iVacIdx++ ) {
            file = jResponse.user_pets[iPetIdx].pet_vaccines[iVacIdx].vaccine_license_file;
            if ( file ) {
              if ( file.length ) {
                console.log( `   Deleting image: [${file}]` );
                let formLicenseData = new FormData()
                formLicenseData.append("file", file)
                const response = await fetch('/uploadimages', {
                    method: "DELETE", 
                    body: formLicenseData
                })
                const {data} = await response.json();
              }
            }
          } // endFor( iVacIdx )
  
        } // endIf( iPetID > 0 )

      } // endFor( iPetIdx )

      let response2 = await fetch(`/api/users/${iUserID}`, {
        method: 'DELETE',
        body: JSON.stringify(
            { iUserID }),
        headers: { 'Content-Type': 'application/json' },
      });

      if ( response2.ok ) {
        document.location.replace('/');
      } else {
        alert( response2.statusText );
      }

    }
  }
  document.location.replace('/');
}

function cancelUserEdit() {
  document.location.replace('/');
}

// ============================================================================

document
  .querySelector( '#cancelUserEdit' )
  .addEventListener( 'click', cancelUserEdit )
document
  .querySelector( '.edit-user-form' )
  .addEventListener( 'submit', editUser )
document
  .querySelector( '#delprofilebtn' )
  .addEventListener( 'click', deleteUserProfile )
