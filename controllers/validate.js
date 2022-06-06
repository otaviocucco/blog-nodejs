const Joi = require('@hapi/joi');


const postValidate = (data => {

    const schema = Joi.object({
        image: Joi.string().required().min(3).max(200),
        title: Joi.string().required().min(3).max(50),
        description: Joi.string().required().min(3).max(250),
        author: Joi.string().required().min(3).max(100)
    })

    return schema.validate(data);
})


module.exports.postValidate = postValidate;
