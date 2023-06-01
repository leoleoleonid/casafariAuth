import {useState, useEffect} from 'react';

import Container from "@mui/material/Container";
import $api from "../http";

function SearchBitcoinAddress() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if(!profile) {
            getProfile()
                .then(({data}) => {
                    setProfile(data);
                })
        }
    },[])

    const getProfile = async () => {
        return await $api.get('/auth/user/profile')
    }

    return (
        <Container maxWidth="md">
            {'PROFILE!'}
            {JSON.stringify(profile)}
        </Container>
    );

}

export default SearchBitcoinAddress;
