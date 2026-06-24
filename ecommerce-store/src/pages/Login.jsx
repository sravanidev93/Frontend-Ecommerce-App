import { Avatar, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import LockIcon from '@mui/icons-material/Lock';
import { useTheme } from "@emotion/react";
import { useAuth } from "../firebase/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export function Login() {
    const theme = useTheme();
    const { logIn, user } = useAuth();
    const navigate = useNavigate();
    // const [user, setUser] = useState(null);
    // const handleVerifyEmail = async () => {
    //     await verifyEmail();
    // }

    const handleSignUp = async (event) => {
        event.preventDefault();
        const { email, password } = event.target;
        console.log(user);
        // console.log(event.target.password.value, event.target.email.value);
        try {
            const user = await logIn(email.value, password.value);
            console.log("user", user);
            // setUser(user);
            // if(user.emailVerified){
                navigate("/");
            // }else{
            //     alert("please verify your email");
            // }
        } catch (error) {
            alert(error.message);
            navigate("/register")
        }

    }

    return (
        <Container  >
            <CssBaseline />
            <Box sx={{ mt: theme.spacing(8), display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }} >
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Avatar sx={{ backgroundColor: "royalblue" }}>
                        <LockIcon />
                    </Avatar>
                    <Typography variant="h5" component="h3">Sign In</Typography>
                </Box>

                <form onSubmit={handleSignUp} sx={{ mt: 1, }} >
                    <TextField type="email" name="email" label="email" margin="normal" variant="outlined" autoFocus autoComplete="off" required fullWidth>
                    </TextField>
                    <TextField type="password" name="password" label="password" margin="normal" variant="outlined" autoFocus autoComplete="off" required fullWidth>
                    </TextField>
                    <Button type="submit" variant="contained" fullWidth>Login</Button>
                </form>
                {/* {(user) ? (!user?.emailVerified) && <Button variant="contained" color="inherit" onClick={handleVerifyEmail}>Verify email</Button>
                :<Typography>Not Registered Yet!!<Link to='/register'><Button sx={{ ml: 2 }} variant="outlined" color="inherit">Register here</Button></Link></Typography>} */}
                    <Typography>Not Registered Yet!!<Link to='/register'><Button sx={{ ml: 2 }} variant="outlined" color="inherit">Register here</Button></Link></Typography>

            </Box>
        </Container>

    )
}