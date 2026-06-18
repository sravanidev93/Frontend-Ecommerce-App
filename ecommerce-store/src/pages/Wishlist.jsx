
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart-slice";
import { toggleWishlist } from "../features/wishlist-slice";
import { Container, Grid, Rating } from "@mui/material";
import { formatIndianRupee } from '../utils';

export default function Wishlist() {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist.value);
    const cart = useSelector(state => state.cart.value);
    const isWishlisted = (id) => wishlist.some((item) => item.id === id);
    const itemInCart = (id) => cart.some((item) => item.id === id);
    return <div>
        <Container sx={{ py: 8 }} maxWidth="xl">
            <Grid container spacing={3} justifyContent="center">
                {
                    wishlist?.map(product => {
                        const { id, thumbnail, title, rating, description, price } = product;
                            return (
                                <Grid key={id} >
                                    <Card sx={{
                                        maxWidth: "345px", height: "100%",
                                        display: "flex", flexDirection: "column"
                                    }} >
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="240"
                                                image={thumbnail}
                                                alt={`${title}-image`}
                                                sx={{ objectFit: "contain" }}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2"
                                                    sx={{
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 1,
                                                        WebkitBoxOrient: "vertical"

                                                    }}>
                                                    {title}
                                                </Typography>
                                                <Typography variant="body2" sx={{
                                                    color: 'text.secondary',
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical"

                                                }}>
                                                    {description}
                                                </Typography>
                                                <Typography variant="h6">{formatIndianRupee(price)}</Typography>
                                                <Rating readOnly precision={0.5} defaultValue={rating} />
                                            </CardContent>
                                        </CardActionArea>
                                    <CardActions sx={{display:"flex",
                                        justifyContent:"space-between"
                                    }}>
                                        {
                                        !itemInCart(id)?<Button size="small" variant="contained" color="primary"
                                            onClick={() => dispatch(addToCart({ id, thumbnail, title, rating, description, price }))}>
                                            ADD TO CART
                                        </Button>:<Button size="small" variant="contained" color="primary">
                                            Added To Cart
                                        </Button>}
                                            <IconButton aria-label="wishlist-button" size="large" onClick={()=>dispatch(toggleWishlist({ id, thumbnail, title, rating, description, price }))}>
                                                {isWishlisted(id)?<FavoriteIcon fontSize="inherit" sx={{color:"red"}} />:<FavoriteBorderIcon fontSize="inherit" sx={{color:"red"}}/>}

                                            </IconButton>
                                        </CardActions>
                                    </Card>

                                </Grid>

                            )

                        }

                        )
                }


            </Grid>

        </Container>

    </div >
}