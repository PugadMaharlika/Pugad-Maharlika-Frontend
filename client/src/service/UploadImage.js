import axios from "axios";

const UploadImage = (file, setSuccess, setErrors, setCallback, user) => {
  if (!file) {
    setSuccess(false);
    setErrors(["No file selected. Please select an image file"]);
    return false;
  }

  // Check file type (case-insensitive)
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (!allowedTypes.includes(file.type.toLowerCase())) {
    setSuccess(false);
    setErrors(["Invalid file type. Only PNG, JPG, and JPEG are allowed"]);
    return false;
  }

  // Check file size (less than or equal to 5 MB)
  const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
  if (file.size > maxSize) {
    setSuccess(false);
    setErrors(["File size exceeds 5 MB. Please choose a smaller file."]);
    return false;
  }

  const formData = new FormData();
  const file_name = user.id + user.dateCreated + file.name;

  // Create a new file with the updated name
  const newFile = new File([file], file_name, { type: file.type });

  formData.append("file", newFile);
  formData.append("upload_preset", "bly6md1o");

  axios
    .post("https://api.cloudinary.com/v1_1/dchcpwbya/upload", formData)
    .then((response) => {
      setSuccess(true);
      setErrors(["Image uploaded successfully."]);
      setCallback(response.data.url);
    });
};

export default UploadImage;
