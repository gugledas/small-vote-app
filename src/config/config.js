import axios from "axios";
const config = {
  //	basic_url: "http://d9-test.kksa",
  basic_url: "http://wb-horizon.kksa",
  /**
   * @params {string} urlRequest
   */
  async load(urlRequest) {
    try {
      const response = await axios.get(this.basic_url + urlRequest);
      console.log(response);
      if (response.data) {
        return response.data;
      }
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  /**
   * @params {string} url
   */
  async datas(url) {
    let datas = await this.load(url);
    //let datas = this.defaultDatas;
    return datas;
  },

  defaultDatas: {},
};
export default config;
