import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useDispatch} from 'react-redux';
import ListCard from '../../components/ListCard';
import axios from 'axios';
import TopBar from '../../components/TopBar';

function MainPage(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [isFirstLoading, setFirstLoading] = useState(true);
  const [productData, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const infiniteScroll = () => {
    console.log('Load More');
    setLoading(true);
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
          setFirstLoading(false);
        });
    }
  }, []);
  return (
    <>
      <TopBar lefSide={'WineDaily'} />
      {isFirstLoading ? (
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
                      e.price.toString().includes('.')
                        ? e.price
                        : e.price + '.00'
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
                  isDisabled={`${e.qty < 1 ? 0.5 : 1}`}
                />
              ))}
            {isLoading ? (
              <View style={{paddingBottom: 40, alignItems: 'center'}}>
                <Text style={{color: '#8A0014', fontSize: 20}}>
                  Loading More
                </Text>
                <ActivityIndicator size="large" color="#8A0014" />
              </View>
            ) : null}
          </View>
        </ScrollView>
      )}
    </>
  );
}

export default MainPage;
