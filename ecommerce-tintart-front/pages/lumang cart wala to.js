import React from "react";
import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";


const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: grey;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(
    CartContext
  );
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cityError, setCityError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");
  const [streetAddressError, setStreetAddressError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [history] = useState("");

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post("/api/cart", { ids: cartProducts })
        .then((response) => {
          setProducts(response.data);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  // Validation functions
  const validateName = () => {
    if (!name) {
      setNameError("Name is required.");
      toast.error("Please enter your name.");
    } else {
      setNameError("");
    }
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required.");
      toast.error("Please enter your email.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.");
      toast.error("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validateCity = () => {
    if (!city) {
      setCityError("City is required.");
      toast.error("Please enter your city.");
    } 
  };

  const validatePostalCode = () => {
    if (!postalCode) {
      setPostalCodeError("Postal Code is required.");
      toast.error("Please enter your Postal Code.");
    } else {
      setPostalCodeError("");
    }
  };

  const validateStreetAddress = () => {
    if (!streetAddress) {
      setStreetAddressError("Address is required.");
      toast.error("Please enter your Address.");
    } else {
      setStreetAddressError("");
    }
  };

  const validateCountry = () => {
    if (!country) {
      setCountryError("Country is required.");
      toast.error("Please enter your country.");
    }
  };

  async function goToPayment() {
    const confirmed = window.confirm("Are you sure you want to proceed with the checkout?");

    if (!confirmed) {
      return;
    }

    if (!name || !email || !city || !postalCode || !streetAddress || !country) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    } else {
      toast.error("Checkout failed. Please try again.");
    }
  }
  async function goToCOD() {
    const confirmed = window.confirm("Are you sure you want to proceed with the checkout?");

    if (!confirmed) {
      return;
    }

    if (!name || !email || !city || !postalCode || !streetAddress || !country) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    } else {
      toast.error("Checkout failed. Please try again.");
    }
    const redirectUrl = "http://localhost:3001/cart?success=1";
    window.location.href = redirectUrl;
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for choosing us!</h1>
              <p>You'll receive an email when your order is ready for delivery.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart has 0 order</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter((id) => id === product._id).length}
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>₱{cartProducts.filter((id) => id === product._id).length * product.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Total ₱{total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order details</h2>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(ev) => setName(ev.target.value)}
                onBlur={validateName}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
                onBlur={validateEmail}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                  onBlur={validateCity}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                  onBlur={validatePostalCode}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(ev) => setStreetAddress(ev.target.value)}
                onBlur={validateStreetAddress}
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
                onBlur={validateCountry}
              />
<div style={{ marginBottom: '10px', marginTop: '10px' }}>
  <Button black block onClick={goToPayment}>
    Checkout with Paypal
  </Button>
</div>
<div style={{ marginBottom: '10px' }}>
  <Button black block onClick={goToPayment}>
    Checkout with Gcash
  </Button>
</div>
<div style={{ marginBottom: '10px' }}>
  <Button black block onClick={goToCOD}>
    Cash on Delivery
  </Button>
</div>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
      <ToastContainer />
    </>
  );
};
