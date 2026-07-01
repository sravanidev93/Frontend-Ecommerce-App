import { Button, Container, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import { updateAddress } from '../features/checkout.slice';
import { useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";
export default function AddressForm() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        dispatch(updateAddress(formJson));
    }
    return (
        <Container maxWidth="md" >
            <Box component="form" onSubmit={handleSubmit} sx={{ margin: theme.spacing(4) }}>
                <Paper elevation={3} sx={{
                    borderRadius: 2, padding: theme.spacing(2),
                    marginTop:theme.spacing(2)
                }}>     <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                type="text"
                                label="firstname"
                                id="firstname"
                                name="firstname"
                                autoComplete="given-name"
                                required
                                fullWidth
                            >
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                type="text"
                                name="lastname"
                                id="lastname"
                                label="lastname"
                                required
                                fullWidth
                                autoComplete="family-name">
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                required
                                fullWidth
                                type="email"
                                name="email"
                                id="email"
                                label="email"
                                autoComplete="email">
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                required
                                fullWidth
                                type="tel"
                                id="contact"
                                label="phone Number"
                                name="phone"
                                autoComplete="tel"
                            ></TextField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                required
                                fullWidth
                                type="text"
                                label="street-name"
                                name="street-name"
                                id="street-name"
                                autoComplete="address-line-1">

                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                required
                                fullWidth
                                type="text"
                                label="city"
                                name="city"
                                id="city"
                                autoComplete="address-level-2">

                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                required
                                fullWidth
                                type="text"
                                label="state"
                                name="state"
                                id="state"
                                autoComplete="address-level-1">

                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                required
                                fullWidth
                                type="text"
                                label="country"
                                name="country"
                                id="country"
                                autoComplete="country">

                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                required
                                fullWidth
                                type="text"
                                label="postal code"
                                name="postal code"
                                id="postal code"
                                autoComplete="postal-code">

                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Button fullWidth type="submit" variant="outlined" color="success">Submit</Button>

                        </Grid>
                    </Grid>



                </Paper>

            </Box>

        </Container>
    )
}