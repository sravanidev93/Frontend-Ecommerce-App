import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartRounded';
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsCount } from "../utils";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { Select } from "@mui/material";
import { getCategoryList } from "../features/category-slice";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import Cart from '../pages/Cart';
import PositionedMenu from "./Menu";

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.value);
    const products = useSelector(state => state.products?.value);
    const theme = useTheme();

    const cartCount = getCartItemsCount(cartItems);
    const getCategories = useSelector(state => state.categories);
    const { value: categories, loading } = getCategories ?? {};
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(getCategoryList())
    }, [dispatch]);


    const handleCategoryChange = (ev) => {
        setSelectedCategory(ev.target.value);
    }

    useEffect(() => {
        if (selectedCategory) {
            navigate(`/?category=${selectedCategory}`);
            // console.log(selectedCategory);
        }
    }, [selectedCategory]);

    useEffect(() => {

        if (selectedCategory && search) {
            navigate(selectedCategory === "all" ? `/?search=${search}` : `/?category=${selectedCategory}&search=${search}`)
        } else {
            navigate(selectedCategory === "all" ? '/' : `/?category=${selectedCategory}`)
        }
    }, [search]);

    const SearchBar = styled("section")(({ theme }) => ({
        position: "relative",
        display: "flex",
        width: "100%",
        padding: theme.spacing(1),
        gap: theme.spacing(0.5),
        margin: theme.spacing(2),
        border: "1px solid #fff",
        borderRadius: theme.spacing(1),
        color: theme.palette.secondary.main,
        backgroundColor: alpha(theme.palette.common.white, 0.25),
        fontSize: "large",
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.35),
        },
         "& .MuiInputBase-input":{
            color:theme.palette.common.white,
        },
        "& .MuiOutlinedInput-notchedOutline":{
            border:"none"
        },
        "& .MuiSvgIcon-root":{
            fill:theme.palette.common.white
        },
        "& .MuiInputLabel-root":{
            color:theme.palette.common.white,

        }
    }));

    const StyleAutocomplete=styled(Autocomplete)(({theme})=>({
        "& .MuiInputBase-input":{
            color:theme.palette.common.white,
        },
        "& .MuiOutlinedInput-notchedOutline":{
            border:"none"
        },
        "& .MuiSvgIcon-root":{
            fill:theme.palette.common.white
        },
        "& .MuiInputLabel-root":{
            color:theme.palette.common.white,

        }
    }))

    function handleSearchChange({ label }) {
        setSearch(label)

    }
    return (
        <AppBar position="sticky">
            <Container maxWidth="xl"  >
                <Toolbar sx={{
                    width: "100%", display: "flex", flexWrap: {
                        xs: "wrap", sm: "nowrap", md: "nowrap",
                        flexDirection: { xs: "column", sm: "row", md: "row" },
                        justifyContent: { xs: "flex-start", sm: "space-evenly", md: "space-between" },
                        padding: 16
                    }, gap: "1"
                }} >
                    <Typography variant="h4" sx={{ margin: 0 }} >
                        Shopify
                    </Typography>
                    <SearchBar sx={{
                        display: "flex",
                        flexGrow: 1, flexShrink: 1,
                        width: "100%"
                    }}>
                        <Select value={selectedCategory} sx={(theme) => ({
                            textTransform: "capitalize",
                            color: theme.palette.secondary.main,
                            width: { xs: "40%", sm: "40%", md: "20%" },
                        })} onChange={handleCategoryChange}>
                            <MenuItem value="all" >All</MenuItem>

                            {categories ? categories.map((category) => <MenuItem key={category} value={category} sx={{ padding: "8px", textTransform: "capitalize" }}>{category}</MenuItem>) : null}

                        </Select>
                        <StyleAutocomplete
                            sx={{ width: { xs: "60%", sm: "60%", md: "80%" } }}
                            disablePortal
                            value={selectedProduct}
                            onChange={(event, newValue) => {
                                // console.log(event.newValue,newValue);
                                handleSearchChange(newValue);
                                setSelectedProduct(newValue);
                            }}

                            options={Array.from(selectedCategory === "all" ? products : products.filter(item => item.category === selectedCategory), (filtered) => ({ id: filtered.id, label: filtered.title }))}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                />
                            )}
                        />
                    </SearchBar>

                    <Box sx={{ display: "flex", width: "small", justifyContent: "fit-content", gap: 2, flexShrink: 0 }}>
                        <IconButton aria-label="displays no.of items in Cart" onClick={() => navigate('/cart')}>
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingCartIcon sx={(theme) => ({ color: theme.palette.secondary.main })}></ShoppingCartIcon>
                            </Badge>
                        </IconButton>
                        <PositionedMenu />

                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}