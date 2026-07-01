import { Button, Container, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import { updatePayment } from '../features/checkout.slice';
import { useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";
export default function PaymentForm() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        dispatch(updatePayment(formJson));
    }
    return (
        <Container maxWidth="md" >
            <Box component="form" onSubmit={handleSubmit} sx={{ margin: theme.spacing(3) }}>
                <Paper elevation={3} sx={{
                    borderRadius: 2, padding: theme.spacing(2),
                    marginTop:theme.spacing(2)
                }}>     <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                type="text"
                                label="Card Name"
                                id="card-name"
                                name="cardName"
                                autoComplete="cc-name"
                                required
                                fullWidth
                            >
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                required
                                fullWidth
                                type="number"
                                label="Card Number"
                                name="cardNumber"
                                id="card-number"
                                inputProps={{maxLength:10}}
                                autoComplete="cc-number">

                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                type="password"
                                name="cvv"
                                id="cvv"
                                label="cvv"
                                required
                                fullWidth
                                inputProps={{maxLength:4}}
                                autoComplete="cc-csc">
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                required
                                fullWidth
                                type="text"
                                name="expiryDate"
                                id="expiry-date"
                                label="expiry-date"
                                placeholder="MM/YYYY"
                                inputProps={{maxLength:5}}
                                autoComplete="cc-exp">
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