export default class Http {

    get<T>(url: string, options = {}): Promise<T> {
      return this.makeRequest('GET', url, options);
    }

    post<T>(url: string, data: any, options = {}): Promise<T> {
      return this.makeRequest('POST', url, options, data);
    }

    delete<T>(url: string, options = {}): Promise<T> {
      return this.makeRequest('DELETE', url, options);
    }
  
    private makeRequest<T>(
      method: string,
      url: string,
      options?: any,
      data?: any
    ) {
      const req = new XMLHttpRequest();
      req.open(method, url);
      req.responseType = 'json';
      this.setHeaders(req, options);
  
      return new Promise<T>((resolve, reject) => {
          req.onreadystatechange = () => {
            if (req.readyState === 4) {
              if (req.status !== 200) {
                reject({
                  message: req.response,
                  error: `${req.status} ${req.statusText}`
                });
              } else {
                const result = typeof req.response === 'string'
                    ? JSON.parse(req.response)
                    : req.response;
                resolve(result);
              }
            }
          };
          req.send(data);
      });
    }
  
    private setHeaders(
      req: XMLHttpRequest,
      options: { headers?: { [name: string]: string } }
    ) {
      if (options.headers) {
        for (const header in options.headers) {
          if (options.headers[header]) {
            req.setRequestHeader(header, options.headers[header]);
          }
        }
      }
    }
  }
  