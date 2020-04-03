import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const QRCodeLinksToKomojuPayments = barcodeData => {
  const expression = new RegExp('https://komoju.com/s/p/.+');

  return expression.test(barcodeData);
};

class QRScanner extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio={false}
          onBarCodeRead={barcode => {
            if (QRCodeLinksToKomojuPayments(barcode.data)) {
              this.props.navigation.navigate('PaymentProcessor', {
                paymentUrl: barcode.data,
              });
            } else {
              // TODO: Add proper error handling here
            }
          }}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
});

export default QRScanner;
