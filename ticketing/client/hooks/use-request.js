import axios from 'axios';
import {useState} from 'react';

export default ({url, method, body, onSuccess}) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);
            if (onSuccess) {
                onSuccess(response.data);
            }
            return response.data;
        } catch (e) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oops...</h4>
                    <ul>
                        {e.response.data.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>
            );
            throw e;
        }
    }
    return {doRequest, errors};
}