import HtmlIcon from "@mui/icons-material/Html";
import CssIcon from "@mui/icons-material/Css";
import JavascriptIcon from "@mui/icons-material/Javascript";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";

export const URL = process.env.REACT_APP_API_URL;
// export const URL = "http://161.97.144.45:8181";
export const imgPrefixURL = process.env.REACT_APP_IMAGE_PREFIX_URL;
export const docPrefixURL = process.env.REACT_APP_DOC_PREFIX_URL;
export const file_image =
  "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Ffile-extensions-1%2F64%2Fpdfs-512.png&tbnid=vFTHfMqlcS_BoM&vet=12ahUKEwiWmLK7puaDAxUsMRAIHVCMDckQMygDegQIARBR..i&imgrefurl=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F774684%2Fpdf_document_extension_file_format_icon&docid=A_kS90K1gfbTTM&w=512&h=512&q=pdf%20file%20icon&ved=2ahUKEwiWmLK7puaDAxUsMRAIHVCMDckQMygDegQIARBR";
export const navlink = [
  {
    url: "/",
    text: "Home",
  },
  {
    url: "/about",
    text: "About",
  },
  {
    url: "/services",
    text: "Services",
  },
  {
    url: "/portfolio",
    text: "Portfolio",
  },
];

export const home = [
  {
    text: "HELLO I'M",
    name: "Shyngys Khan",
    post: "Frontend developer",
    desc: "I'm open to new opportunities",
  },
];

export const about = [
  {
    desc: "I had studied at Eurasian national university ",
    desc1: "I want to work as a frontend developer",
    cover: "./images/man.png",
  },
];

export const services = [
  {
    id: 1,
    icon: <HtmlIcon />,
    title: "Creative Design",
    desc: "Lorem Ipsum simply text of the printing and type setting industry when an unknown printing simply",
  },
  {
    id: 2,
    icon: <CssIcon />,
    title: "Clean Code",
    desc: "Lorem Ipsum simply text of the printing and type setting industry when an unknown printing simply",
  },
  {
    id: 3,
    icon: <JavascriptIcon />,
    title: "Responsive Design",
    desc: "Lorem Ipsum simply text of the printing and type setting industry when an unknown printing simply",
  },
];

export const portfolio = [
  {
    id: 1,
    cover: "../images/port/port1.jpg",
    name: "Brand",
    category: "marketing",
    title: "Brex Logo",
  },
  {
    id: 2,
    cover: "../images/port/port2.jpg",
    name: "Brand",
    category: "design",
    title: "Brex Logo",
  },
  {
    id: 3,
    cover: "../images/port/port3.jpg",
    name: "Brand",
    category: "development",
    title: "Brex Logo",
  },
  {
    id: 4,
    cover: "../images/port/port4.jpg",
    name: "Brand",
    category: "marketing",
    title: "Brex Logo",
  },
  {
    id: 5,
    cover: "../images/port/port5.jpg",
    name: "Brand",
    category: "design",
    title: "Brex Logo",
  },
  {
    id: 6,
    cover: "../images/port/port6.jpg",
    name: "Brand",
    category: "development",
    title: "Brex Logo",
  },
];

export const social = [
  {
    id: 1,
    icon: <WhatsAppIcon />,
    hr: "https://wa.link/a0ba65",
  },
  {
    id: 2,
    icon: <TelegramIcon />,
    hr: "https://t.me/shyngysyerlanuly",
  },

  {
    id: 3,
    icon: <InstagramIcon />,
    hr: "https://instagram.com/u.busy21?igshid=MzMyNGUyNmU2YQ%3D%3D&utm_source=qr",
  },
];

export const records = [
  {
    id: 1,
    name: "My First Book of Pencil Control",
    description: "by Wonder House Books | 25 April 2018",
    price: 89,
    image:
      "https://m.media-amazon.com/images/I/810OOg88LoL._AC_UY327_FMwebp_QL65_.jpg",
    amount: 1,
  },
  {
    id: 2,
    name: "108 Panchatantra Stories",
    description: "by Maple Press  | 1 September 2020",
    price: 98,
    image:
      "https://m.media-amazon.com/images/I/71rmxx8P2qL._AC_UY327_FMwebp_QL65_.jpg",
    amount: 1,
  },
  {
    id: 3,
    name: "Amazing Questions & Answers Science",
    description: "by Om Books Editorial Team  | 25 November 2018",
    price: 143,
    image:
      "https://m.media-amazon.com/images/I/81Gbz0XnW7L._AC_UY327_FMwebp_QL65_.jpg",
    amount: 1,
  },
  {
    id: 4,
    name: "My First Book of Pencil Control",
    description: "by Wonder House Books | 25 April 2018",
    price: 57,
    image:
      "https://m.media-amazon.com/images/I/81Gbz0XnW7L._AC_UY327_FMwebp_QL65_.jpg",
    amount: 1,
  },
  {
    id: 5,
    name: "My First 1000 Words",
    description: "by Wonder House Books  | 1 January 2018",
    price: 149,
    image:
      "https://m.media-amazon.com/images/I/71O-FI7QApL._AC_UY327_FMwebp_QL65_.jpg",
    amount: 1,
  },
  {
    id: 6,
    name: "101 Panchatantra Stories for Children",
    description: "by Om Books Editorial Team | 30 September 2020",
    price: 135,
    image:
      "https://m.media-amazon.com/images/I/9173YBkMIsL._AC_UY327_FMwebp_QL65_.jpg",
    amount: 1,
  },
  {
    id: 7,
    name: "Pre-School Activities Pack ",
    description: "by Om Books Editorial Team  | 1 January 2021",
    price: 693,
    image:
      "https://m.media-amazon.com/images/I/913sv4sex3L._AC_UY327_FMwebp_QL65_.jpg",
    amount: 1,
  },
  {
    id: 8,
    name: "Early Learning Library Pack 1",
    description: "by Wonder House Books  | 6 December 2020",
    price: 289,
    image:
      "https://m.media-amazon.com/images/I/71xMttNhr7L._AC_UY327_FMwebp_QL65_.jpg",
    amount: 1,
  },
  {
    id: 9,
    name: "Blossom Moral Story Book for Kids ",
    description: "by Content Team at Target Publications",
    price: 80,
    image:
      "https://m.media-amazon.com/images/I/7122h3jWvEL._AC_UY327_FMwebp_QL65_.jpg",
    amount: 1,
  },
  {
    id: 10,
    name: "Brain Activity Book for Kids",
    description: "by Maple Press | 1 September 2021",
    price: 86,
    image:
      "https://m.media-amazon.com/images/I/7175YpTSa7L._AC_UY327_FMwebp_QL65_.jpg",
    amount: 1,
  },
  {
    id: 11,
    name: "Willy the Silly Panda",
    description: "by Rebecca Smith  | 14 December 2021",
    price: 120,
    image:
      "https://m.media-amazon.com/images/I/71-ocPGQIJL._AC_UY327_FMwebp_QL65_.jpg",
    amount: 1,
  },
  {
    id: 12,
    name: "Grandma's Bag of Stories",
    description: "by Sudha Murty | 1 January 2015",
    price: 157,
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imgworlds.com%2F&psig=AOvVaw17dYwqHJUn4xfmIs7e3d7E&ust=1700808917411000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCv9o_F2YIDFQAAAAAdAAAAABAJ",
    amount: 1,
  },
];
