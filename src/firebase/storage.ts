import { deleteObject, FirebaseStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';

/**
 * Global error constant for Cloud Storage.
 */
const CloudStorageError = new Error('Storage has encountered an error. Please try again later.');

/**
 * Uploads a single menu into Firebase Cloud Storage.
 *
 * @param file - A file object from JavaScript's / Ionic's File API
 * @returns An array, one consists of full path where the image is located, and the other is the reference for deletion.
 */
export const uploadMenu = async (storage: FirebaseStorage, file: File) => {
  const fileName = nanoid();
  const storageMenuRef = ref(storage, `menu/${fileName}`);

  try {
    await uploadBytes(storageMenuRef, file);
  } catch {
    throw CloudStorageError;
  }

  try {
    const uploadUrl = await getDownloadURL(storageMenuRef);

    return [uploadUrl, storageMenuRef.toString()];
  } catch {
    throw CloudStorageError;
  }
};

/**
 * Deletes a single menu photo from Firebase Cloud Storage.
 *
 * @param reference - The reference towards the object at Firebase Cloud Storage
 */
export const deleteMenu = async (storage: FirebaseStorage, reference: string) => {
  const storageMenuRef = ref(storage, `menu/${reference}`);

  try {
    await deleteObject(storageMenuRef);
  } catch {
    throw CloudStorageError;
  }
};
