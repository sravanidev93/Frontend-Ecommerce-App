
import { useSelector, useDispatch } from "react-redux";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { addToCart, removeFromcart } from "../features/cart-slice";
import { getSubTotal, getTotalAmount } from "../utils";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const cart = useSelector(state => state.cart.value);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const handleQuantityChange = (ev, { id, thumbnail, title, rating, quantity }) => {
        const newValue = ev.target.valueAsNumber;
        const diff = newValue - quantity;
        if (diff > 0) {
            dispatch(addToCart({ id, quantity: Math.abs(diff) }));
        } else if (diff < 0) {
            console.log(quantity, newValue, diff)
            dispatch(removeFromcart({ id, thumbnail, title, rating, quantity: diff }));
        }
    }

    return (
        <Container sx={{
            flexGrow: 1, py: 8
        }}>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: { xs: "column", sm: "column", md: "row" },
                justifyContent: {xs:"center",sm:"space-around",md:"space-between"},
                alignItems:{xs:"center",sm:"center",md:"flex-start"},
                padding: 4,
                boxSizing: "border-box"
            }}
            >
                <Grid sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                }}>
                    {cart?.map(({ id, thumbnail, title, rating, quantity, price }) => (
                        <Grid key={id}  >
                            <Card sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: { xs: "column", sm: "column", md: "row" },
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: 4,
                                boxSizing: "border-box"
                            }}>
                                <CardMedia
                                    sx={{ width: 150, height: 150, objectFit: "contain" }}
                                    image={thumbnail}
                                    title={title}
                                />
                                <CardContent >
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,

                                    }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {title}
                                        </Typography>
                                        <Typography variant="h6">{`$${price}`}</Typography>
                                        <Rating readOnly precision={0.5} defaultValue={rating} />
                                        <TextField label="Quantity" color="success"
                                            sx={{ width: "100%" }}
                                            value={quantity}
                                            onChange={(ev) => handleQuantityChange(ev, { id, thumbnail, title, rating, quantity })}
                                            variant="outlined" type="number" size="medium"
                                            inputProps={{
                                                min: 0,
                                                max: 12
                                            }}
                                        />
                                    </Box>
                                </CardContent>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    height: "100%"
                                }}>
                                    <Typography variant="h6">Subtotal</Typography>
                                    <Typography variant="h6">{getSubTotal(cart, id)}</Typography>
                                </Box>

                                {/* <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions> */}
                            </Card>
                        </Grid>
                    ))
                    }
                </Grid>
                <Grid size={{xs:"12",sm:"12",md:"12"}}>
                    <Card sx={{ width: "100%",height:"100%", p: 2}}>
                        <CardContent>
                            <Typography variant="h6">Bill amount</Typography>
                            <Typography variant="h6">{getTotalAmount(cart)}</Typography>
                            <Button variant="outlined" onClick={()=>navigate('/checkout')}>Buy Now</Button>
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </Container>
    )
};