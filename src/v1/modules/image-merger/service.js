const axios = require('axios');
const { TE, to } = require('../../../helper');
const mergeImg  = require('merge-img');
const { Config } = require('../../../../config');

// this function get images with text form catass.com website
const getImages = async (data) => {
  try {
    const images = []
    for (let i = 0; i < data.messages.length; i++) {
      const sm = data.messages[i];
      // sending message one by one for get cats images
        const [err, response] = await to(axios.request({
          method: 'GET',
          url: `https://cataas.com/cat/says/${sm}?width=${data.width}&height=${data.height}&color=${data.color}&size=${data.size}`,
          responseType: 'arraybuffer',
          responseEncoding: 'binary'
        }));

        if (err) TE(err.response ? err.response.data : err);
        // store image to images array
        if(response)images.push(response.data);
        
    }

    return images;

  } catch (error) {
    TE(error);
  }
};


// this function merge all images for a one
const makeMainImage = async (data ) => {
  try {
    const images = []
    for (let i = 0; i < data.length; i++) {
      // making images input object
      const SI = data[i];
      const Obj = {
        src: SI
      }
      images.push(Obj);
    }
    const [err, response] = await to(mergeImg(images))
    if (err) TE(err.response ? err.response.data : err);
    if(response){
      response.write(Config.IMAGE_LOCATION, (err) => {
        if(err){
          // if create main image fail
          TE(err)
        } 
        return;
      });
    }

  
    

  } catch (error) {
    TE(error);
  }
};


module.exports = {
  getImages,
  makeMainImage
};