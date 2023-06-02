export class RequestModel {
  constructor() {
    this.url = "";
    this.method = "";
    this.params = {};
    this.data = null;
    this.headers = {};
    this.timeout = undefined;
    this.withCredentials = undefined;
    this.responseType = undefined;
    this.responseEncoding = undefined;
    this.xsrfCookieName = undefined;
    this.xsrfHeaderName = undefined;
    this.maxContentLength = undefined;
    this.maxBodyLength = undefined;
  }
}
