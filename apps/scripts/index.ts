import axios from "axios";

const shopifyUrl = "https://international.victoriabeckham.com";
const dataUrl = `${shopifyUrl}/products.json`;

const getShopDatas = async () => {
  const data = await axios.get('https://international.victoriabeckham.com/products.json', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36' },
  }).catch((error)=>{
    console.log(error);
  })
  console.log(data.data);
};

getShopDatas()
