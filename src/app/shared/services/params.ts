import { HttpParams } from '@angular/common/http';

/**
 * Преобразует объект `model` в `HttpParams.
 *
 * @param model Исходная модель.
 */
export function toHttpParams(model: any): HttpParams {
  let params = new HttpParams();

  model = flatten(model);
  Object.entries(model).forEach(([key, value]) => {
    if (value == null) {
      return;
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        value.forEach((val2) => {
          params = params.append(key, toString(val2));
        });
      } else if (value instanceof Date) {
        params = params.set(key, toString(value));
      }
    } else {
      params = params.set(key, toString(value));
    }
  });

  return params;
}

function toString(value: any): string {
  if (typeof value === 'object') {
    if (value instanceof Date) {
      return value.toISOString();
    }
  }

  return value.toString();
}

function traverseAndFlatten(
  currentNode: any,
  target: any,
  flattenedKey?: string
): void {
  for (const key in currentNode) {
    if (currentNode.hasOwnProperty(key)) {
      let newKey;
      if (flattenedKey === undefined) {
        newKey = key;
      } else {
        newKey = flattenedKey + '.' + key;
      }

      const value = currentNode[key];
      if (typeof value === 'object' && !(value instanceof Date)) {
        traverseAndFlatten(value, target, newKey);
      } else {
        target[newKey] = value;
      }
    }
  }
}

function flatten(obj: any): any {
  const flattenedObject = {};
  traverseAndFlatten(obj, flattenedObject);
  return flattenedObject;
}
