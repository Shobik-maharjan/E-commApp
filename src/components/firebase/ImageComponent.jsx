import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

const ImageComponent = ({ imageName }) => {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        // Initialize Firebase Storage
        // const storage = getStorage();

        // Create a reference to the image in Firebase Storage
        const imageRef = ref(storage, "productsImage/" + imageName);

        // Get the download URL of the image
        const url = await getDownloadURL(imageRef);

        // Set the image URL in the component state
        setImageURL(url);
      } catch (error) {
        // Handle errors (e.g., image not found)
        console.error("Error getting image URL:", error);
      }
    };

    if (imageName) {
      fetchImageURL();
    }
  }, [imageName]);

  return (
    <div>
      {imageURL ? (
        <img src={imageURL} alt={imageName} />
      ) : (
        <p>Image not found</p>
      )}
    </div>
  );
};

export default ImageComponent;
