import { Button, Container, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import { updateAddress } from '../features/checkout.slice';
import { useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { getSubTotal, formatIndianRupee, getTotalAmount } from "../utils";
export default function ReviewForm() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const addressInfo = useSelector((state) => state.checkout.address);
    const paymentInfo = useSelector(state => state.checkout.payment);
    const cartInfo = useSelector(state => state.cart.value);
    console.log("Address details", addressInfo);
    console.log("Payment Details", paymentInfo);
    console.log("Cart Details", cartInfo);

    return (
        <Container maxWidth="md" >
            <Box sx={{ margin: theme.spacing(4) }}>

                <Paper elevation={3} sx={{
                    borderRadius: 2, padding: theme.spacing(2),
                    marginTop: theme.spacing(2)
                }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Address details
                    </Typography>
                    <Grid container sx={{ margin: theme.spacing(2) }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                        {Object.entries(addressInfo.payload).map(([key, value]) => (
                            <Grid size={{ xs: 6 }} >
                                <Typography variant="body1" gutterBottom>{`${key}:${value}`}</Typography>

                            </Grid>))}
                    </Grid>
                    <Typography variant="h5" component="h2">
                        Payment details
                    </Typography>
                    <Grid container justifyContent="center" sx={{ margin: theme.spacing(2) }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            Object.entries(paymentInfo.payload).map(([key, value]) => (
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="body1" gutterBottom>{`${key}:${value}`}</Typography>

                                </Grid>))
                        }
                    </Grid>
                    <Grid container justifyContent="center" sx={{ margin: theme.spacing(2) }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {cartInfo.map(({ id, title, thumbnail, price, quantity }) => (
                            <Grid size={{xs:4,md:6}}>                            <Card >
                                <CardContent>
                                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                        {title}</Typography>
                                    <Avatar
                                        alt={`${title}-${id}`}
                                        src={thumbnail}
                                        sx={{ width: 56, height: 56 }}
                                    />

                                    <Typography variant="h6" component="div">
                                        {`Quantity:${quantity}`}
                                    </Typography>
                                    <Typography variant="body2">
                                        {`Subtotal:${formatIndianRupee(getSubTotal(cartInfo, id))}`}
                                    </Typography>
                                </CardContent>

                            </Card></Grid>
                        ))}
                    </Grid>
                    <Grid size={{xs:12}}>
                        <Typography textAlign="center">{formatIndianRupee(getTotalAmount(cartInfo))}</Typography>
                    </Grid>

                </Paper>

            </Box>

        </Container>
    )
}
