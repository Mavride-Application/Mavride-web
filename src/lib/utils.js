import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Replaces FileList properties in the given object with the first file in the list
 * or null if the FileList is empty.
 *
 * @param {Record<string, any>} data - The object to process.
 * @returns {Record<string, any>} - The modified object with FileList properties replaced.
 */
export const replaceFileListWithFile = (data) => {
  for (const key in data) {
    if (data[key] instanceof FileList) {
      // Replace the FileList with the actual file or null if the FileList is empty
      data[key] = data[key].length > 0 ? data[key][0] : null;
    }
  }
  return data;
};

export const replaceFileWithFileList = (data) => {
  for (const key in data) {
    if (data[key] instanceof File) {
      // Replace the File with a FileList containing the file
      data[key] = new DataTransfer(); // Create a DataTransfer object to hold the FileList
      data[key].items.add(data[key]); // Add the file to the FileList
      data[key] = data[key].files; // Get the FileList
    }
  }
  return data;
};

export const convertToFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Handle case where value is an array
      value.forEach((item) => {
        formData.append(`${key}[]`, item);
      });
    } else if (value instanceof File || value instanceof Blob) {
      // Handle case when value is a file
      formData.append(key, value);
    } else if (value instanceof FileList) {
      formData.append(key, value[0]);
    } else if (value !== null && typeof value === "object") {
      // Handle case where value is an object
      formData.append(key, JSON.stringify(value));
    } else {
      // Default case
      formData.append(key, value);
    }
  });
  return formData;
};

export const getFirstRowIndex = ({ pageSize, pageIndex }) => {
  return pageIndex * pageSize + 1;
};

export const getLastRowIndex = ({ pageSize, pageIndex }, rowCount) => {
  const lastIndex = (pageIndex + 1) * pageSize;

  return Math.min(lastIndex, rowCount);
};
