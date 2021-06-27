
const uploadFormHandler = async (event) => {
  event.preventDefault();
  let file = document.getElementById("upload-file").files[0];
  console.log(file)
  let formData = new FormData();
  formData.append("file", file);
  const response = await fetch('/upload/new-image', {
    method: "POST", 
    body: formData
  });
  const {data} = await response.json()
  if (data)
    console.log(data);
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.upload-form')
  .addEventListener('submit', uploadFormHandler);
