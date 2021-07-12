
// buttons related to each unique pet for this user:
const petCardClickEvents = async (event) => {
  let iPetID = 0;
  // --------------------------------------------------------------------------
  if ( event.target.matches(".addvaccinebtn") ) {
  // --------------------------------------------------------------------------
    iPetID = event.target.getAttribute("data-petid")
    document.location.replace(`/add-vaccine/${iPetID}`)
  } 
  // --------------------------------------------------------------------------
  else if ( event.target.matches(".deletepetbtn") )
  // --------------------------------------------------------------------------
  { 
    iPetID = event.target.getAttribute("data-petid")
    if ( iPetID > 0 ) {

      console.log( `Initiating routing request to delete pet# [${iPetID}]` );

      let response = await fetch(`/api/pets/retrieve/${iPetID}`, {
        method: 'GET'
      })
  
      if ( response.ok ) {
  
        let jResponse = await response.json();
        let file='';
  
        console.log( `pet_photo: [${jResponse.pet_photo}]` );
        if ( jResponse.pet_photo ) {
          if ( jResponse.pet_photo.length ) {
            file = jResponse.pet_photo;
            console.log( `Deleting image: [${file}]` );
  
            let formLicenseData = new FormData()
            formLicenseData.append("file", file)
            const response = await fetch('/uploadimages', {
                method: "DELETE", 
                body: formLicenseData
            })
            const {data} = await response.json();
          }
        }  
  
        console.log( `pet_license_file: [${jResponse.pet_license_file}]` );
        if ( jResponse.pet_license_file ) {
          if ( jResponse.pet_license_file.length ) {
            file = jResponse.pet_license_file;
            console.log( `Deleting image: [${file}]` );
  
            let formLicenseData = new FormData()
            formLicenseData.append("file", file)
            const response = await fetch('/uploadimages', {
                method: "DELETE", 
                body: formLicenseData
            })
            const {data} = await response.json();
          }
        }
  
        let iTotalVaccines=jResponse.pet_vaccines.length
  
        console.log( `Vaccines associated to pet# [${iPetID}]` );

        for( var i=0; ( i < iTotalVaccines ); i++ ) {
          console.log( `${i}: ${jResponse.pet_vaccines[i].vaccine_license_file}` );
          if ( jResponse.pet_vaccines[i].vaccine_license_file ) {
            if ( jResponse.pet_vaccines[i].vaccine_license_file.length ) {
              file = jResponse.pet_vaccines[i].vaccine_license_file;
              console.log( `Deleting image: [${file}]` );

              let formLicenseData = new FormData()
              formLicenseData.append("file", file)
              const response = await fetch('/uploadimages', {
                  method: "DELETE", 
                  body: formLicenseData
              })
              const {data} = await response.json();
              pet_license_file = data;
            }
          }
        } // endFor

        let response2 = await fetch(`/api/pets/${iPetID}`, {
          method: 'DELETE',
          body: JSON.stringify(
              { iPetID }),
          headers: { 'Content-Type': 'application/json' },
        });

        if ( response2.ok ) {
          document.location.replace('/');
        } else {
          alert( response2.statusText );
        }

      } else {
        alert( response.statusText );
      }
  
    } // endIf( iPetID > 0 )
    
  }
}

document
  .querySelector('#petinfocontainer')
  .addEventListener('click', petCardClickEvents );
