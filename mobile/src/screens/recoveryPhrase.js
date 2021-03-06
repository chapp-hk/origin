'use strict'

import React from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { fbt } from 'fbt-runtime'
import { connect } from 'react-redux'
import SafeAreaView from 'react-native-safe-area-view'

import BackArrow from 'components/back-arrow'
import OriginButton from 'components/origin-button'
import Disclaimer from 'components/disclaimer'
import CommonStyles from 'styles/common'

const RecoveryPhraseScreen = ({ navigation, wallet }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <BackArrow onClick={() => navigation.goBack(null)} />
      <View style={styles.content}>
        <Text style={styles.title}>
          <fbt desc="RecoveryPhrase.title">Recovery Phrase</fbt>
        </Text>
        <Text style={styles.subtitle}>
          <fbt desc="RecoveryPhrase.subtitle">
            Write down these 12 words in this order and keep them somewhere
            safe.
          </fbt>
        </Text>
        <Text style={{ ...styles.subtitle, fontWeight: 'bold' }}>
          <fbt desc="RecoveryPhrase.warning">
            This is the ONLY way to restore access to your account.
          </fbt>
        </Text>
        <View style={styles.recoveryContainer}>
          {wallet.activeAccount.mnemonic.split(' ').map((word, i) => {
            return (
              <View style={styles.recoveryWordContainer} key={i}>
                <Text style={styles.recoveryWordNumber}>{i + 1} </Text>
                <Text style={styles.recoveryWord}>{word}</Text>
              </View>
            )
          })}
        </View>
        <Disclaimer>
          <fbt desc="RecoveryPhrase.disclaimer">
            Remember: You are solely responsible for your recovery phrase. We
            don&apos;t store it and there&apos;s no other way to recover your
            account.
          </fbt>
        </Disclaimer>
      </View>
      <View style={styles.buttonContainer}>
        <OriginButton
          size="large"
          type="primary"
          title={fbt('Continue', 'RecoveryPhrase.continueButton')}
          onPress={() => {
            navigation.navigate('RecoveryPhraseVerify')
          }}
        />
      </View>
    </ScrollView>
  </SafeAreaView>
)

const mapStateToProps = ({ wallet }) => {
  return { wallet }
}

export default connect(mapStateToProps)(RecoveryPhraseScreen)

const styles = StyleSheet.create({
  ...CommonStyles,
  recoveryContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#f0f6f9',
    borderRadius: 15
  },
  recoveryWordContainer: {
    paddingVertical: 10,
    width: '30%',
    flexDirection: 'row'
  },
  recoveryWordNumber: {
    fontSize: 14,
    color: '#6a8296',
    textAlign: 'right',
    width: 28,
    marginRight: 5
  },
  recoveryWord: {
    fontSize: 14,
    textAlign: 'left',
    width: '100%'
  }
})
