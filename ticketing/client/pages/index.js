import axios from 'axios';

const LandingPage = ({currentUser}) => {
    console.log(currentUser);
    return <h1>Landing</h1>;
}

LandingPage.getInitialProps = async ({req}) => {
    console.log(req.headers);
    if (typeof window === 'undefined') {
        // server
        const {data} = await axios.get(
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
            {
                headers: {
                    Host: 'maksudik.dev'
                }
            }
        )
        return data;
    } else {
        // browser
        const {data} = await axios.get('/api/users/currentuser');
        console.log('I am on the server!');
        return data;
    }
    return {};
};

export default LandingPage;