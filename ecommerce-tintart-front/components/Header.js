import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "@/components/icons/SearchIcon";
import UserCartIcon from "./icons/UserCartIcon";
import UserAccountIcon from "./icons/UserAccountIcon";
import PartnershipIcon from "./icons/PartnershipIcon";

const StyledHeader = styled.header`
  background-color: #222;
  position:sticky;
  top:0;
  z-index:10;
`;
const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  min-width:30px;
  padding: 10px 0;
  svg{
    height:20px;
  }
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a{
    display:inline-block;
    min-width:20px;
    color:white;
    svg{
      width:14px;
      height:14px;
    }
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownToggle = styled.button`
  display: block;
  color: #aaa;
  text-decoration: none;
  min-width: 30px;
  padding: 10px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px; /* Adjust the font size as desired */
  svg {
    height: 20px;
  }
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.open ? "block" : "none")};
  background-color: #222;
  padding: 10px;
  margin: 0;
  list-style: none;
  z-index: 1;
`;

const DropdownItem = styled.li`
  margin-bottom: 5px;
`;

export default function Header() {
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive,setMobileNavActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div classname="flex.items-center">
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>TintArt</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>Shop & Customization</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <DropdownContainer>
        <DropdownToggle onClick={toggleDropdown}>
          Partnerships <PartnershipIcon />
        </DropdownToggle>
        <div classname="flex.items-center">
        <DropdownMenu open={dropdownOpen}>
          <DropdownItem>
            <NavLink href="#">Artist 1</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="#">Artist 2</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="#">Merchant</NavLink>
          </DropdownItem>
        </DropdownMenu>
        </div>
      </DropdownContainer>
            <NavLink href={'/account'}><UserAccountIcon/></NavLink>
            <NavLink href={'/cart'}><UserCartIcon />({cartProducts.length})</NavLink>
          </StyledNav>
          <SideIcons>
            <Link href={'/search'}><SearchIcon /></Link>
            <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
              <BarsIcon />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  </div>
  );
}