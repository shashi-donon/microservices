import Ajv, {Schema} from 'ajv';

const ajv = new Ajv()

export const ValidateRequest = <T>(requestBody: unknown, schema: unknown)=>{
    const validateDate = ajv.compile<T>(schema);

    if(validateDate(requestBody)){
        return false;
    }

    const errors = validateDate.errors?.map((err)=>err.message);

    return errors && errors[0]
}