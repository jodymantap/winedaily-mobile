import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

export default function DetailCard({
  productImage,
  productName,
  productVarietes,
  productRegion,
  productPrice,
  productProducer,
  productAlcohol,
  productBottle,
  productDescription,
  productNotes,
  onPressAdd,
  onPressBookmark,
  isDisabled,
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        padding: 30,
        width: 300,
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 20,
      }}
      activeOpacity={1}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image source={{uri: productImage}} style={{width: 100, height: 250}} />
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text
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
            color: '#FEA300',
            fontSize: 17,
            marginTop: 3,
            fontWeight: 'normal',
          }}>
          {productVarietes}
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            color: '#8A0014',
            fontSize: 20,
            marginTop: 25,
            fontWeight: 'bold',
          }}>
          {productPrice}
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
            opacity: parseFloat(isDisabled),
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
      <View style={{flexDirection: 'column'}}>
        <Text
          style={{
            color: '#FEA300',
            fontSize: 12,
            marginTop: 15,
            fontWeight: 'normal',
          }}>
          {'Region'}
        </Text>
        <Text
          style={{
            color: '#8A0014',
            fontSize: 18,
            marginTop: 3,
            fontWeight: 'normal',
          }}>
          {productRegion}
        </Text>
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text
          style={{
            color: '#FEA300',
            fontSize: 12,
            marginTop: 15,
            fontWeight: 'normal',
          }}>
          {'Producer'}
        </Text>
        <Text
          style={{
            color: '#8A0014',
            fontSize: 18,
            marginTop: 3,
            fontWeight: 'normal',
          }}>
          {productProducer}
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              color: '#FEA300',
              fontSize: 12,
              marginTop: 15,
              fontWeight: 'normal',
            }}>
            {'Bottle'}
          </Text>
          <Text
            style={{
              color: '#8A0014',
              fontSize: 18,
              marginTop: 3,
              fontWeight: 'normal',
            }}>
            {productBottle}
          </Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              color: '#FEA300',
              fontSize: 12,
              marginTop: 15,
              fontWeight: 'normal',
            }}>
            {'Alcohol'}
          </Text>
          <Text
            style={{
              color: '#8A0014',
              fontSize: 18,
              marginTop: 3,
              fontWeight: 'normal',
            }}>
            {productAlcohol}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text
          style={{
            color: '#FEA300',
            fontSize: 12,
            marginTop: 15,
            fontWeight: 'normal',
          }}>
          {'Description'}
        </Text>
        <Text
          style={{
            color: '#8A0014',
            fontSize: 18,
            marginTop: 3,
            fontWeight: 'normal',
          }}>
          {productDescription}
        </Text>
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text
          style={{
            color: '#FEA300',
            fontSize: 12,
            marginTop: 15,
            fontWeight: 'normal',
          }}>
          {'Tasting Notes'}
        </Text>
        <Text
          style={{
            color: '#8A0014',
            fontSize: 18,
            marginTop: 3,
            fontWeight: 'normal',
          }}>
          {productNotes}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
