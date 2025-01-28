import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function jsonToFormData<T>(data: T): FormData {
  const formData = new FormData();

  const appendFormData = (value: any, keyPrefix = '') => {
    if (value && typeof value === 'object' && !(value instanceof File)) {
      Object.entries(value).forEach(([key, val]) => {
        appendFormData(val, keyPrefix ? `${keyPrefix}[${key}]` : key);
      });
    } else {
      formData.append(keyPrefix, value);
    }
  };

  appendFormData(data);
  return formData;
}

export function formDataToJson<T>(formData: FormData): T {
  const json: Record<string, any> = {};

  formData.forEach((value, key) => {
    if (json[key]) {
      // Si ya existe, conviértelo en array
      if (!Array.isArray(json[key])) {
        json[key] = [json[key]];
      }
      json[key].push(value);
    } else {
      json[key] = value;
    }
  });

  return json as T;
}
