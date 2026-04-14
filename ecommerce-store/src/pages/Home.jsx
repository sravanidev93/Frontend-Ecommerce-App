
import { Container, Grid, Rating } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart-slice";
import { getProducts } from "../features/product-slice";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export function Home() {
    const loadProducts = useSelector(state => state.products);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCategory = searchParams.get("category") || "";
    const searchTerm = searchParams.get("search") || "";
    const [selectedProduct, setSelectedProduct] = useState("");
    const dispatch = useDispatch();

    const { value: products, loading } = loadProducts ?? {};


    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);



    // let filteredProducts=(products)=>{
    //     let filtered;
    //     if (selectedCategory&&selectedCategory!=="all"){
    //         filtered=products.filter(product=>product.category==selectedCategory);
    //     }
    //     if (searchTerm){
    //         filtered=
    //     return filtered;

    // }
    // console.log(selectedCategory);
    let filteredProducts = (selectedCategory && selectedCategory !== "all") ? products.
        filter(product => product.category == selectedCategory) : products;

    filteredProducts = searchTerm ? filteredProducts.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())) : filteredProducts;

    return <div>
        <Container sx={{ py: 8 }} maxWidth="xl">
            <Grid container spacing={3} justifyContent="center">
                {
                    loading ? <Typography variant="h1" component="h2">
                        Loading Products .... </Typography>
                        : filteredProducts?.map(product => {
                            const { id, thumbnail, title, rating, description ,price} = product;
                            // console.log(product)
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
                                                <Typography variant="h6">{`$${price}`}</Typography>
                                                <Rating readOnly precision={0.5} defaultValue={rating} />
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" variant="contained" color="primary"
                                                onClick={() => dispatch(addToCart({ id, thumbnail, title, rating, description,price }))}>
                                                ADD TO CART
                                            </Button>
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