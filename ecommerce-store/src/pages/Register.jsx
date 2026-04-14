import { Avatar, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import LockIcon from '@mui/icons-material/Lock';
import { useTheme } from "@emotion/react";
import { useAuth } from "../firebase/Auth";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
    const theme = useTheme();
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        const { email, password, displayName } = event.target;
        console.log(event.target.password.value, event.target.email.value);
        try {
            await signUp(email.value, password.value, displayName.value);
            navigate("/login");

        } catch (error) {
            alert(error.message);
        }

    }

    return (
        <Container >
            <CssBaseline />
            <Box sx={{ mt: 8, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2 }} >
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Avatar sx={{ backgroundColor: "royalblue" }}>
                        <LockIcon />
                    </Avatar>
                    <Typography variant="h5" component="h3">Sign Up</Typography>
                </Box>
                <form onSubmit={handleSignUp} sx={{ mt: 1, }} >
                    <TextField type="text" name="displayName" label="Username" margin="normal" required fullWidth variant="outlined" autoFocus autoComplete="off"></TextField>
                    <TextField type="email" name="email" label="email" margin="normal" variant="outlined" autoFocus autoComplete="off" required fullWidth>
                    </TextField>
                    <TextField type="password" name="password" label="password" margin="normal" variant="outlined" autoFocus autoComplete="off" required fullWidth>
                    </TextField>
                    <Button type="submit" variant="contained" fullWidth>Sign Up</Button>
                </form>
                <Typography>Already Registered!!!<Link to='/login'><Button sx={{ml:2}} variant="oulined" color="inherit">Login here</Button></Link></Typography>
            </Box>
        </Container>

    )
}