import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';



function TopBar({lefSide}) {
  const {cartTotal, isLogin} = useSelector(state => state.auth);
  return (
    <>
    <View
      style={{
        backgroundColor: '#8A0014',
        height: 55,
        flexDirection: 'column',
        paddingHorizontal: 27,
        paddingVertical: 5,
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#FEA300'}}>
          {lefSide}
        </Text>
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri:
                  'https://drive.google.com/uc?export=view&id=1plMbJ17TGBWCKyphfdzDeEZvOnwqLTxK',
              }}
              style={{width: 22, height: 22}}
            />
            <TouchableOpacity
              style={{
                borderRadius: 20,
                backgroundColor: '#8A0014',
                borderColor: '#FEA300',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                width: 22,
                height: 22,
                paddingVertical: 2,
                paddingHorizontal: 2,
                marginLeft: 2,
              }}>
              <Text
                style={{fontSize: 10, fontWeight: 'bold', color: '#FEA300'}}>
                {cartTotal}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
    </>
  );
}

export default TopBar;
