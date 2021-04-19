import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import TopBar from '../../components/TopBar';
import DetailCard from '../../components/DetailCard';
import axios from 'axios';

function Dashboard(route) {
  const id = route.route.params.id;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
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
        `Sorry, ${oneProductName} is out of stock!`,
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
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <TopBar lefSide={'Detail'} />
      {isLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={{color: '#8A0014', fontSize: 18, marginBottom: 10}}>
              Magic will happen in a few seconds...
            </Text>
            <ActivityIndicator size="large" color="#8A0014" />
          </View>
        </View>
      ) : (
        <ScrollView>
          <View style={{flex: 1, backgroundColor: '#F6E8DF'}}>
            <TouchableOpacity onPress={() => route.navigation.navigate('home')}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 15,
                  marginLeft: 30,
                  justifyContent: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#FEA300',
                    backgroundColor: '#8A0014',
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 30,
                  }}>
                  Browse all
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <DetailCard
                productImage={productDetail.image}
                productVarietes={
                  productDetail.grapeVarieties + ' ' + productDetail.vintageYear
                }
                productName={productDetail.name}
                productRegion={
                  productDetail.region + ', ' + productDetail.country
                }
                productPrice={
                  `${'S$ '}` +
                  `${price.toString().includes('.') ? price : price + '.00'}`
                }
                productProducer={productDetail.producer}
                productAlcohol={productDetail.alcohol + '%'}
                productBottle={productDetail.bottleSize + 'ml'}
                productDescription={desc && desc.slice(17)}
                productNotes={productDetail.tastingNotes}
                onPressAdd={() =>
                  addToCart(productDetail.qty, productDetail.name)
                }
                onPressBookmark={() => handleBookmark(productDetail.name)}
                isDisabled={`${productDetail.qty < 1 ? 0.5 : 1}`}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

export default Dashboard;
