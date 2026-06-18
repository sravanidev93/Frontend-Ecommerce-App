import { useSelector, useDispatch } from "react-redux";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActions } from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { addToCart, removeFromcart } from "../features/cart-slice";
import { formatIndianRupee, getSubTotal, getTotalAmount } from "../utils";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
export default function Cart() {
    const cart = useSelector(state => state.cart.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const handleQuantityChange = (ev, { id, thumbnail, title, rating, quantity }) => {
        const newValue = ev.target.valueAsNumber;
        const diff = newValue - quantity;
        if (diff > 0) {
            dispatch(addToCart({ id, quantity: diff }));
        } else if (diff < 0) {
            console.log(quantity, newValue, Math.abs(diff))
            dispatch(removeFromcart({ id, thumbnail, title, rating, quantity: Math.abs(diff) }));
        }
    }
    return (
        <Container sx={{ py: 8 }} >
            <Grid container spacing={2} >
            <Grid item container spacing={2} size={{ xs: 12,md:8 }}>
                    {cart?.map(({ id, thumbnail, title, rating, quantity, price }) => (
                        <Grid key={id} size={{ xs: 12}} >
                            <Card sx={{
                                display: "flex",
                                py: 2
                            }}>
                                <CardMedia
                                    sx={{
                                        height: theme.spacing(30),
                                        width: theme.spacing(30),
                                        py: theme.spacing(),
                                        objectFit: "contain"
                                    }}
                                    image={thumbnail}
                                    title={title}

                                />
                                <CardContent sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flex: 1
                                }}>
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2
                                    }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {title}
                                        </Typography>
                                        <Typography variant="h6">{formatIndianRupee(price)}</Typography>
                                        <Rating readOnly precision={0.5} defaultValue={rating} />
                                        <TextField label="Quantity" color="success"
                                            sx={{ width: theme.spacing(8) }}
                                            value={quantity}
                                            onChange={(ev) => handleQuantityChange(ev, { id, thumbnail, title, rating, quantity })}
                                            variant="standard" type="number" size="medium"
                                            inputProps={{
                                                min: 0,
                                                max: 12
                                            }}
                                        />
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                        padding: 2
                                    }}>
                                        <Typography variant="h6">{formatIndianRupee(getSubTotal(cart, id))}</Typography>
                                        <Button size="small" variant="outlined" color="primary" onClick={() => dispatch(removeFromcart({ id, quantity }))}>
                                            Remove
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                    }
                </Grid>
                <Grid size={{ xs: 12,md:4}} sx={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Box sx={{ width: "100%" }}>
                        <Card sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            padding: theme.spacing(2)
                        }}>
                            <Typography variant="h6">Bill amount</Typography>
                            <Typography variant="h6">{formatIndianRupee(getTotalAmount(cart))}</Typography>
                            <Button variant="outlined" onClick={() => navigate('/checkout')}>Buy Now</Button>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
};