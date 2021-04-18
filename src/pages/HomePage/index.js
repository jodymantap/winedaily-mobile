import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListCard from '../../components/ListCard';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import TopBar from '../../components/TopBar';

function MainPage(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [productData, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const addToCart = (oneProductQty, oneProductName) => {
    if (oneProductQty >= 1) {
      dispatch({type: 'addtocart'});
      Toast.show({
        type: 'success',
        text1: 'Yeay!',
        text2: `${oneProductName} added to the cart 👋`,
        ref: 'ref',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Sorry',
        text2: `${oneProductName} is out of stock!`,
        ref: 'ref',
      });
    }
  };
  const handleBookmark = oneProductName => {
    Toast.show({
      type: 'success',
      text1: 'Yeay!',
      text2: `${oneProductName} bookmarked 👋`,
    });
  };
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const infiniteScroll = () => {
    console.log('Load More');
    setCurrentPage(currentPage + 1);
    axios
      .get(
        `https://zax5j10412.execute-api.ap-southeast-1.amazonaws.com/dev/api/product/list?page=${currentPage}`,
      )
      .then(response => {
        setData(productData.concat(response.data.value.products));
        setLoading(false);
      });
  };
  useEffect(() => {
    if (currentPage == 1) {
      axios
        .get(
          `https://zax5j10412.execute-api.ap-southeast-1.amazonaws.com/dev/api/product/list?page=${currentPage}`,
        )
        .then(response => {
          setData(productData.concat(response.data.value.products));
          setLoading(false);
        });
    }
  }, []);
  return (
    <>
      <Toast style={{zIndex: 1}} ref={ref => Toast.setRef(ref)} />
      <TopBar lefSide={'WineDaily'} />
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            infiniteScroll();
          }
        }}
        scrollEventThrottle={400}>
        <View
          style={{flex: 1, alignItems: 'center', backgroundColor: '#F6E8DF'}}>
          {productData &&
            productData.map((e, i) => (
              <ListCard
                key={i}
                productImage={e.image}
                productVarietes={
                  e.grapeVarietes.slice(0, 25) +
                  `${e.grapeVarietes.length > 25 ? '...' : ''}`
                }
                productName={e.name}
                productRegion={e.region + ', ' + e.country}
                productPrice={
                  `${'S$ '}` +
                  `${
                    e.price.toString().includes('.') ? e.price : e.price + '.00'
                  }`
                }
                productLeft={
                  `${e.qty < 1 ? 'sold out' : ''}` +
                  `${e.qty <= 5 && e.qty > 0 ? e.qty + ' left' : ''}`
                }
                onPressAdd={() => addToCart(e.qty, e.name)}
                onPressBookmark={() => handleBookmark(e.name)}
                onPressDetail={() =>
                  props.navigation.navigate('detail', {id: e.id})
                }
              />
            ))}
        </View>
      </ScrollView>
    </>
  );
}

export default MainPage;
