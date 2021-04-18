import React from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function ListCard({
  productImage,
  productName,
  productVarietes,
  productRegion,
  productPrice,
  productLeft,
  onPressAdd,
  onPressBookmark,
  onPressDetail,
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        padding: 30,
        width: 300,
        borderRadius: 15,
        marginTop: 30,
      }}
      activeOpacity={1}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image source={{uri: productImage}} style={{width: 100, height: 250}} />
      </View>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Text
          style={{
            color: '#FEA300',
            fontSize: 15,
            borderColor: '#FEA300',
            borderRadius: 5,
            borderWidth: 1,
            paddingVertical: 3,
            paddingHorizontal: 7,
          }}>
          {productVarietes}
        </Text>
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text
          onPress={onPressDetail}
          style={{
            color: '#8A0014',
            fontSize: 21,
            marginTop: 15,
            fontWeight: 'bold',
          }}>
          {productName}
        </Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 15,
            marginTop: 3,
            fontWeight: 'normal',
          }}>
          {productRegion}
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            color: '#8A0014',
            fontSize: 15,
            marginTop: 25,
            fontWeight: 'bold',
          }}>
          {productPrice}
        </Text>
        <Text
          style={{
            color: '#8A0014',
            fontSize: 15,
            marginTop: 25,
            fontWeight: 'bold',
          }}>
          {productLeft}
        </Text>
      </View>
      <View style={{flexDirection: 'column', marginTop: 15}}>
        <TouchableOpacity
          onPress={onPressAdd}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#8A0014',
            borderWidth: 2,
            borderColor: '#8A0014',
            padding: 8,
            alignItems: 'center',
            borderRadius: 12,
          }}>
          <Text style={{fontSize: 19, color: '#FEA300', fontWeight: 'bold'}}>
            ADD TO CART
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressBookmark}
          activeOpacity={0.8}
          style={{
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: '#8A0014',
            marginTop: 8,
            padding: 8,
            alignItems: 'center',
            borderRadius: 12,
          }}>
          <Text style={{fontSize: 18, color: '#8A0014', fontWeight: 'normal'}}>
            SAVE FOR LATER
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
