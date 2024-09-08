export function any<T>(promisesArray: Promise<T>[]) {
  return new Promise((resolve, reject) => {
    const errorsArray: unknown[] = [];

    promisesArray.forEach(promise => {
      promise
        .then(result => {
          resolve(result);
        }, error => {
          errorsArray.push(error);
          if (errorsArray.length === promisesArray.length) {
            reject(errorsArray);
          }
        })
    });
  });
}


export function all<T>(promisesArray: Promise<T>[]) {
  return new Promise((resolve, reject) => {
    const resultsArray: T[] = [];

    promisesArray.forEach(promise => {
      promise
        .then(result => {
          resultsArray.push(result);
          if (resultsArray.length === promisesArray.length) {
            resolve(resultsArray);
          }
        }, error => {
          reject(error);
        })
    });
  });
}

export function allSettled<T>(promisesArray: Promise<T>[]) {
  interface Settle {
    status: 'fulfilled' | 'rejected',
    value?: T,
    reason?: unknown
  }

  return new Promise((resolve) => {
    const settlesArray: Settle[] = [];

    promisesArray.forEach(promise => {
      promise
        .then(result => {
          settlesArray.push({
            status: 'fulfilled',
            value: result
          });
        }, error => {
          settlesArray.push({
            status: 'rejected',
            reason: error
          })
        })
        .finally(() => {
          if (settlesArray.length === promisesArray.length) {
            resolve(settlesArray);
          }
        })
    });
  });
}

export function race<T>(promisesArray: Promise<T>[]) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach(promise => {
      promise.then(
        result => {
          resolve(result);
        },
        error => {
          reject(error);
        }
      );
    });
  });
}
