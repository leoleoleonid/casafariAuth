import {useContext, useState} from "react";
import {AuthContext} from "./AuthProvider";
import Container from "@mui/material/Container";
import {CssBaseline, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SignIn() {
    const {signIn} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <Typography component="h1" variant="h5">
                    Login in
                </Typography>
                <TextField
                    data-testid='email-input'
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    autoFocus
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                    data-testid='password-input'
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                    data-testid="signin-btn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => signIn(email, password)}
                >
                    SignIn
                </Button>
            </div>
        </Container>
    );
}