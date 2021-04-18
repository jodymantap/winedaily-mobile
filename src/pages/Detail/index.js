import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {useDispatch} from 'react-redux';
import TopBar from '../../components/TopBar';
import DetailCard from '../../components/DetailCard';
import axios from 'axios';

function Dashboard(route) {
  const id = route.route.params.id;
  const dispatch = useDispatch();
  const [productDetail, setDetail] = useState({});
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState('description');
  const addToCart = (oneProductQty, oneProductName) => {
    if (oneProductQty >= 1) {
      dispatch({type: 'addtocart'});
      ToastAndroid.showWithGravity(
        `${oneProductName} added to the cart 👋`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      ToastAndroid.showWithGravity(
        `${oneProductName} is out of stock!`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };
  const handleBookmark = oneProductName => {
    ToastAndroid.showWithGravity(
      `${oneProductName} bookmarked 👋`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  useEffect(() => {
    axios
      .get(
        `https://zax5j10412.execute-api.ap-southeast-1.amazonaws.com/dev/api/product/${id}`,
      )
      .then(response => {
        setDetail(response.data.value);
        setPrice(response.data.value.price);
        setDesc(response.data.value.description);
      });
  }, []);
  return (
    <>
      <TopBar lefSide={'Detail'} />
      <ScrollView>
        <View
          style={{flex: 1, alignItems: 'center', backgroundColor: '#F6E8DF'}}>
          <DetailCard
            productImage={productDetail.image}
            productVarietes={
              productDetail.grapeVarieties + ' ' + productDetail.vintageYear
            }
            productName={productDetail.name}
            productRegion={productDetail.region + ', ' + productDetail.country}
            productPrice={
              `${'S$ '}` +
              `${price.toString().includes('.') ? price : price + '.00'}`
            }
            productProducer={productDetail.producer}
            productAlcohol={productDetail.alcohol + '%'}
            productBottle={productDetail.bottleSize + 'ml'}
            productDescription={desc && desc.slice(17)}
            productNotes={productDetail.tastingNotes}
            onPressAdd={() => addToCart(productDetail.qty, productDetail.name)}
            onPressBookmark={() => handleBookmark(productDetail.name)}
          />
        </View>
      </ScrollView>
    </>
  );
}

export default Dashboard;
