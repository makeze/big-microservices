import {useState} from 'react';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(email, password)
    }

    return (
        <form>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input className="form-control"/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control"/>
            </div>
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
};
